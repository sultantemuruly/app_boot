import { chatSession } from "@/configs/AIModel";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { prompt } = await request.json();

  try {
    const result = await chatSession.sendMessage(prompt);
    const responseText = result.response.text();
    return NextResponse.json({ result: responseText });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
