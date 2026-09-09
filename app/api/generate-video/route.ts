import * as fal from "@fal-ai/client";
import { NextRequest } from "next/server";

fal.config({
  credentials: process.env.FAL_KEY!,
});

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    const result: any = await fal.subscribe("fal-ai/minimax-video", {
      inputs: { prompt },
    });
    const videoUrl = result.data?.video?.url || result.video?.url;
    return Response.json({ video: videoUrl });
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}