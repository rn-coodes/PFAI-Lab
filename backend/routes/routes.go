package routes

import (
	"database/sql"
	"net/http"
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
	router.Use(gin.Logger(), gin.Recovery())
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

	api.POST("/auth/register", authHandler.Register)
	api.POST("/auth/login", authHandler.Login)

	protected := api.Group("")
	protected.Use(middleware.JWTAuth(cfg.JWTSecret))
	protected.GET("/profile", authHandler.Profile)
	protected.POST("/crawler/crawl", crawlerHandler.Crawl)

	router.GET("/ws", wsHandler.Serve)

	return router
}
