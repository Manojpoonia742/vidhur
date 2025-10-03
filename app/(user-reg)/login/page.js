"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

async function apiPost(url, data) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  try {
    return await res.json();
  } catch {
    return { error: "Invalid response from server" };
  }
}

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await apiPost("/api/auth/login", { usernameOrEmail: email, password });

    if (res.token) {
      // Store token in a cookie for server-side middleware
      document.cookie = `token=${res.token}; path=/; max-age=${7 * 24 * 60 * 60}`;

      router.push("/"); // redirect to home
    } else {
      setError(res.error || "Login failed!");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 transition-colors duration-300 px-2 sm:px-4">
      <div className="bg-white/95 dark:bg-gray-900 rounded-2xl shadow-2xl p-6 sm:p-10 md:p-12 w-full max-w-xs sm:max-w-md flex flex-col items-center transition-colors duration-300">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-violet-500 dark:from-indigo-400 dark:to-violet-400 mb-4 sm:mb-6 text-center">
          Welcome Back!
        </h1>
        <form onSubmit={handleLogin} className="w-full flex flex-col gap-3 sm:gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600 transition text-sm sm:text-base bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600 transition text-sm sm:text-base bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-gradient-to-r from-indigo-600 to-violet-500 dark:from-indigo-500 dark:to-violet-600 text-white font-semibold py-2 sm:py-3 rounded-lg shadow-md hover:scale-105 transition text-sm sm:text-base disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}

        <div className="w-full flex flex-col sm:flex-row justify-between items-center mt-4 text-xs sm:text-sm gap-2 sm:gap-0">
          <Link href="/forgot-password" className="text-indigo-600 dark:text-indigo-400 hover:underline">
            Forgot password?
          </Link>
          <span className="text-gray-600 dark:text-gray-300">
            Not have an account yet?{" "}
            <Link href="/signup" className="font-bold text-violet-600 dark:text-violet-400 hover:underline hover:text-violet-700 dark:hover:text-violet-300 transition">
              Sign up
            </Link>
          </span>
        </div>

        <div className="mt-6 sm:mt-8 text-gray-500 dark:text-gray-400 text-xs text-center">
          © {new Date().getFullYear()} Socialize. All rights reserved.
        </div>
      </div>
    </div>
  );
}
