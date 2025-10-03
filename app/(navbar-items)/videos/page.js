"use client";

import { useState, useEffect } from "react";

export default function VideosPage() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // TODO: Replace with API fetch
    // Mock video data (stored in /public/videos folder for now)
    setVideos([
      { id: 1, title: "Sample Video 1", src: "/videos/sample1.mp4" },
      { id: 2, title: "Sample Video 2", src: "/videos/sample2.mp4" },
    ]);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 text-gray-800 px-3 sm:px-4">
      {/* Header */}
      <main className="flex flex-col items-center w-full max-w-3xl mt-6 gap-6">
        <h1 className="text-2xl font-bold text-gray-900">Videos</h1>

        {/* Video List */}
        {videos.length > 0 ? (
          videos.map((video) => (
            <div
              key={video.id}
              className="w-full bg-white rounded-xl border border-gray-200 shadow-sm p-4"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                {video.title}
              </h2>
              <video
                controls
                className="w-full rounded-lg bg-black"
                src={video.src}
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm mt-6">No videos available.</p>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full max-w-3xl mt-12 mb-4 text-gray-400 text-xs text-center">
        © {new Date().getFullYear()} Socialize. All rights reserved.
      </footer>
    </div>
  );
}
