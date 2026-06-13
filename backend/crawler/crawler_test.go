package crawler

import (
	"context"
	"net/url"
	"testing"
)

func TestValidateTargetRejectsPrivateNetworks(t *testing.T) {
	targets := []string{
		"http://localhost:8080",
		"http://127.0.0.1",
		"http://10.0.0.1",
		"http://169.254.169.254/latest/meta-data",
	}

	for _, raw := range targets {
		target, err := url.Parse(raw)
		if err != nil {
			t.Fatalf("parse target: %v", err)
		}
		if err := validateTarget(context.Background(), target); err == nil {
			t.Fatalf("expected %s to be rejected", raw)
		}
	}
}

func TestNormalizeURLAddsHTTPS(t *testing.T) {
	target, err := normalizeURL("example.com/docs#section")
	if err != nil {
		t.Fatalf("normalize URL: %v", err)
	}
	if target.Scheme != "https" || target.Fragment != "" {
		t.Fatalf("unexpected normalized URL: %s", target.String())
	}
}
