'use client';

import Link from 'next/link';
import {
    IoHomeOutline,
    IoSearchOutline,
    IoAddCircleOutline,
    IoVideocamOutline,
    IoPersonOutline,
} from 'react-icons/io5';

function Navbar() {
    return (
        <nav
            className={`
                fixed
                bottom-0 left-0 right-0
                z-40
                bg-white/95 dark:bg-gray-900
                shadow-2xl
                rounded-t-2xl
                px-4 py-2
                flex justify-between items-center
                max-w-md mx-auto
                transition-all duration-300

                sm:top-auto sm:bottom-0 sm:left-1/2 sm:-translate-x-1/2 sm:rounded-2xl sm:px-8 sm:py-3

                md:top-0 md:bottom-0 md:left-0 md:right-auto md:translate-x-0 md:translate-y-0
                md:flex-col md:justify-start md:items-center md:w-20 md:max-w-none md:rounded-none
                md:h-screen md:py-8 md:px-1
                lg:w-20 lg:px-2
            `}
        >
            <Link
                href="/"
                className="flex flex-col items-center text-indigo-700 dark:text-indigo-400 hover:text-violet-600 dark:hover:text-violet-400 transition md:mb-8"
            >
                <IoHomeOutline className="text-2xl sm:text-3xl" />
                <span className="text-xs sm:text-sm mt-1 md:hidden lg:block">Home</span>
            </Link>
            <Link
                href="/search"
                className="flex flex-col items-center text-indigo-700 dark:text-indigo-400 hover:text-violet-600 dark:hover:text-violet-400 transition md:mb-8"
            >
                <IoSearchOutline className="text-2xl sm:text-3xl" />
                <span className="text-xs sm:text-sm mt-1 md:hidden lg:block">Search</span>
            </Link>
            <Link
                href="/post"
                className="flex flex-col items-center text-indigo-700 dark:text-indigo-400 hover:text-violet-600 dark:hover:text-violet-400 transition md:mb-8"
            >
                <IoAddCircleOutline className="text-3xl sm:text-4xl" />
                <span className="text-xs sm:text-sm mt-1 md:hidden lg:block">Post</span>
            </Link>
            <Link
                href="/videos"
                className="flex flex-col items-center text-indigo-700 dark:text-indigo-400 hover:text-violet-600 dark:hover:text-violet-400 transition md:mb-8"
            >
                <IoVideocamOutline className="text-2xl sm:text-3xl" />
                <span className="text-xs sm:text-sm mt-1 md:hidden lg:block">Videos</span>
            </Link>
            <Link
                href="/profile"
                className="flex flex-col items-center text-indigo-700 dark:text-indigo-400 hover:text-violet-600 dark:hover:text-violet-400 transition"
            >
                <IoPersonOutline className="text-2xl sm:text-3xl" />
                <span className="text-xs sm:text-sm mt-1 md:hidden lg:block">Profile</span>
            </Link>
        </nav>
    );
}

export default Navbar;
