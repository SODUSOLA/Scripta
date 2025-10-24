import { Queue } from "bullmq";
import { redis } from "../config/redis.js";

export const aiQueue = new Queue("ai-generation-queue", {
    connection: redis,
    defaultJobOptions: {
        attempts: 3,         // Retry failed jobs up to 3 times
        removeOnComplete: 100,
        removeOnFail: 50,
    },
});

console.log("AI Generation Queue initialized");
