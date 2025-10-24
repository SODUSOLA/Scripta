import { Redis } from "ioredis";

export const redis = new Redis(process.env.REDIS_URL, {
    maxRetriesPerRequest: null, // disable built-in retries
    enableReadyCheck: false,    // optional but improves performance
    connectionName: "scripta-ai-worker"
});

redis.on("connect", () => console.log("Redis connected"));
redis.on("error", (err) => console.error("Redis error:", err));
