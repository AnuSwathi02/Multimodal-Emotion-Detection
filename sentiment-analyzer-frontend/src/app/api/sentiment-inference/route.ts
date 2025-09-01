import { NextResponse } from "next/server";
import { env } from "~/env";
import { db } from "~/server/db";

export async function POST(req: Request) {
    try {
        // Get API key from the header
        const apiKey = req.headers.get("Authorization")?.replace("Bearer ", "");
        if (!apiKey) {
            return NextResponse.json({ error: "API key required" }, { status: 401 });
        }

        // Find the user by API key
        const quota = await db.apiQuota.findUnique({
            where: {
                secretKey: apiKey,
            },
            select: {
                userId: true,
            },
        });

        if (!quota) {
            return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
        }

        const { key } = await req.json();

        if (!key) {
            return NextResponse.json({ error: "File key required" }, { status: 400 });
        }

        // For local development, return mock analysis
        if (env.AWS_REGION === "local") {
            // Update video file as analyzed
            await db.videoFile.update({
                where: { key },
                data: { analyzed: true },
            });

            // Return mock sentiment analysis results in the expected format
            const mockAnalysis = {
                analysis: {
                    utterances: [
                        {
                            start_time: 0.0,
                            end_time: 2.5,
                            text: "This is absolutely amazing! I love how everything turned out.",
                            emotions: [
                                { label: "joy", confidence: 0.85 },
                                { label: "surprise", confidence: 0.12 },
                                { label: "neutral", confidence: 0.03 }
                            ],
                            sentiments: [
                                { label: "positive", confidence: 0.92 },
                                { label: "neutral", confidence: 0.08 }
                            ]
                        },
                        {
                            start_time: 2.5,
                            end_time: 5.0,
                            text: "The quality is outstanding and the results are fantastic.",
                            emotions: [
                                { label: "joy", confidence: 0.78 },
                                { label: "surprise", confidence: 0.15 },
                                { label: "neutral", confidence: 0.07 }
                            ],
                            sentiments: [
                                { label: "positive", confidence: 0.88 },
                                { label: "neutral", confidence: 0.12 }
                            ]
                        },
                        {
                            start_time: 5.0,
                            end_time: 7.5,
                            text: "I'm really impressed with the overall performance.",
                            emotions: [
                                { label: "joy", confidence: 0.72 },
                                { label: "surprise", confidence: 0.18 },
                                { label: "neutral", confidence: 0.10 }
                            ],
                            sentiments: [
                                { label: "positive", confidence: 0.85 },
                                { label: "neutral", confidence: 0.15 }
                            ]
                        }
                    ]
                }
            };

            return NextResponse.json(mockAnalysis);
        }

        // Original AWS SageMaker code for production would go here
        // For now, return error for non-local environments
        return NextResponse.json(
            { error: "AWS SageMaker endpoint not configured" },
            { status: 501 }
        );

    } catch (error) {
        console.error("Sentiment inference error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}