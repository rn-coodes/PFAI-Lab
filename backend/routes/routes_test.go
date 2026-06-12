package routes

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"path/filepath"
	"testing"

	"advanced-go-realtime-backend-platform/config"
	ws "advanced-go-realtime-backend-platform/websocket"
)

func testRouter(t *testing.T) http.Handler {
	t.Helper()

	cfg := config.Config{
		Env:            "test",
		JWTSecret:      "test-secret",
		DatabasePath:   filepath.Join(t.TempDir(), "test.db"),
		AllowedOrigins: []string{"http://localhost:3000"},
	}
	db, err := config.OpenDatabase(cfg.DatabasePath)
	if err != nil {
		t.Fatalf("open database: %v", err)
	}
	t.Cleanup(func() { _ = db.Close() })

	hub := ws.NewHub()
	go hub.Run()
	return Setup(cfg, db, hub)
}

func TestHealth(t *testing.T) {
	router := testRouter(t)
	recorder := httptest.NewRecorder()
	request := httptest.NewRequest(http.MethodGet, "/health", nil)

	router.ServeHTTP(recorder, request)

	if recorder.Code != http.StatusOK {
		t.Fatalf("expected 200, got %d", recorder.Code)
	}

	var body map[string]any
	if err := json.Unmarshal(recorder.Body.Bytes(), &body); err != nil {
		t.Fatalf("decode response: %v", err)
	}
	if body["status"] != "ok" {
		t.Fatalf("expected ok status, got %v", body["status"])
	}
}
