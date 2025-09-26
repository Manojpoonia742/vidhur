'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-white dark:bg-gray-950 transition-colors duration-300 px-2 sm:px-4">
      {/* Main Feed */}
      <main className="flex flex-col items-center w-full max-w-2xl mt-8 gap-6">
        {/* Post Box */}
        <div className="w-full bg-white/95 dark:bg-gray-900 rounded-2xl shadow-md p-4 flex flex-col gap-3 transition-colors duration-300">
          <textarea
            className="w-full resize-none rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600 transition text-sm"
            rows={3}
            placeholder="What's happening?"
          />
          <div className="flex justify-end">
            <button className="bg-gradient-to-r from-indigo-600 to-violet-500 dark:from-indigo-500 dark:to-violet-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:scale-105 transition text-sm">
              Post
            </button>
          </div>
        </div>

        {/* Posts List (Mock Data) */}
        {[1, 2, 3].map((id) => (
          <div
            key={id}
            className="w-full bg-white/95 dark:bg-gray-900 rounded-2xl shadow-md p-4 flex gap-4 transition-colors duration-300"
          >
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-lg">
                U
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900 dark:text-gray-100">User Name</span>
                <span className="text-gray-500 dark:text-gray-400 text-xs">@username · 1m</span>
              </div>
              <p className="mt-1 text-gray-800 dark:text-gray-200 text-sm">
                This is a sample post! 🎉
              </p>
              <div className="flex gap-6 mt-3 text-gray-500 dark:text-gray-400 text-xs">
                <button className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Reply</button>
                <button className="hover:text-violet-600 dark:hover:text-violet-400 transition">Repost</button>
                <button className="hover:text-pink-600 dark:hover:text-pink-400 transition">Like</button>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* Footer */}
      <footer className="w-full max-w-2xl mt-12 mb-4 text-gray-500 dark:text-gray-400 text-xs text-center">
        © {new Date().getFullYear()} Socialize. All rights reserved.
      </footer>
    </div>
  );
}
