package config

import (
	"database/sql"
	"fmt"
	"os"
	"strings"

	_ "modernc.org/sqlite"
)

type Config struct {
	Port           string
	Env            string
	JWTSecret      string
	DatabasePath   string
	AllowedOrigins []string
}

func Load() Config {
	origins := getEnv("ALLOWED_ORIGINS", "http://localhost:3000")

	return Config{
		Port:           getEnv("PORT", "8080"),
		Env:            getEnv("APP_ENV", "development"),
		JWTSecret:      getEnv("JWT_SECRET", "change-me-in-production"),
		DatabasePath:   getEnv("DATABASE_PATH", "platform.db"),
		AllowedOrigins: splitCSV(origins),
	}
}

func OpenDatabase(path string) (*sql.DB, error) {
	db, err := sql.Open("sqlite", path)
	if err != nil {
		return nil, fmt.Errorf("open sqlite database: %w", err)
	}

	if _, err := db.Exec(`PRAGMA foreign_keys = ON;`); err != nil {
		return nil, fmt.Errorf("enable foreign keys: %w", err)
	}

	schema := `
CREATE TABLE IF NOT EXISTS users (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT NOT NULL,
	email TEXT NOT NULL UNIQUE,
	password_hash TEXT NOT NULL,
	created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
`
	if _, err := db.Exec(schema); err != nil {
		return nil, fmt.Errorf("migrate schema: %w", err)
	}

	return db, nil
}

func Validate(cfg Config) error {
	if cfg.Env == "production" && cfg.JWTSecret == "change-me-in-production" {
		return fmt.Errorf("JWT_SECRET must be configured in production")
	}
	if len(cfg.AllowedOrigins) == 0 {
		return fmt.Errorf("at least one ALLOWED_ORIGINS value is required")
	}
	return nil
}

func getEnv(key, fallback string) string {
	value := strings.TrimSpace(os.Getenv(key))
	if value == "" {
		return fallback
	}
	return value
}

func splitCSV(value string) []string {
	parts := strings.Split(value, ",")
	out := make([]string, 0, len(parts))
	for _, part := range parts {
		trimmed := strings.TrimSpace(part)
		if trimmed != "" {
			out = append(out, trimmed)
		}
	}
	return out
}
