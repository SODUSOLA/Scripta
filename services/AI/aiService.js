import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "../../db.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const MODEL_NAME = "gemini-2.5-flash";
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

// Generate a social post draft based on topic, tone, and platform
export async function generatePost({ userId, topic, tone, platform, regenerate = false }) {
  if (!topic) throw new Error("Topic or prompt required");

  // Fetch user's plan dynamically
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { subscription: true },
  });

  const DAILY_GENERATION_LIMIT = user?.subscription?.dailyLimit || 10;

  // Define today's start & end
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  // Count today's AI usage
  const dailyUsage = await prisma.aIUsage.count({
    where: {
      userId,
      createdAt: { gte: todayStart, lte: todayEnd },
    },
  });

  if (dailyUsage >= DAILY_GENERATION_LIMIT) {
    throw new Error(
      `You've reached your daily AI generation limit (${DAILY_GENERATION_LIMIT}). Please try again tomorrow or upgrade your plan.`
    );
  }

  // Use cached response if regenerate=false
  if (!regenerate) {
    const cached = await prisma.aICache.findFirst({
      where: { userId, topic, tone, platform },
    });
    if (cached) {
      console.log("Using cached response");
      return await prisma.draft.create({
        data: {
          userId,
          title: topic,
          content: cached.content,
          tone,
          platform,
          generated: true,
          localLastUpdatedAt: new Date(),
          serverLastUpdatedAt: new Date(),
        },
      });
    }
  }

  // Build Gemini prompt
  const prompt = `
Generate a slightly lengthy, engaging social media post.
Platform: ${platform || "Generic"}.
Tone: ${tone || "Neutral"}.
Topic: ${topic}.
Keep it concise (max 300 chars if X/Twitter, 3000 if LinkedIn, 100 if Facebook, 2000 if Instagram).
Use natural phrasing suitable for ${platform || "general"} readers.
`;

  // Gemini API Call
  const startTime = Date.now();
  const result = await model.generateContent(prompt);
  const elapsed = Date.now() - startTime;
  const generatedText = result.response.text().trim();

  // Estimate token usage and cost
  const tokensUsed = Math.round(prompt.split(" ").length * 1.3 + generatedText.split(" ").length);
  const costUSD = (tokensUsed / 1000) * 0.0005;

  // Log AI usage
  await prisma.aIUsage.create({
    data: {
      userId,
      model: MODEL_NAME,
      tokensUsed,
      costUSD,
    },
  });

  // Cache curent generation
  await prisma.aICache.upsert({
    where: {
      userId_topic_tone_platform: { userId, topic, tone, platform },
    },
    update: { content: generatedText },
    create: {
      userId,
      topic,
      tone,
      platform,
      content: generatedText,
      model: MODEL_NAME,
    },
  });

  // Create draft record
  const draft = await prisma.draft.create({
    data: {
      userId,
      title: topic,
      content: generatedText,
      tone,
      platform,
      generated: true,
      localLastUpdatedAt: new Date(),
      serverLastUpdatedAt: new Date(),
    },
  });

  console.log(`AI generation took ${elapsed}ms and used ~${tokensUsed} tokens`);
  return draft;
}
