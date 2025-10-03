"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Heart, MessageCircle, Search } from "lucide-react";

// Dummy posts
const initialPosts = [
  {
    id: 1,
    type: "image",
    src: "https://picsum.photos/id/1015/400/400",
    href: "/post/1",
    likes: 120,
    comments: 8,
  },
  {
    id: 2,
    type: "video",
    src: "https://sample-videos.com/video123/mp4/240/big_buck_bunny_240p_1mb.mp4",
    poster: "https://picsum.photos/id/1016/400/400",
    href: "/post/2",
    likes: 90,
    comments: 5,
  },
  {
    id: 3,
    type: "image",
    src: "https://picsum.photos/id/1017/400/400",
    href: "/post/3",
    likes: 50,
    comments: 2,
  },
  {
    id: 4,
    type: "video",
    src: "https://sample-videos.com/video123/mp4/240/big_buck_bunny_240p_1mb.mp4",
    poster: "https://picsum.photos/id/1018/400/400",
    href: "/post/4",
    likes: 300,
    comments: 20,
  },
  {
    id: 5,
    type: "image",
    src: "https://picsum.photos/id/1019/400/400",
    href: "/post/5",
    likes: 70,
    comments: 4,
  },
  {
    id: 6,
    type: "image",
    src: "https://picsum.photos/id/1020/400/400",
    href: "/post/6",
    likes: 15,
    comments: 1,
  },
];

const mockProfiles = [
  {
    id: 1,
    name: "Alice Johnson",
    username: "alice_j",
    avatar: "https://i.pravatar.cc/150?img=1",
    href: "/profile/alice",
  },
  {
    id: 2,
    name: "Bob Smith",
    username: "bob_smith",
    avatar: "https://i.pravatar.cc/150?img=2",
    href: "/profile/bob",
  },
  {
    id: 3,
    name: "Charlie Lee",
    username: "charlie_lee",
    avatar: "https://i.pravatar.cc/150?img=3",
    href: "/profile/charlie",
  },
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState(initialPosts);
  const [profiles, setProfiles] = useState(mockProfiles);

  const videoRefs = useRef({});

  const handleMouseEnter = (id) => {
    const video = videoRefs.current[id];
    if (video) {
      video
        .play()
        .catch((err) => console.log("Video play blocked:", err));
    }
  };

  const handleMouseLeave = (id) => {
    const video = videoRefs.current[id];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  const filteredPosts = posts.filter((post) =>
    post.id.toString().includes(query)
  );
  const filteredProfiles = profiles.filter(
    (profile) =>
      profile.name.toLowerCase().includes(query.toLowerCase()) ||
      profile.username.toLowerCase().includes(query.toLowerCase())
  );

  // Infinite scroll simulation
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        const morePosts = posts.map((p) => ({
          ...p,
          id: p.id + posts.length,
        }));
        setPosts((prev) => [...prev, ...morePosts]);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [posts]);

  return (
    <div className="min-h-screen bg-gray-50 pt-16 px-0">
      {/* Sticky Search Bar */}
      <div className="sticky top-16 z-10 bg-gray-50 max-w-3xl mx-auto mb-6 px-4 py-2 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search for posts or profiles"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-base text-gray-900 placeholder-gray-400 shadow-sm"
          />
        </div>
      </div>

      {/* Profiles Results */}
      {query && filteredProfiles.length > 0 && (
        <div className="max-w-3xl mx-auto mb-6 px-4">
          <h2 className="text-gray-700 font-semibold mb-2">Profiles</h2>
          <div className="flex flex-col gap-2">
            {filteredProfiles.map((profile) => (
              <Link key={profile.id} href={profile.href}>
                <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded transition cursor-pointer">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <span className="text-gray-900 font-medium">
                      {profile.name}
                    </span>
                    <span className="text-gray-500 text-sm">
                      @{profile.username}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Posts Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-0">
        {(query ? filteredPosts : posts).map((post) => (
          <Link key={post.id} href={post.href}>
            <div
              className="relative w-full aspect-square cursor-pointer group"
              onMouseEnter={() => handleMouseEnter(post.id)}
              onMouseLeave={() => handleMouseLeave(post.id)}
            >
              {post.type === "image" ? (
                <img
                  src={post.src}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  ref={(el) => (videoRefs.current[post.id] = el)}
                  src={post.src}
                  poster={post.poster || "https://via.placeholder.com/400"}
                  className="w-full h-full object-cover"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              )}

              {/* Video Play Icon (Bottom-Right) */}
              {post.type === "video" && (
                <div className="absolute bottom-2 right-2 text-gray-600 rounded-full p-1">
                  ▶
                </div>
              )}

              {/* Hover Overlay for Likes/Comments */}
              <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-4 text-white text-sm font-semibold">
                <div className="flex items-center gap-1">
                  <Heart size={16} /> {post.likes}
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle size={16} /> {post.comments}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* No Results */}
      {query &&
        filteredProfiles.length === 0 &&
        filteredPosts.length === 0 && (
          <div className="text-center text-gray-500 mt-8 text-sm">
            No results found
          </div>
        )}
    </div>
  );
}
