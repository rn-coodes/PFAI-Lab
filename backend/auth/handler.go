package auth

import (
	"database/sql"
	"errors"
	"net/http"
	"strings"

	"advanced-go-realtime-backend-platform/config"
	"advanced-go-realtime-backend-platform/models"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

type Handler struct {
	DB     *sql.DB
	Config config.Config
}

func NewHandler(db *sql.DB, cfg config.Config) *Handler {
	return &Handler{DB: db, Config: cfg}
}

func (h *Handler) Register(c *gin.Context) {
	var req models.RegisterRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "name, valid email, and password with at least 6 characters are required"})
		return
	}

	req.Email = strings.ToLower(strings.TrimSpace(req.Email))
	req.Name = strings.TrimSpace(req.Name)

	hash, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "could not secure password"})
		return
	}

	result, err := h.DB.Exec(
		`INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)`,
		req.Name,
		req.Email,
		string(hash),
	)
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"error": "an account with this email already exists"})
		return
	}

	id, err := result.LastInsertId()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "could not create account"})
		return
	}

	user, err := h.findUserByID(id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "could not load created account"})
		return
	}

	token, err := GenerateToken(h.Config.JWTSecret, user.ID, user.Email, user.Name)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "could not issue token"})
		return
	}

	c.JSON(http.StatusCreated, models.AuthResponse{
		Token: token,
		User:  models.ToUserResponse(user),
	})
}

func (h *Handler) Login(c *gin.Context) {
	var req models.LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "valid email and password are required"})
		return
	}

	user, err := h.findUserByEmail(strings.ToLower(strings.TrimSpace(req.Email)))
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid email or password"})
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(req.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid email or password"})
		return
	}

	token, err := GenerateToken(h.Config.JWTSecret, user.ID, user.Email, user.Name)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "could not issue token"})
		return
	}

	c.JSON(http.StatusOK, models.AuthResponse{
		Token: token,
		User:  models.ToUserResponse(user),
	})
}

func (h *Handler) Profile(c *gin.Context) {
	value, ok := c.Get("userID")
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "missing user context"})
		return
	}

	userID, ok := value.(int64)
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid user context"})
		return
	}

	user, err := h.findUserByID(userID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "profile not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"user": models.ToUserResponse(user)})
}

func (h *Handler) findUserByEmail(email string) (models.User, error) {
	var user models.User
	err := h.DB.QueryRow(
		`SELECT id, name, email, password_hash, created_at FROM users WHERE email = ?`,
		email,
	).Scan(&user.ID, &user.Name, &user.Email, &user.PasswordHash, &user.CreatedAt)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return models.User{}, err
		}
		return models.User{}, err
	}
	return user, nil
}

func (h *Handler) findUserByID(id int64) (models.User, error) {
	var user models.User
	err := h.DB.QueryRow(
		`SELECT id, name, email, password_hash, created_at FROM users WHERE id = ?`,
		id,
	).Scan(&user.ID, &user.Name, &user.Email, &user.PasswordHash, &user.CreatedAt)
	if err != nil {
		return models.User{}, err
	}
	return user, nil
}
