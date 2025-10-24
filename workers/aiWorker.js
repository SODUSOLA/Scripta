import { Worker } from "bullmq";
import { redis } from "../config/redis.js";
import { generatePost } from "../services/AI/aiService.js";

export const aiWorker = new Worker(
    "ai-generation-queue",
    async (job) => {
        console.log(`Processing AI job: ${job.id} for user ${job.data.userId}`);
        const { 
            userId, 
            topic, 
            tone, 
            platform, 
            regenerate } = job.data;

        const result = await generatePost({ 
            userId, 
            topic, 
            tone, 
            platform, 
            regenerate 
        });
        console.log(`Job ${job.id} completed`);
        return result;
    },
    { connection: redis }
    );

    aiWorker.on("completed", (job) => {
        console.log(`Job ${job.id} completed successfully`);
    });

    aiWorker.on("failed", (job, err) => {
        console.error(`Job ${job.id} failed:`, err.message);
});
