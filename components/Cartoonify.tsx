'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import Upload from "@/components/upload";
import Image from "next/image";
import DownloadButton from "@/components/DownloadButton";
import CameraSvg from "@/public/CameraSvg";
import { supabase } from "@/lib/supabaseClient";

export default function Cartoonify() {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [limitInfo, setLimitInfo] = useState<{remaining: number, resetAt: string, allowed: boolean} | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // Fetch user and limit info on mount
  useEffect(() => {
    const fetchUserAndLimit = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData.session?.user;
      if (user?.id) {
        setUserId(user.id);
        await fetchLimit(user.id);
      }
    };
    fetchUserAndLimit();
  }, []);

  // Fetch limit info
  const fetchLimit = async (uid: string) => {
    try {
      const res = await axios.post('/api/limit', { userId: uid });
      setLimitInfo(res.data);
    } catch (err) {
      setLimitInfo(null);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !userId) return;

    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Upload to Vercel Blob
      const uploadRes = await axios.post('/api/upload', formData);
      const imageUrl = uploadRes.data.url;

      // Process with Stable Diffusion
      const cartoonRes = await axios.post('/api/cartoonify', { imageUrl, userId });
      setResult(cartoonRes.data.resultUrl);
      await fetchLimit(userId); // Refresh limit info after use
    } catch (err: any) {
      if (err?.response?.status === 429 && err?.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('Failed to process image. Please try again.');
      }
      await fetchLimit(userId); // Still refresh limit info
    } finally {
      setLoading(false);
    }
  };

  const handlePictureUpload = (file: File) => {
    setFile(file);
    // Don't call handleUpload here - let the user click the button
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 min-h-screen p-4">
      <div className="flex flex-col justify-center items-center gap-3 pt-6">
        <h1 className="text-5xl font-semibold max-md:text-3xl">Transform Your Photos into Cartoons</h1>
        <h3 className="text-white/80 text-xl">Upload any photo and watch our AI turn it into an amzing cartoon art.</h3>
        {/* {limitInfo && (
          <div className="mt-2 text-sm text-white/80 bg-gray-800/60 rounded px-4 py-2">
            <span>Daily uses left: <b>{limitInfo.remaining}</b> / 5</span><br />
            <span>Resets: <b>{new Date(limitInfo.resetAt).toLocaleString()}</b></span>
          </div>
        )} */}
      </div>
      <div className="w-full flex max-md:flex-col justify-center items-center gap-7">
        <div className="border border-gray-300 bg-gray-300/35 w-full max-w-md h-auto rounded-xl p-4">
        <Upload submit={handlePictureUpload} />
        {file && (
          <div className="mt-4">
            <button
              onClick={handleUpload}
              disabled={loading || !!(limitInfo && limitInfo.remaining <= 0)}
              className={`w-full py-2 px-4 rounded-md ${
                loading || (limitInfo && limitInfo.remaining <= 0) ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
              } text-white transition-colors`}
            >
              {loading ? 'Processing...' : 'Convert to Cartoon'}
            </button>
          </div>
        )}
      </div>

      <div className="bg-gray-300/40 w-full max-w-md min-h-[400px] justify-center items-center rounded-lg p-4 flex">
        {loading ? (
          <div className="animate-pulse">Converting image...</div>
        ) : result ? (
          <div className="flex flex-col w-full min-h-[400px] gap-4">
            <div className="relative w-full min-h-[400px] flex flex-col">
                <a 
                  href={result} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full relative block" 
                  style={{ aspectRatio: '1/1' }}
                >
                  <Image
                    src={result}
                    alt="Cartoon result"
                    fill
                    className="object-contain cursor-pointer hover:opacity-90 transition-opacity"
                    unoptimized
                  />
                </a>
            </div>
            <DownloadButton imageUrl={result}/>
          </div>
        ) : (
          <div className="text-white flex flex-col justify-center items-center gap-5">
            <CameraSvg width={55} height={55}/>
            <span>Your Cartoon result will appear here</span>
          </div>
        )}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
      </div>
    </div>
  );
}