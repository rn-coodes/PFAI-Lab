# Advanced Go Projects Showcase

A production-ready portfolio website for **Rehan** from the **National University of Technology**. The showcase presents three advanced **Golang** projects inside a modern SaaS-style dashboard built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

## Owner

- Name: Rehan
- Student ID: F24607089
- University: National University of Technology

## Projects

- Real-Time Chat Application
- REST API with JWT Authentication
- Concurrent Web Crawler

## Language Focus

Go is the primary project language across the portfolio. Supporting languages and formats include TypeScript, CSS, JSON, and HTML where the frontend showcase and API documentation need them.

## Tech Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React icons
- Vercel-ready configuration

## Routes

- `/`
- `/projects`
- `/projects/chat`
- `/projects/api`
- `/projects/crawler`
- `/about`
- `/contact`
- Custom `404`

## Folder Structure

```text
frontend/
  public/
    favicon.svg
    og.svg
  src/
    app/
      about/page.tsx
      contact/page.tsx
      projects/page.tsx
      projects/[slug]/page.tsx
      globals.css
      layout.tsx
      not-found.tsx
      page.tsx
      robots.ts
      sitemap.ts
    components/
      animated-section.tsx
      footer.tsx
      hero.tsx
      language-badges.tsx
      navigation.tsx
      profile-card.tsx
      project-card.tsx
      project-detail.tsx
      project-grid.tsx
      section-heading.tsx
      stats-grid.tsx
      theme-toggle.tsx
      visual-panel.tsx
    data/
      projects.ts
    lib/
      utils.ts
  next.config.ts
  package.json
  tailwind.config.ts
  tsconfig.json
  vercel.json
```

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```bash
npm run build
npm run start
```

## Deployment

This app is ready for Vercel. The included `vercel.json` uses:

- Install command: `npm install`
- Build command: `npm run build`
- Framework: `nextjs`

## Placeholder Links

GitHub:

- `https://github.com/rn-coodes/chat-project`
- `https://github.com/rn-coodes/jwt-api-project`
- `https://github.com/rn-coodes/web-crawler-project`

Live demos:

- `https://chat-demo.vercel.app`
- `https://api-demo.vercel.app`
- `https://crawler-demo.vercel.app`
