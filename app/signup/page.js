'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SignupPage() {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.password) {
            setError('All fields are required.');
            return;
        }
        setError('');
        // Add your signup logic here
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 transition-colors duration-300 px-2 sm:px-4">
            <div className="bg-white/95 dark:bg-gray-900 rounded-2xl shadow-2xl p-6 sm:p-10 md:p-12 w-full max-w-xs sm:max-w-md flex flex-col items-center transition-colors duration-300">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-violet-500 dark:from-indigo-400 dark:to-violet-400 mb-4 sm:mb-6 text-center">
                    Create Account
                </h1>
                {error && <div className="mb-3 text-red-500 text-center w-full">{error}</div>}
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 sm:gap-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleChange}
                        className="px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600 transition text-sm sm:text-base bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600 transition text-sm sm:text-base bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="px-3 py-2 sm:px-4 sm:py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-600 transition text-sm sm:text-base bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        required
                    />
                    <button
                        type="submit"
                        className="mt-2 bg-gradient-to-r from-indigo-600 to-violet-500 dark:from-indigo-500 dark:to-violet-600 text-white font-semibold py-2 sm:py-3 rounded-lg shadow-md hover:scale-105 transition text-sm sm:text-base"
                    >
                        Sign Up
                    </button>
                </form>
                <div className="w-full flex flex-col sm:flex-row justify-between items-center mt-4 text-xs sm:text-sm gap-2 sm:gap-0">
                    <span className="text-gray-600 dark:text-gray-300">
                        Already have an account?{' '}
                        <Link href="/login" className="font-bold text-violet-600 dark:text-violet-400 hover:underline hover:text-violet-700 dark:hover:text-violet-300 transition">
                            Log in
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
