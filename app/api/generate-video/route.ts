import * as fal from "@fal-ai/client";
import { NextRequest } from "next/server";

fal.config({
  credentials: process.env.FAL_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    const result: any = await fal.subscribe("fal-ai/luma-dream-machine", {
      inputs: { prompt: prompt },
      logs: true,
    });
    return Response.json({ video: result.video.url });
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}