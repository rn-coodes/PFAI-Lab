import type { Metadata } from "next";
import { CrawlerDemo } from "@/components/crawler-demo";
import { DemoShell } from "@/components/demo-shell";

export const metadata: Metadata = { title: "Live Crawler Demo" };

export default function CrawlerDemoPage() {
  return <DemoShell eyebrow="Interactive Concurrency Demo" title="Concurrent Web Crawler" description="Send a URL to the live Go worker pool and inspect the crawl results." repository="https://github.com/rn-coodes/web-crawler-project"><CrawlerDemo /></DemoShell>;
}
