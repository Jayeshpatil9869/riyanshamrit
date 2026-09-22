import type { VercelRequest, VercelResponse } from "@vercel/node";

// Serverless entry for Vercel — wraps Fastify
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { buildApp } = await import("../src/app.js");
  const { app } = await buildApp();
  await app.ready();

  const url = req.url ?? "/";
  const response = await app.inject({
    method: (req.method ?? "GET") as "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    url,
    headers: req.headers as Record<string, string>,
    payload: req.body,
  });

  res.statusCode = response.statusCode;
  for (const [key, value] of Object.entries(response.headers)) {
    if (value != null) res.setHeader(key, String(value));
  }
  res.send(response.payload);
}
