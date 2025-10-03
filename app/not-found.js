"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <img
        src="https://i.imgur.com/oCkEbrA.png"
        alt="404 Not Found"
        className="w-64 max-w-full mx-auto mb-8"
      />
      <h1 className="text-6xl font-extrabold text-gray-900 mb-4">404</h1>
      <p className="text-gray-700 text-lg mb-6">
        Oops! The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
