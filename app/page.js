"use client";

import { useState } from "react";
import { Heart, MessageCircle, Share2 } from "lucide-react";

export default function HomePage() {
  // Mock posts with like status and counts
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "Alice",
      username: "alice123",
      content: "Hello world! This is my first post 🌟",
      time: "2m ago",
      type: "text",
      liked: false,
      likes: 5,
      comments: 2,
      shares: 1,
    },
    {
      id: 2,
      user: "Bob",
      username: "bob_dev",
      content: "Check out this cool video!",
      time: "10m ago",
      type: "video",
      src: "/videos/sample1.mp4",
      liked: false,
      likes: 12,
      comments: 3,
      shares: 4,
    },
    {
      id: 3,
      user: "Charlie",
      username: "charlie99",
      content: "Beautiful scenery 😍",
      type: "image",
      src: "/images/sample.jpg",
      time: "1h ago",
      liked: false,
      likes: 8,
      comments: 1,
      shares: 2,
    },
  ]);

  // Toggle like status
  const handleLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
            ...post,
            liked: !post.liked,
            likes: post.liked ? post.likes - 1 : post.likes + 1,
          }
          : post
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 pt-20 flex flex-col items-center">
      <div className="w-full max-w-2xl flex flex-col gap-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col gap-3"
          >
            {/* User Info */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-medium text-sm">
                {post.user[0]}
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-gray-900">{post.user}</span>
                <span className="text-gray-500 text-xs">
                  @{post.username} · {post.time}
                </span>
              </div>
            </div>

            {/* Content */}
            <p className="text-gray-800 text-sm">{post.content}</p>

            {/* Media */}
            {post.type === "image" && (
              <img
                src={post.src}
                alt="Post media"
                className="w-full rounded-lg max-h-64 object-cover"
              />
            )}
            {post.type === "video" && (
              <video
                src={post.src}
                controls
                className="w-full rounded-lg max-h-64 bg-black"
              />
            )}

            {/* Action Buttons */}
            <div className="flex justify-between items-center mt-2 text-gray-500 text-sm">
              {/* Like */}
              <button
                className={`flex items-center gap-1 transition ${post.liked ? "text-red-500" : "text-gray-500 hover:text-red-500"
                  }`}
                onClick={() => handleLike(post.id)}
              >
                <Heart size={18} />
                <span>{post.likes} Like{post.likes !== 1 ? "s" : ""}</span>
              </button>
              {/* Comment */}
              <button className="flex items-center gap-1 hover:text-indigo-600 transition">
                <MessageCircle size={18} />
                <span>{post.comments} Comment{post.comments !== 1 ? "s" : ""}</span>
              </button>

              {/* Share */}
              <button className="flex items-center gap-1 hover:text-indigo-600 transition">
                <Share2 size={18} />
                <span>{post.shares} Share{post.shares !== 1 ? "s" : ""}</span>
              </button>


            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
