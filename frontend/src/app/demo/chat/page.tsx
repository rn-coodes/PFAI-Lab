import type { Metadata } from "next";
import { ChatDemo } from "@/components/chat-demo";
import { DemoShell } from "@/components/demo-shell";

export const metadata: Metadata = { title: "Live Chat Demo" };

export default function ChatDemoPage() {
  return <DemoShell eyebrow="Interactive WebSocket Demo" title="Real-Time Go Chat" description="A real authenticated WebSocket session powered by the deployed Railway backend." repository="https://github.com/rn-coodes/chat-project"><ChatDemo /></DemoShell>;
}
