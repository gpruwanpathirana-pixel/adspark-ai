"use client";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("si");
  const [translateLang, setTranslateLang] = useState("en");

  const generate = async () => {
    setLoading(true);
    setResult("");
    const res = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({ prompt, language, type: "generate" }),
    });
    const data = await res.json();
    setResult(data.text);
    setLoading(false);
  };

  const translate = async () => {
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({ text: result, targetLanguage: translateLang, type: "translate" }),
    });
    const data = await res.json();
    setResult(data.text);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold">AdSpark AI</h1>
      <p className="text-gray-400">සිංහල / English දෙකෙන්ම Viral Ad හදන්න</p>

      <div className="mt-6 flex gap-2">
        <select value={language} onChange={(e) => setLanguage(e.target.value)} className="bg-zinc-800 p-3 rounded-lg">
          <option value="si">සිංහල</option>
          <option value="en">English</option>
          <option value="ta">தமிழ்</option>
          <option value="hi">Hindi</option>
          <option value="ja">Japanese</option>
        </select>
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="A viral ad for a coffee shop / කෝපි ශොප් එකක් සඳහා"
          className="flex-1 bg-zinc-800 p-3 rounded-lg"
        />
      </div>

      <button onClick={generate} className="mt-4 bg-white text-black px-6 py-3 rounded-lg font-bold w-full">
        {loading ? "හදනවා..." : "Generate Viral Ad"}
      </button>

      {result && (
        <div className="mt-6 bg-[#0f172a] p-6 rounded-xl whitespace-pre-wrap">
          {result}

          <div className="mt-6 border-t border-zinc-700 pt-4 flex gap-2">
            <select value={translateLang} onChange={(e) => setTranslateLang(e.target.value)} className="bg-zinc-800 p-2 rounded">
              <option value="en">English වලට</option>
              <option value="si">සිංහලට</option>
              <option value="ta">தமிழ் වලට</option>
            </select>
            <button onClick={translate} className="bg-blue-600 px-4 py-2 rounded">
              Translate කරමු
            </button>
          </div>
        </div>
      )}
    </main>
  );
}