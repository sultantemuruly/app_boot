import { GenAICode } from "@/configs/AIModel";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { prompt } = await request.json();

  try {
    const result = await GenAICode.sendMessage(prompt);
    const response = result.response.text();
    return NextResponse.json(JSON.parse(response));
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
