"use client";

import { useRef, useEffect, useState } from "react";
import { Heart, MessageCircle } from "lucide-react";
import Link from "next/link";

// Dummy posts data
const postsData = [
  {
    id: 1,
    name: "Sunset View",
    type: "image",
    src: "https://picsum.photos/id/1015/300/300",
    href: "/posts/1",
    likes: 120,
    comments: 8,
  },
  {
    id: 2,
    name: "Ocean Waves",
    type: "video",
    src: "https://sample-videos.com/video123/mp4/240/big_buck_bunny_240p_1mb.mp4",
    poster: "https://picsum.photos/id/1016/300/300",
    href: "/posts/2",
    likes: 90,
    comments: 5,
  },
  {
    id: 3,
    name: "Mountain Peak",
    type: "image",
    src: "https://picsum.photos/id/1017/300/300",
    href: "/posts/3",
    likes: 50,
    comments: 2,
  },
  {
    id: 4,
    name: "City Lights",
    type: "video",
    src: "https://sample-videos.com/video123/mp4/240/big_buck_bunny_240p_1mb.mp4",
    poster: "https://picsum.photos/id/1018/300/300",
    href: "/posts/4",
    likes: 300,
    comments: 20,
  },
];

export default function ProfilePostsPage() {
  const videoRefs = useRef({});
  const [visibleVideos, setVisibleVideos] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.dataset.id;
          if (entry.isIntersecting) {
            setVisibleVideos((prev) => ({ ...prev, [id]: true }));
          }
        });
      },
      { threshold: 0.25 }
    );

    Object.values(videoRefs.current).forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => observer.disconnect();
  }, []);

  const handleMouseEnter = (id) => {
    const video = videoRefs.current[id];
    if (video && visibleVideos[id]) video.play().catch(() => {});
  };

  const handleMouseLeave = (id) => {
    const video = videoRefs.current[id];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4 lg:px-12 flex flex-col items-center">
      {/* Banner */}
      <div className="w-full bg-indigo-100 h-40 relative rounded-xl mb-6">
        <div className="absolute left-6 bottom-0 transform translate-y-1/2">
          <div className="w-28 h-28 rounded-full border-4 border-white bg-indigo-200 flex items-center justify-center text-indigo-700 text-3xl font-bold">
            U
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-md border border-gray-200 px-6 pt-6 pb-6 flex flex-col gap-2 mb-6">
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-900">User Name</h2>
          <span className="text-gray-500">@username</span>
        </div>
        <p className="text-gray-700 text-sm mt-2">
          This is a modern, professional user bio. Add something catchy here.
        </p>
      </div>

      {/* Posts Grid */}
      <div className="w-full max-w-5xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {postsData.map((post) => (
          <Link key={post.id} href={post.href}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition">
              <div
                className="relative w-full aspect-[4/5]"
                onMouseEnter={() => handleMouseEnter(post.id)}
                onMouseLeave={() => handleMouseLeave(post.id)}
              >
                {post.type === "image" ? (
                  <img
                    src={post.src}
                    alt={post.name}
                    className="w-full h-full object-cover"
                  />
                ) : visibleVideos[post.id] ? (
                  <video
                    ref={(el) => (videoRefs.current[post.id] = el)}
                    data-id={post.id}
                    src={post.src}
                    poster={post.poster || "https://via.placeholder.com/300"}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <img
                    src={post.poster}
                    alt={post.name}
                    className="w-full h-full object-cover"
                  />
                )}

                {post.type === "video" && (
                  <div className="absolute bottom-2 right-2 text-gray-600 text-sm">
                    ▶
                  </div>
                )}
              </div>

              {/* Post Info */}
              <div className="p-2 flex flex-col gap-1">
                <span className="text-gray-900 font-semibold text-base truncate">
                  {post.name}
                </span>
                <div className="flex items-center gap-4 text-gray-600 text-sm">
                  <div className="flex items-center gap-1">
                    <Heart size={14} /> {post.likes}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle size={14} /> {post.comments}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
