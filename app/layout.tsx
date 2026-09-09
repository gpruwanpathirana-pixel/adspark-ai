import { NextRequest } from "next/server";
import * as fal from "@fal-ai/serverless-client";

fal.config({
  credentials: process.env.FAL_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    const result: any = await fal.subscribe("fal-ai/fast-svd-lcm", {
      inputs: {
        prompt: prompt,
        image_size: "landscape_16_9",
        motion_bucket_id: 127,
      },
      logs: true,
    });
    return Response.json({ video: result.video.url });
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}