import {
  Bot,
  Cable,
  Code2,
  Database,
  Globe2,
  KeyRound,
  LockKeyhole,
  MessageSquareText,
  Network,
  Radar,
  Route,
  ServerCog,
  ShieldCheck,
  Workflow,
  Zap
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type ProjectSlug = "chat" | "api" | "crawler";

export type Project = {
  slug: ProjectSlug;
  title: string;
  eyebrow: string;
  description: string;
  longDescription: string;
  architecture: string;
  features: string[];
  technologies: string[];
  languages: string[];
  github: string;
  demo: string;
  accent: string;
  icon: LucideIcon;
  screenshots: {
    title: string;
    caption: string;
    kind: "chat" | "api" | "crawler";
  }[];
};

export const owner = {
  name: "Rehan",
  studentId: "F24607089",
  university: "National University of Technology",
  role: "Golang Backend Developer",
  skills: ["Golang", "Gin", "JWT", "WebSockets", "Concurrency", "Next.js", "Tailwind CSS"]
};

export const links = {
  github: "https://github.com/rn-coodes",
  mainRepository: "https://github.com/rn-coodes/PFAI-Lab",
  api: "https://advanced-go-projects-backend-f24607089.onrender.com"
};

export const projects: Project[] = [
  {
    slug: "chat",
    title: "Real-Time Chat Application",
    eyebrow: "WebSockets + Go Hub",
    description:
      "A low-latency chat system built around a concurrent Go WebSocket hub, connection lifecycle handling, and live message fan-out.",
    longDescription:
      "The chat project demonstrates a production-minded real-time communication layer in Go. It models connected clients, centralizes fan-out through a hub, and keeps the UI responsive with live delivery patterns that map cleanly to WebSocket infrastructure.",
    architecture:
      "A Go server accepts WebSocket upgrades, registers clients into a hub, and broadcasts messages over channels. The frontend consumes the socket stream, renders optimistic message states, and keeps connection status visible to the user.",
    features: [
      "Bidirectional WebSocket messaging",
      "Concurrent client hub with safe registration and teardown",
      "Live presence and connection-state friendly architecture",
      "Message broadcasting with channel-based Go routines"
    ],
    technologies: ["Go", "Gorilla WebSocket", "Gin", "Channels", "Next.js", "Tailwind CSS"],
    languages: ["Go", "TypeScript", "CSS"],
    github: "https://github.com/rn-coodes/chat-project",
    demo: `${links.api}/api/status`,
    accent: "from-cyan-400 via-sky-500 to-emerald-400",
    icon: MessageSquareText,
    screenshots: [
      {
        title: "Live Rooms",
        caption: "Realtime message lanes, active users, and resilient connection states.",
        kind: "chat"
      },
      {
        title: "Socket Monitor",
        caption: "Hub traffic, broadcasts, joins, leaves, and latency indicators.",
        kind: "chat"
      }
    ]
  },
  {
    slug: "api",
    title: "REST API with JWT Authentication",
    eyebrow: "Secure Gin API",
    description:
      "A hardened REST API with JWT issuance, protected routes, middleware checks, and clean request handling.",
    longDescription:
      "The authentication API focuses on secure backend fundamentals in Go: structured routing, token creation, token validation, middleware enforcement, and consistent JSON responses that are easy to consume from a frontend.",
    architecture:
      "Gin routes are grouped by access level. Public endpoints issue signed JWTs, protected endpoints pass through authentication middleware, and shared handlers keep request validation and error responses consistent.",
    features: [
      "JWT login and token validation",
      "Protected route groups with middleware",
      "Structured JSON responses and error handling",
      "Rate-limit friendly API surface"
    ],
    technologies: ["Go", "Gin", "JWT", "Middleware", "REST", "Postman"],
    languages: ["Go", "JSON", "TypeScript"],
    github: "https://github.com/rn-coodes/jwt-api-project",
    demo: `${links.api}/`,
    accent: "from-emerald-400 via-teal-500 to-cyan-400",
    icon: LockKeyhole,
    screenshots: [
      {
        title: "Auth Console",
        caption: "Token issue flow, protected endpoint states, and request telemetry.",
        kind: "api"
      },
      {
        title: "Route Security",
        caption: "Middleware gates, role-ready handlers, and clean JSON responses.",
        kind: "api"
      }
    ]
  },
  {
    slug: "crawler",
    title: "Concurrent Web Crawler",
    eyebrow: "Goroutines at Work",
    description:
      "A concurrent crawler that explores URLs with worker pools, deduplication, timeout control, and structured results.",
    longDescription:
      "The crawler project highlights Go's concurrency strengths. It coordinates workers, queues links safely, avoids duplicate visits, and produces a compact map of crawl progress for analysis or indexing workflows.",
    architecture:
      "A controller seeds the crawl queue, workers fetch and parse pages concurrently, a visited registry prevents duplicate work, and bounded concurrency keeps the crawler predictable under load.",
    features: [
      "Worker-pool crawling with goroutines",
      "Visited URL deduplication",
      "Timeout-aware HTTP fetching",
      "Structured crawl summaries for downstream analysis"
    ],
    technologies: ["Go", "Goroutines", "Channels", "HTTP", "HTML Parser", "Concurrency"],
    languages: ["Go", "HTML", "TypeScript"],
    github: "https://github.com/rn-coodes/web-crawler-project",
    demo: `${links.api}/health`,
    accent: "from-amber-300 via-orange-500 to-rose-500",
    icon: Network,
    screenshots: [
      {
        title: "Crawl Graph",
        caption: "Concurrent workers, discovered URLs, and queue pressure at a glance.",
        kind: "crawler"
      },
      {
        title: "Worker Timeline",
        caption: "Fetch timings, parsed links, failed requests, and completion states.",
        kind: "crawler"
      }
    ]
  }
];

export const stats = [
  { label: "Golang Projects", value: "3", icon: Code2 },
  { label: "Core Language", value: "Go", icon: Bot },
  { label: "Backend Patterns", value: "9+", icon: Workflow },
  { label: "Deploy Target", value: "Vercel", icon: Zap }
];

export const architectureHighlights = [
  { label: "WebSockets", icon: Cable },
  { label: "JWT Security", icon: ShieldCheck },
  { label: "REST Routing", icon: Route },
  { label: "Data Models", icon: Database },
  { label: "Go Services", icon: ServerCog },
  { label: "Crawler Graphs", icon: Globe2 },
  { label: "Token Flow", icon: KeyRound },
  { label: "Observability", icon: Radar }
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
