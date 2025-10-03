"use client";

import { useState } from "react";

export default function PostPage() {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) setFile(selectedFile);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Post submitted! 🚀 (Connect your API here)");
    setText("");
    setFile(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-6 pt-20">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Create a Post</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Text Input */}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            placeholder="What's on your mind?"
            className="w-full resize-none rounded-lg border border-gray-300 bg-white text-gray-800 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-sm"
          />

          {/* File Upload */}
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 border-gray-300 transition">
            <span className="text-gray-500 text-sm">
              {file ? file.name : "Click to upload image or video"}
            </span>
            <input
              type="file"
              accept="image/*,video/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          {/* Preview */}
          {file && (
            <div className="mt-2">
              {file.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="w-full rounded-lg max-h-64 object-cover"
                />
              ) : (
                <video
                  controls
                  className="w-full rounded-lg max-h-64 bg-black"
                  src={URL.createObjectURL(file)}
                />
              )}
            </div>
          )}

          {/* Post Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-full shadow-md transition text-sm flex items-center justify-center"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
