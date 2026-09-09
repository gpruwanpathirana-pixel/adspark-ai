"use client";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [loading, setLoading] = useState(false);

  const generateAd = async () => {
    setLoading(true);
    setImage("");
    setVideo("");
    const res = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setImage(data.imageUrl || "https://picsum.photos/512/512");
    setLoading(false);
  };

  const generateVideo = async () => {
    setLoading(true);
    const res = await fetch("/api/generate-video", {
      method: "POST",
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setVideo(data.videoUrl);
    setLoading(false);
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "auto", fontFamily: "sans-serif" }}>
      <h1>🎨 AdSpark AI</h1>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ad එක ගැන ලියන්න... උදා: Red Ferrari"
        style={{ width: "100%", height: 80, padding: 10 }}
      />
      <br/><br/>
      <button onClick={generateAd} style={{ padding: "10px 20px", background: "blue", color: "white", border: 0, borderRadius: 8 }}>
        Generate Ad
      </button>
      {image && (
        <>
          <br/><br/>
          <img src={image} style={{ width: "100%", borderRadius: 10 }} />
          <br/><br/>
          <button onClick={generateVideo} style={{ padding: "10px 20px", background: "purple", color: "white", border: 0, borderRadius: 8 }}>
            🎬 දැන් Video එක හදන්න
          </button>
        </>
      )}
      {loading && <p>Loading...</p>}
      {video && <video src={video} controls autoPlay style={{ width: "100%", marginTop: 20 }} />}
    </div>
  );
}