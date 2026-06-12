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
- `POST /api/auth/register`
- `POST /api/auth/login`
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

## Live Services

- Website: `https://frontend-rosy-eight-53.vercel.app`
- Backend: `https://advanced-go-backend-f24607089-production.up.railway.app`
