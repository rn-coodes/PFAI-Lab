# Backend

Gin API for authentication, profile data, WebSocket chat, and concurrent crawling.

The production service includes runtime telemetry, temporary non-persistent demo sessions, authenticated WebSockets, global rate limiting, and SSRF protection for crawler targets.

```bash
cp .env.example .env
go mod tidy
go run ./cmd/server
```

The API listens on `http://localhost:8080` by default.

Run the quality suite with:

```bash
go test ./...
go vet ./...
```
