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

export default function PostsPage() {
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
    <div className="min-h-screen bg-gray-50 pt-20 px-4 lg:px-12">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {postsData.map((post) => (
          <Link key={post.id} href={post.href}>
            <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition">
              {/* Thumbnail */}
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

                {/* Video Play Icon */}
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
