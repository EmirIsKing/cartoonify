'use client'
import { useState } from "react";
import axios from "axios";
import Upload from "@/components/upload";
import Image from "next/image";
import DownloadButton from "@/components/DownloadButton";


export default function Home() {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Upload to Vercel Blob
      const uploadRes = await axios.post('/api/upload', formData);
      const imageUrl = uploadRes.data.url;

      // Process with Stable Diffusion
      const cartoonRes = await axios.post('/api/cartoonify', { imageUrl });
      console.log(cartoonRes)
      console.log(cartoonRes.data.resultUrl)
      setResult(cartoonRes.data.resultUrl);
    } catch (err) {
      console.error(err);
      setError('Failed to process image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePictureUpload = (file: File) => {
    setFile(file);
    // Don't call handleUpload here - let the user click the button
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-8 min-h-screen p-4">
      <div className="border border-gray-300 w-full max-w-md h-auto rounded-lg p-4">
        <Upload submit={handlePictureUpload} />
        {file && (
          <div className="mt-4">
            <button
              onClick={handleUpload}
              disabled={loading}
              className={`w-full py-2 px-4 rounded-md ${
                loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
              } text-white transition-colors`}
            >
              {loading ? 'Processing...' : 'Convert to Cartoon'}
            </button>
          </div>
        )}
      </div>

      <div className="border border-gray-300 w-full max-w-md min-h-[400px] justify-center items-center rounded-lg p-4 flex">
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
          <div className="text-gray-500">Cartoon result will appear here</div>
        )}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
}