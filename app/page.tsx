"use client";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("මගේ සිවිලිම බිස්නස් එකට");
  const [concepts, setConcepts] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoLoading, setVideoLoading] = useState(false);

  // 1. Script / Concept හදන එක
  async function generateConcepts() {
    setLoading(true);
    setConcepts("");
    setVideoUrl("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await res.json();
      setConcepts(data.text  data.concepts  data.result || "Error");
    } catch (e) {
      setConcepts("Error එකක් ආවා");
    }
    setLoading(false);
  }

  // 2. Video එක හදන එක - ඔයාගේ generate-video එකට call කරනවා
  async function generateVideo() {
    setVideoLoading(true);
    setVideoUrl("");
    try {
      const res = await fetch("/api/generate-video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input + " viral ad, modern ceiling business, luxury house interior, cinematic 8k" }),
      });
      const data = await res.json();
      if (data.video) {
        setVideoUrl(data.video);
      } else {
        alert("Video Error: " + (data.error || "Unknown"));
      }
    } catch (e: any) {
      alert("Error: " + e.message);
    }
    setVideoLoading(false);
  }

  return (
    <main className="min-h-screen bg-black text-white p-5">
      <h1 className="text-3xl font-bold">AdSpark AI</h1>
      <p className="text-gray-400 mb-5">සිංහල / English දෙකෙන්ම Viral Ad හදන්න</p>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700"
        rows={3}
        placeholder="ඔයාගේ බිස්නස් එක ගැන ලියන්න..."
      />

      <button onClick={generateConcepts} disabled={loading} className="w-full mt-4 p-3 bg-white text-black rounded-lg font-bold">
        {loading ? "Script එක හදනවා..." : "Generate Viral Ad"}
      </button>

      {concepts && (
        <div className="mt-6 p-4 bg-zinc-900 rounded-xl border border-zinc-800">
          <p className="whitespace-pre-wrap text-sm">{concepts}</p>
          
          <button onClick={generateVideo} disabled={videoLoading} className="w-full mt-5 p-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold text-lg">
            {videoLoading ? "🎬 Video එක හදනවා... විනාඩි 2ක් ඉන්න" : "🎬 දැන් Video එක හදන්න"}
          </button>
        </div>
      )}

      {videoLoading && (
        <div className="mt-6 text-center p-4 bg-yellow-900/30 rounded">
          <p>AI එක Video එක හදනවා... මේකට විනාඩි 1-2ක් යනවා, Page එක Close කරන්න එපා!</p>
        </div>
      )}

      {videoUrl && (
        <div className="mt-6 p-3 bg-green-900/30 rounded-xl border border-green-700">
          <h2 className="font-bold mb-3 text-green-400">ඔයාගේ Video එක Ready! 🔥</h2>
          <video src={videoUrl} controls autoPlay loop className="w-full rounded-lg" />
          <a href={videoUrl} target="_blank" className="block mt-3 text-center p-3 bg-green-600 rounded-lg font-bold">
            Download Video ⬇️
          </a>
        </div>
      )}
    </main>
  );
}