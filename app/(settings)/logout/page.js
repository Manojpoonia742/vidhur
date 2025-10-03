"use client";

import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  const handleLogout = () => {
    // Here you can clear auth tokens, cookies, or call your logout API
    console.log("User logged out");
    alert("You have been logged out!");
    router.push("/login"); // redirect to login page
  };

  const handleCancel = () => {
    router.push("/settings"); // redirect back to settings/dashboard
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 flex flex-col gap-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-900">Log Out</h2>
        <p className="text-gray-600 text-sm">
          Are you sure you want to log out of your account?
        </p>

        <div className="flex gap-4 justify-center mt-4">
          <button
            onClick={handleCancel}
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
