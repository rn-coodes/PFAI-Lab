package routes

import (
	"bytes"
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

func TestTelemetry(t *testing.T) {
	router := testRouter(t)
	recorder := httptest.NewRecorder()
	request := httptest.NewRequest(http.MethodGet, "/api/telemetry", nil)

	router.ServeHTTP(recorder, request)

	if recorder.Code != http.StatusOK {
		t.Fatalf("expected 200, got %d", recorder.Code)
	}

	var body map[string]any
	if err := json.Unmarshal(recorder.Body.Bytes(), &body); err != nil {
		t.Fatalf("decode response: %v", err)
	}
	if body["crawlerMaxWorkers"] != float64(6) {
		t.Fatalf("expected six crawler workers, got %v", body["crawlerMaxWorkers"])
	}
}

func TestDemoSessionCanAccessProtectedProfile(t *testing.T) {
	router := testRouter(t)
	sessionRecorder := httptest.NewRecorder()
	sessionRequest := httptest.NewRequest(http.MethodPost, "/api/auth/demo-session", bytes.NewBufferString(`{}`))
	sessionRequest.Header.Set("Content-Type", "application/json")
	router.ServeHTTP(sessionRecorder, sessionRequest)

	if sessionRecorder.Code != http.StatusOK {
		t.Fatalf("expected demo session 200, got %d", sessionRecorder.Code)
	}

	var session struct {
		Token string `json:"token"`
	}
	if err := json.Unmarshal(sessionRecorder.Body.Bytes(), &session); err != nil {
		t.Fatalf("decode demo session: %v", err)
	}
	if session.Token == "" {
		t.Fatal("expected demo JWT")
	}

	profileRecorder := httptest.NewRecorder()
	profileRequest := httptest.NewRequest(http.MethodGet, "/api/profile", nil)
	profileRequest.Header.Set("Authorization", "Bearer "+session.Token)
	router.ServeHTTP(profileRecorder, profileRequest)

	if profileRecorder.Code != http.StatusOK {
		t.Fatalf("expected protected profile 200, got %d: %s", profileRecorder.Code, profileRecorder.Body.String())
	}
}

func TestProtectedProfileRejectsMissingToken(t *testing.T) {
	router := testRouter(t)
	recorder := httptest.NewRecorder()
	request := httptest.NewRequest(http.MethodGet, "/api/profile", nil)

	router.ServeHTTP(recorder, request)
	if recorder.Code != http.StatusUnauthorized {
		t.Fatalf("expected 401, got %d", recorder.Code)
	}
}
