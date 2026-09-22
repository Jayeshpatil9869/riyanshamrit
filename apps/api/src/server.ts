import { buildApp } from "./app.js";

const port = Number(process.env.API_PORT ?? 4000);

const { app } = await buildApp();
await app.listen({ port, host: "0.0.0.0" });
console.log(`API listening on http://localhost:${port}`);
