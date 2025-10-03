"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Home, Search, PlusCircle, MessageCircle, VideoIcon, Bell } from "lucide-react";
import { Pacifico } from "next/font/google";
// import { io } from "socket.io-client"; // Uncomment if using socket.io

const pacifico = Pacifico({ subsets: ["latin"], weight: "400" });

export default function Navbar({ unreadMessages = 0 }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsCount, setNotificationsCount] = useState(0);
  const profileRef = useRef(null);

  // Close profile dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch notifications count
  useEffect(() => {
    async function fetchNotifications() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch("/api/notifications/count", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setNotificationsCount(data.count || 0);
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      }
    }

    fetchNotifications();
  }, []);

  // Optional: socket for real-time notifications
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) return;
  //   const socket = io("/", { auth: { token } });
  //   socket.on("new-notification", (data) => {
  //     setNotificationsCount((prev) => prev + 1);
  //   });
  //   return () => socket.disconnect();
  // }, []);

  const navIconsDesktop = [
    { href: "/", icon: Home },
    { href: "/search", icon: Search },
    { href: "/posts", icon: PlusCircle },
    { href: "/videos", icon: VideoIcon },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:flex fixed top-0 left-0 w-full bg-white shadow-md z-50 px-6 lg:px-12 h-16 items-center justify-between">
        {/* Left: Logo */}
        <Link href="/">
          <span className={`text-2xl ${pacifico.className} text-indigo-700 font-bold`}>Vidhur</span>
        </Link>

        {/* Center: Navigation Icons */}
        <div className="flex items-center gap-8">
          {navIconsDesktop.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <Icon size={20} className="text-gray-700 hover:text-indigo-600 transition" />
              </Link>
            );
          })}
        </div>

        {/* Right: Notifications, Messages, Profile */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative">
            <Bell size={24} className="text-gray-700 cursor-pointer" />
            {notificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                {notificationsCount}
              </span>
            )}
          </div>

          {/* Messages */}
          <Link href="/messages" className="relative">
            <MessageCircle size={20} className="text-gray-700 hover:text-indigo-600 transition" />
            {unreadMessages > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-semibold rounded-full px-1.5 py-0.5">
                {unreadMessages}
              </span>
            )}
          </Link>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 text-lg font-bold hover:ring-2 hover:ring-indigo-300 transition"
            >
              U
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border text-gray-600 border-gray-200 rounded-lg shadow-lg flex flex-col py-2">
                <Link href="/account">
                  <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</div>
                </Link>
                <Link href="/settings">
                  <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</div>
                </Link>
                <Link href="/logout">
                  <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600">Logout</div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-md z-50 px-4 py-2 flex items-center justify-evenly">
        <Link href="/"><Home size={30} className="text-gray-700 hover:text-indigo-600 transition" /></Link>
        <Link href="/search"><Search size={30} className="text-gray-700 hover:text-indigo-600 transition" /></Link>
        <Link href="/messages" className="relative">
          <MessageCircle size={30} className="text-gray-700 hover:text-indigo-600 transition" />
          {unreadMessages > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-semibold rounded-full px-1.5 py-0.5">
              {unreadMessages}
            </span>
          )}
        </Link>

        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 text-lg font-bold hover:ring-2 hover:ring-indigo-300 transition"
          >
            U
          </button>

          {profileOpen && (
            <div className="absolute bottom-14 right-0 w-48 bg-white border text-gray-600 border-gray-200 rounded-lg shadow-lg flex flex-col py-2">
              <Link href="/account"><div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</div></Link>
              <Link href="/videos"><div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Videos</div></Link>
              <Link href="/upload"><div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Upload</div></Link>
              <Link href="/settings"><div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Settings</div></Link>
              <Link href="/logout"><div className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600">Logout</div></Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
