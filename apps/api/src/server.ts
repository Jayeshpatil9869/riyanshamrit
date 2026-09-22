import { config } from "dotenv";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL(".", import.meta.url)), "../../..");
config({ path: resolve(root, ".env") });
config({ path: resolve(root, "apps/api/.env") });

const { buildApp } = await import("./app.js");

const port = Number(process.env.API_PORT ?? 4000);

const { app } = await buildApp();
await app.listen({ port, host: "0.0.0.0" });
console.log(`API listening on http://localhost:${port}`);
