"use client";

import Link from "next/link";

export default function Settings() {
  const settingsOptions = [
    {
      title: "Account",
      description: "Edit your profile details and personal information.",
      link: "/account",
    },
    {
      title: "Security",
      description: "Change password, enable 2FA, and manage login alerts.",
      link: "/security",
    },
    {
      title: "Notifications",
      description: "Manage your notification preferences.",
      link: "/notifications",
    },
    {
      title: "Language",
      description: "Change your preferred language.",
      link: "#", // placeholder
    },
    {
      title: "Privacy",
      description: "Manage who can see your posts and profile.",
      link: "#", // placeholder
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-20 px-4">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-6 flex flex-col gap-6">
        <h2 className="text-2xl font-semibold text-gray-900">Settings</h2>
        <p className="text-gray-600 text-sm">
          Manage all your account settings from one place.
        </p>

        <div className="flex flex-col gap-4 mt-6">
          {settingsOptions.map((option) => (
            <Link key={option.title} href={option.link}>
              <div className="flex justify-between items-center p-5 border border-gray-200 rounded-lg hover:shadow-md transition cursor-pointer">
                <div>
                  <h3 className="font-medium text-gray-900">{option.title}</h3>
                  <p className="text-gray-500 text-sm mt-1">{option.description}</p>
                </div>
                <span className="text-gray-400 text-xl">&rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
