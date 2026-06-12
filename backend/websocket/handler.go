package websocket

import (
	"database/sql"
	"net/http"
	"strings"

	"advanced-go-realtime-backend-platform/auth"
	"advanced-go-realtime-backend-platform/config"

	"github.com/gin-gonic/gin"
	gorilla "github.com/gorilla/websocket"
)

type Handler struct {
	hub      *Hub
	db       *sql.DB
	cfg      config.Config
	upgrader gorilla.Upgrader
}

func NewHandler(hub *Hub, db *sql.DB, cfg config.Config) *Handler {
	return &Handler{
		hub: hub,
		db:  db,
		cfg: cfg,
		upgrader: gorilla.Upgrader{
			ReadBufferSize:  1024,
			WriteBufferSize: 1024,
			CheckOrigin: func(r *http.Request) bool {
				origin := r.Header.Get("Origin")
				if origin == "" {
					return true
				}
				for _, allowed := range cfg.AllowedOrigins {
					if origin == allowed {
						return true
					}
				}
				return cfg.Env != "production"
			},
		},
	}
}

func (h *Handler) Serve(c *gin.Context) {
	token := c.Query("token")
	if token == "" {
		header := c.GetHeader("Authorization")
		token = strings.TrimPrefix(header, "Bearer ")
	}

	claims, err := auth.ValidateToken(h.cfg.JWTSecret, token)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid or expired token"})
		return
	}

	name, email := h.lookupUser(claims.UserID, claims.Name, claims.Email)
	conn, err := h.upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		return
	}

	client := &Client{
		Hub:    h.hub,
		Conn:   conn,
		UserID: claims.UserID,
		Name:   name,
		Email:  email,
		send:   make(chan Message, 16),
	}

	h.hub.Register(client)
	go client.WritePump()
	go client.ReadPump()
}

func (h *Handler) lookupUser(id int64, fallbackName, fallbackEmail string) (string, string) {
	var name, email string
	err := h.db.QueryRow(`SELECT name, email FROM users WHERE id = ?`, id).Scan(&name, &email)
	if err != nil {
		return fallbackName, fallbackEmail
	}
	return name, email
}
