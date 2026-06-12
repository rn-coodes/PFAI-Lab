export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://advanced-go-backend-f24607089-production.up.railway.app";

export async function apiRequest<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers
    }
  });

  const body = (await response.json()) as T & { error?: string };
  if (!response.ok) {
    throw new Error(body.error ?? "Request failed");
  }
  return body;
}

export function createDemoCredentials(prefix: string) {
  return {
    name: "Rehan Demo",
    email: `${prefix}-${Date.now()}@demo.local`,
    password: "demo-password-246"
  };
}
