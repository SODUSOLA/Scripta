import { prisma } from "../db.js";

async function main() {
    const plans = [
        {
            name: "Freemium",
            description: "Basic plan with limited daily AI generations",
            dailyLimit: 10,
            monthlyPriceUSD: 0,
        },
        {
            name: "Pro",
            description: "Advanced plan with higher limits and faster generation",
            dailyLimit: 100,
            monthlyPriceUSD: 19.99,
        },
    ];

    for (const plan of plans) {
        await prisma.subscriptionPlan.upsert({
            where: { name: plan.name },
            update: plan,
            create: plan,
        });
    }

    console.log("Plans seeded successfully!");
    }
    
    main()
        .catch((e) => console.error(e))
        .finally(async () => await prisma.$disconnect());
