"use client";

import { useState } from "react";

export default function Security() {
  const [settings, setSettings] = useState({
    twoFactorAuth: true,
    loginAlerts: true,
  });

  const [credentials, setCredentials] = useState({
    passwordCurrent: "",
    passwordNew: "",
    passwordConfirm: "",
    email: "johndoe@example.com",
    mobile: "+91 9876543210",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleToggle = (field) => {
    setSettings({ ...settings, [field]: !settings[field] });
  };

  const handleSave = () => {
    console.log("Saved security settings:", { settings, credentials });
    alert("Security settings saved!");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-20 px-4">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-6 flex flex-col gap-6">
        <h2 className="text-2xl font-semibold text-gray-900">Security Settings</h2>
        <p className="text-gray-600 text-sm">
          Manage your account security, contact info, password, and login alerts.
        </p>

        {/* Change Email & Mobile */}
        <div className="flex flex-col gap-4 mt-4">
          <h3 className="font-medium text-gray-900">Email</h3>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-gray-900"
          />

          <h3 className="font-medium text-gray-900">Mobile Number</h3>
          <input
            type="tel"
            name="mobile"
            value={credentials.mobile}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-gray-900"
          />
        </div>

        {/* Password Change */}
        <div className="flex flex-col gap-4 mt-4">
          <h3 className="font-medium text-gray-900">Change Password</h3>
          <input
            type="password"
            name="passwordCurrent"
            placeholder="Current Password"
            value={credentials.passwordCurrent}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-gray-900"
          />
          <input
            type="password"
            name="passwordNew"
            placeholder="New Password"
            value={credentials.passwordNew}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-gray-900"
          />
          <input
            type="password"
            name="passwordConfirm"
            placeholder="Confirm New Password"
            value={credentials.passwordConfirm}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-gray-900"
          />
        </div>

        {/* Security Toggles */}
        <div className="flex flex-col gap-4 mt-6">
          <ToggleSwitch
            label="Two-Factor Authentication"
            description="Add an extra layer of security to your account."
            enabled={settings.twoFactorAuth}
            onToggle={() => handleToggle("twoFactorAuth")}
          />
          <ToggleSwitch
            label="Login Alerts"
            description="Receive notifications when your account is accessed."
            enabled={settings.loginAlerts}
            onToggle={() => handleToggle("loginAlerts")}
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
        className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
          enabled ? "bg-indigo-600 justify-end" : "bg-gray-300 justify-start"
        }`}
      >
        <div className="w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300" />
      </button>
    </div>
  );
}
