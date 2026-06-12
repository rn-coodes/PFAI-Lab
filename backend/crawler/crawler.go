package crawler

import (
	"context"
	"fmt"
	"io"
	"net/http"
	"net/url"
	"strings"
	"sync"
	"time"

	"golang.org/x/net/html"
	"golang.org/x/time/rate"
)

const (
	defaultMaxPages = 8
	maxAllowedPages = 25
)

type CrawlRequest struct {
	URL      string `json:"url" binding:"required"`
	MaxPages int    `json:"maxPages"`
}

type PageResult struct {
	URL       string `json:"url"`
	Title     string `json:"title"`
	Status    int    `json:"status"`
	Links     int    `json:"links"`
	ElapsedMS int64  `json:"elapsedMs"`
	Error     string `json:"error,omitempty"`
}

type CrawlResponse struct {
	RootURL    string       `json:"rootUrl"`
	Results    []PageResult `json:"results"`
	Crawled    int          `json:"crawled"`
	Failed     int          `json:"failed"`
	DurationMS int64        `json:"durationMs"`
}

type Service struct {
	client  *http.Client
	limiter *rate.Limiter
}

func NewService() *Service {
	return &Service{
		client: &http.Client{
			Timeout: 8 * time.Second,
		},
		limiter: rate.NewLimiter(rate.Every(150*time.Millisecond), 3),
	}
}

func (s *Service) Crawl(ctx context.Context, rawURL string, maxPages int) (CrawlResponse, error) {
	start := time.Now()
	root, err := normalizeURL(rawURL)
	if err != nil {
		return CrawlResponse{}, err
	}

	if maxPages <= 0 {
		maxPages = defaultMaxPages
	}
	if maxPages > maxAllowedPages {
		maxPages = maxAllowedPages
	}

	workers := 6
	if maxPages < workers {
		workers = maxPages
	}

	jobs := make(chan string, maxPages)
	var wg sync.WaitGroup
	var mu sync.Mutex
	seen := map[string]bool{root.String(): true}
	results := make([]PageResult, 0, maxPages)

	for i := 0; i < workers; i++ {
		go func() {
			for pageURL := range jobs {
				result, links := s.fetchPage(ctx, pageURL, root)

				mu.Lock()
				results = append(results, result)
				toQueue := make([]string, 0)
				for _, link := range links {
					if len(seen) >= maxPages {
						break
					}
					if seen[link] {
						continue
					}
					seen[link] = true
					toQueue = append(toQueue, link)
					wg.Add(1)
				}
				mu.Unlock()

				for _, link := range toQueue {
					select {
					case jobs <- link:
					case <-ctx.Done():
						wg.Done()
					}
				}

				wg.Done()
			}
		}()
	}

	wg.Add(1)
	jobs <- root.String()

	done := make(chan struct{})
	go func() {
		wg.Wait()
		close(jobs)
		close(done)
	}()

	select {
	case <-done:
	case <-ctx.Done():
		<-done
		return CrawlResponse{}, ctx.Err()
	}

	failed := 0
	for _, result := range results {
		if result.Error != "" {
			failed++
		}
	}

	return CrawlResponse{
		RootURL:    root.String(),
		Results:    results,
		Crawled:    len(results),
		Failed:     failed,
		DurationMS: time.Since(start).Milliseconds(),
	}, nil
}

func (s *Service) fetchPage(ctx context.Context, pageURL string, root *url.URL) (PageResult, []string) {
	start := time.Now()
	result := PageResult{URL: pageURL}

	if err := s.limiter.Wait(ctx); err != nil {
		result.Error = err.Error()
		result.ElapsedMS = time.Since(start).Milliseconds()
		return result, nil
	}

	req, err := http.NewRequestWithContext(ctx, http.MethodGet, pageURL, nil)
	if err != nil {
		result.Error = err.Error()
		result.ElapsedMS = time.Since(start).Milliseconds()
		return result, nil
	}
	req.Header.Set("User-Agent", "AdvancedGoRealtimeBackendPlatform/1.0")

	resp, err := s.client.Do(req)
	if err != nil {
		result.Error = err.Error()
		result.ElapsedMS = time.Since(start).Milliseconds()
		return result, nil
	}
	defer resp.Body.Close()

	result.Status = resp.StatusCode
	body, err := io.ReadAll(io.LimitReader(resp.Body, 1024*1024))
	if err != nil {
		result.Error = err.Error()
		result.ElapsedMS = time.Since(start).Milliseconds()
		return result, nil
	}

	title, links := parseHTML(body, resp.Request.URL, root)
	result.Title = title
	result.Links = len(links)
	result.ElapsedMS = time.Since(start).Milliseconds()

	return result, links
}

func normalizeURL(rawURL string) (*url.URL, error) {
	trimmed := strings.TrimSpace(rawURL)
	if trimmed == "" {
		return nil, fmt.Errorf("url is required")
	}
	if !strings.HasPrefix(trimmed, "http://") && !strings.HasPrefix(trimmed, "https://") {
		trimmed = "https://" + trimmed
	}

	parsed, err := url.Parse(trimmed)
	if err != nil {
		return nil, fmt.Errorf("invalid url: %w", err)
	}
	if parsed.Host == "" {
		return nil, fmt.Errorf("url must include a host")
	}

	parsed.Fragment = ""
	return parsed, nil
}

func parseHTML(body []byte, base, root *url.URL) (string, []string) {
	doc, err := html.Parse(strings.NewReader(string(body)))
	if err != nil {
		return "", nil
	}

	links := make([]string, 0)
	title := ""

	var walk func(*html.Node)
	walk = func(n *html.Node) {
		if n.Type == html.ElementNode && n.Data == "title" && n.FirstChild != nil && title == "" {
			title = strings.TrimSpace(n.FirstChild.Data)
		}

		if n.Type == html.ElementNode && n.Data == "a" {
			for _, attr := range n.Attr {
				if attr.Key != "href" {
					continue
				}

				href, err := base.Parse(strings.TrimSpace(attr.Val))
				if err != nil || href.Host != root.Host {
					continue
				}
				href.Fragment = ""
				if href.Scheme == "http" || href.Scheme == "https" {
					links = append(links, href.String())
				}
			}
		}

		for child := n.FirstChild; child != nil; child = child.NextSibling {
			walk(child)
		}
	}

	walk(doc)
	return title, dedupe(links)
}

func dedupe(values []string) []string {
	seen := make(map[string]bool, len(values))
	out := make([]string, 0, len(values))
	for _, value := range values {
		if seen[value] {
			continue
		}
		seen[value] = true
		out = append(out, value)
	}
	return out
}
