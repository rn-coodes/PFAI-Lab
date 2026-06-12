import type { Metadata } from "next";
import { ApiDemo } from "@/components/api-demo";
import { DemoShell } from "@/components/demo-shell";

export const metadata: Metadata = { title: "Live JWT API Demo" };

export default function ApiDemoPage() {
  return <DemoShell eyebrow="Interactive Security Demo" title="JWT Authentication Console" description="Execute a real account registration and protected profile request against the deployed Go API." repository="https://github.com/rn-coodes/jwt-api-project"><ApiDemo /></DemoShell>;
}
