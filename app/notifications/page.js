"use client";

import { useState, useEffect } from "react";

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);

   const token = localStorage.getItem("token");
  if (!token) {
    console.error("No auth token found!");
    return;
  }

    // Fetch notifications
    const fetchNotifications = async () => {
        setLoading(true);
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/notifications`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await res.json();
            if (res.ok) setNotifications(data);
            else console.error(data.error);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    // Mark all as read
    const markAllRead = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/notifications/mark-read`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            if (res.ok) {
                // update local state
                setNotifications((prev) =>
                    prev.map((n) => ({ ...n, read: true }))
                );
            } else {
                console.error(data.error);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen p-4 bg-gray-50">
            <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-semibold">Notifications</h1>
                    <button
                        className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                        onClick={markAllRead}
                    >
                        Mark All as Read
                    </button>
                </div>

                {loading ? (
                    <p>Loading...</p>
                ) : notifications.length === 0 ? (
                    <p className="text-gray-500">No notifications yet.</p>
                ) : (
                    <ul className="flex flex-col gap-3">
                        {notifications.map((n) => (
                            <li
                                key={n._id}
                                className={`p-3 rounded-lg ${n.read ? "bg-gray-100" : "bg-indigo-50"
                                    }`}
                            >
                                <p className="text-gray-800">{n.message}</p>
                                <span className="text-xs text-gray-500">
                                    {new Date(n.createdAt).toLocaleString()}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
