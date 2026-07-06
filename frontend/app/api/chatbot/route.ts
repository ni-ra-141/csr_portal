import { NextResponse } from "next/server";
import { askGemini } from "@/lib/gemini";
import { searchKnowledge } from "@/lib/search";

export async function POST(req: Request) {
    console.log("Chatbot API called");
    try {
        const { message } = await req.json();

        const context = searchKnowledge(message);

        const reply = await askGemini(message, context);

        return NextResponse.json({
            reply,
        });

    } catch (error) {
        console.error("Chatbot API error:", error);
        return NextResponse.json(
            {
                reply: "Sorry, something went wrong."
            },
            {
                status: 500
            }
        );
    }
}