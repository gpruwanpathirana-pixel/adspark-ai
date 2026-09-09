"use client";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [loading, setLoading] = useState(false);

  const generateAd = async () => {
    setLoading(true);
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
    <div style={{ padding: 20 }}>
      <h1>AdSpark AI</h1>
      <textarea value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="Red Ferrari" style={{width:"100%",height:80}} />
      <button onClick={generateAd}>Generate Ad</button>
      {image && <><img src={image} style={{width:"100%"}} /><button onClick={generateVideo}>🎬 Video හදන්න</button></>}
      {loading && <p>Loading...</p>}
      {video && <video src={video} controls style={{width:"100%"}} />}
    </div>
  );
}
