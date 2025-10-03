"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";

const mockChats = [
  { id: 1, name: "Alice", href: "/messages/alice", avatar: "A" },
  { id: 2, name: "Bob", href: "/messages/bob", avatar: "B" },
  { id: 3, name: "Charlie", href: "/messages/charlie", avatar: "C" },
];

export default function MessagesPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20 flex flex-col items-center">
      {/* Chat Links */}
      <div className="w-full max-w-5xl flex flex-col px-2 sm:px-0">
        <aside className="w-full bg-white rounded-xl shadow-md border border-gray-200 p-4 flex flex-col gap-2">
          {mockChats.map((chat) => (
            <Link key={chat.id} href={chat.href}>
              <div className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition cursor-pointer">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold">
                  {chat.avatar}
                </div>
                {/* Name */}
                <span className="font-medium">{chat.name}</span>
              </div>
            </Link>
          ))}
        </aside>
      </div>
    </div>
  );
}

