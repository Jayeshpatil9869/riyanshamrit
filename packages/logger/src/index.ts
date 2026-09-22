import pino from "pino";

export function createLogger(name = "riyanshamrit") {
  return pino({
    name,
    level: process.env.LOG_LEVEL ?? "info",
    base: undefined,
  });
}

export type Logger = ReturnType<typeof createLogger>;
