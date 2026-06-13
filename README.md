# PFAI Lab - Advanced Go Projects Showcase

Production-ready monorepo for Rehan (`F24607089`) at the National University of Technology.

## Applications

- `frontend/`: Next.js 15 portfolio and project dashboard
- `backend/`: Go API combining JWT authentication, WebSocket chat, and concurrent crawling
- `backend/railway.json`: Railway deployment configuration for the Go backend

## Backend Routes

- `GET /`
- `GET /health`
- `GET /api/status`
- `GET /api/telemetry`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/demo-session`
- `GET /api/profile` with bearer token
- `POST /api/crawler/crawl` with bearer token
- `GET /ws?token=<jwt>`

## Local Development

```bash
cd backend
go mod tidy
go run ./cmd/server
```

```bash
cd frontend
npm install
npm run dev
```

## Deployment

- Frontend: Vercel
- Backend: Railway

## Production Engineering

- Live runtime telemetry reports measured uptime, request totals, Go runtime details, and WebSocket activity.
- Temporary demo sessions exercise protected routes without creating persistent demo accounts.
- The crawler rejects localhost, private-network, link-local, and unsafe redirect targets.
- GitHub Actions runs frontend linting, TypeScript checks, production builds, Go tests, and Go vet.

## Live Services

- Website: `https://rehan-go-projects.vercel.app`
- Backend: `https://advanced-go-backend-f24607089-production.up.railway.app`
