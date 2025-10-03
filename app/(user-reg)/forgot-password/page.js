'use client';

import Link from 'next/link';


export default function ForgotPasswordPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 transition-colors duration-300 px-2 sm:px-4">
            <div className="bg-white/95 dark:bg-gray-900 rounded-2xl shadow-2xl p-6 sm:p-10 md:p-12 w-full max-w-xs sm:max-w-md flex flex-col items-center transition-colors duration-300">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-violet-500 dark:from-indigo-400 dark:to-violet-400 mb-4 sm:mb-6 text-center">
                    Forgot Password
                </h1>
                <p className="mb-4 sm:mb-6 text-gray-600 dark:text-gray-300 text-center text-sm sm:text-base">
                    Enter your email address and we'll send you a link to reset your password.
                </p>
                <form className="w-full flex flex-col gap-3 sm:gap-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600 transition text-sm sm:text-base bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        required
                    />
                    <button
                        type="submit"
                        className="mt-2 bg-gradient-to-r from-indigo-600 to-violet-500 dark:from-indigo-500 dark:to-violet-600 text-white font-semibold py-2 sm:py-3 rounded-lg shadow-md hover:scale-105 transition text-sm sm:text-base"
                    >
                        Send Reset Link
                    </button>
                </form>
                <div className="w-full flex justify-center items-center mt-4 text-xs sm:text-sm">
                    <Link href="/login" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                        Back to Login
                    </Link>
                </div>
                <div className="mt-6 sm:mt-8 text-gray-500 dark:text-gray-400 text-xs text-center">
                    © {new Date().getFullYear()} Socialize. All rights reserved.
                </div>
            </div>
        </div>
    );
}
