"use client";

import { useState } from "react";

export default function Notifications() {
  const [notifications, setNotifications] = useState({
    likes: true,
    comments: true,
    mentions: true,
    messages: true,
  });

  const handleToggle = (field) => {
    setNotifications({ ...notifications, [field]: !notifications[field] });
  };

  const handleSave = () => {
    console.log("Saved notification settings:", notifications);
    alert("Notification settings saved!");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-20 px-4">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-6 flex flex-col gap-6">
        <h2 className="text-2xl font-semibold text-gray-900">Notification Settings</h2>
        <p className="text-gray-600 text-sm">
          Customize how you receive notifications for various activities.
        </p>

        {/* Notification Toggles */}
        <div className="flex flex-col gap-4 mt-4">
          <ToggleSwitch
            label="Likes"
            description="Receive notifications when someone likes your posts."
            enabled={notifications.likes}
            onToggle={() => handleToggle("likes")}
          />
          <ToggleSwitch
            label="Comments"
            description="Receive notifications when someone comments on your posts."
            enabled={notifications.comments}
            onToggle={() => handleToggle("comments")}
          />
          <ToggleSwitch
            label="Mentions"
            description="Receive notifications when someone mentions you."
            enabled={notifications.mentions}
            onToggle={() => handleToggle("mentions")}
          />
          <ToggleSwitch
            label="Messages"
            description="Receive notifications when you get a new message."
            enabled={notifications.messages}
            onToggle={() => handleToggle("messages")}
          />
        </div>

        <button
          onClick={handleSave}
          className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition self-start"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

// Reusable ToggleSwitch Component
function ToggleSwitch({ label, description, enabled, onToggle }) {
  return (
    <div className="flex justify-between items-center p-4 border border-gray-200 rounded-lg">
      <div>
        <h3 className="font-medium text-gray-900">{label}</h3>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>
      <button
        onClick={onToggle}
        className={`w-15 sm:w-10 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
          enabled ? "bg-indigo-600 justify-end" : "bg-gray-300 justify-start"
        }`}
      >
        <div className="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300" />
      </button>
    </div>
  );
}
