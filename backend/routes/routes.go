package routes

import (
	"database/sql"
	"net/http"
	"runtime"
	"sync/atomic"
	"time"

	"advanced-go-realtime-backend-platform/auth"
	"advanced-go-realtime-backend-platform/config"
	"advanced-go-realtime-backend-platform/crawler"
	"advanced-go-realtime-backend-platform/middleware"
	ws "advanced-go-realtime-backend-platform/websocket"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"golang.org/x/time/rate"
)

func Setup(cfg config.Config, db *sql.DB, hub *ws.Hub) *gin.Engine {
	if cfg.Env == "production" {
		gin.SetMode(gin.ReleaseMode)
	}

	router := gin.New()
	startedAt := time.Now().UTC()
	var requests atomic.Uint64
	router.Use(gin.Logger(), gin.Recovery())
	router.Use(func(c *gin.Context) {
		requests.Add(1)
		c.Next()
	})
	router.Use(cors.New(cors.Config{
		AllowOrigins:     cfg.AllowedOrigins,
		AllowMethods:     []string{http.MethodGet, http.MethodPost, http.MethodOptions},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))
	router.Use(middleware.RateLimit(rate.Limit(8), 20))

	authHandler := auth.NewHandler(db, cfg)
	crawlerHandler := crawler.NewHandler(crawler.NewService())
	wsHandler := ws.NewHandler(hub, db, cfg)

	router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"name":       "Advanced Go Projects API",
			"status":     "online",
			"health":     "/health",
			"api_status": "/api/status",
			"websocket":  "/ws?token=<jwt>",
		})
	})

	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status":    "ok",
			"service":   "Advanced Go Real-Time Backend Platform",
			"timestamp": time.Now().UTC().Format(time.RFC3339),
		})
	})

	api := router.Group("/api")
	api.GET("/status", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"api":       "online",
			"database":  "sqlite",
			"websocket": "available",
			"crawler":   "ready",
		})
	})
	api.GET("/telemetry", func(c *gin.Context) {
		var memory runtime.MemStats
		runtime.ReadMemStats(&memory)
		activeSockets, deliveredMessages := hub.Stats()
		c.JSON(http.StatusOK, gin.H{
			"status":            "online",
			"startedAt":         startedAt.Format(time.RFC3339),
			"uptimeSeconds":     int64(time.Since(startedAt).Seconds()),
			"requests":          requests.Load(),
			"goroutines":        runtime.NumGoroutine(),
			"memoryMB":          memory.Alloc / 1024 / 1024,
			"activeWebSockets":  activeSockets,
			"deliveredMessages": deliveredMessages,
			"crawlerMaxWorkers": 6,
			"goVersion":         runtime.Version(),
		})
	})

	api.POST("/auth/register", authHandler.Register)
	api.POST("/auth/login", authHandler.Login)
	api.POST("/auth/demo-session", authHandler.DemoSession)

	protected := api.Group("")
	protected.Use(middleware.JWTAuth(cfg.JWTSecret))
	protected.GET("/profile", authHandler.Profile)
	protected.POST("/crawler/crawl", crawlerHandler.Crawl)

	router.GET("/ws", wsHandler.Serve)

	return router
}
