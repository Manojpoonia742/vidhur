"use client";

import { useState } from "react";

export default function Account() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    username: "johndoe",
    bio: "This is a short bio about you. You can write anything interesting here!",
    avatar: "https://i.pravatar.cc/150?img=12", // demo avatar
    banner: "https://images.unsplash.com/photo-1604079629675-0011b1adf73f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fGJhbm5lcnx8fHx8fDE2OTY5Mjk4NzU&ixlib=rb-4.0.3&q=80&w=1080", // demo banner
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, banner: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    console.log("Saved profile:", profile);
    alert("Profile saved!");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-20 px-4">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Banner */}
        <div className="relative h-40 w-full bg-gray-200">
          {profile.banner && (
            <img
              src={profile.banner}
              alt="Banner"
              className="w-full h-full object-cover"
            />
          )}
          <label className="absolute bottom-2 right-2 bg-white px-3 py-1 rounded-lg text-sm cursor-pointer shadow-md hover:bg-gray-100 transition">
            Change Banner
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleBannerChange}
            />
          </label>
        </div>

        {/* Content */}
        <div className="px-6 pt-24 pb-6 flex flex-col gap-6">
          {/* Avatar */}
          <div className="flex flex-col items-center z-40 -mt-32">
            <div className="w-36 h-36 rounded-full border-4 border-white bg-gray-200 overflow-hidden flex items-center justify-center text-gray-500 text-5xl font-bold shadow-lg">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                profile.name.charAt(0).toUpperCase()
              )}
            </div>
            <label className="mt-3 cursor-pointer text-indigo-600 hover:underline">
              Change Avatar
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
          </div>

          {/* Profile Form */}
          <div className="flex flex-col gap-4 text-gray-800">
            <div>
              <label className="block font-medium mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-gray-900"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={profile.username}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-gray-900"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Bio</label>
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-gray-900"
              ></textarea>
            </div>

            <button
              onClick={handleSave}
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
