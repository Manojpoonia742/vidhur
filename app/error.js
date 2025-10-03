"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }) {
  // Optional: log error
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      {/* Error Illustration */}
      <div className="mb-8">
        <img
          src="https://i.imgur.com/OpkK1kp.png" // free error illustration
          alt="Something went wrong"
          className="w-64 max-w-full mx-auto"
        />
      </div>

      {/* Error Text */}
      <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 mb-4">
        Oops!
      </h1>
      <p className="text-gray-700 text-lg mb-6">
        Something went wrong. Please try again later.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {/* Go Home */}
        <Link
          href="/"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition"
        >
          Go Home
        </Link>

        {/* Retry (reset error boundary) */}
        <button
          onClick={() => reset()}
          className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-6 py-3 rounded-lg shadow transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
