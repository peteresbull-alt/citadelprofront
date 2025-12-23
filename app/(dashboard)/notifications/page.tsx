"use client";

import { useState, useEffect } from "react";
import DashboardNavbar from "@/components/main/DashboardNavbar";
import { BACKEND_URL } from "@/lib/constants";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PulseLoader } from "react-spinners";

interface Notification {
  id: number;
  type: "trade" | "deposit" | "withdrawal" | "alert" | "system" | "news";
  title: string;
  message: string;
  full_details: string;
  created_at: string;
  read: boolean;
  // priority: "low" | "medium" | "high";
  metadata?: {
    amount?: string;
    stock?: string;
    status?: string;
  };
}

export default function NotificationsPage() {
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [markingAllRead, setMarkingAllRead] = useState(false);
  const router = useRouter();

  const filterOptions = [
    { value: "all", label: "All" },
    { value: "unread", label: "Unread" },
    { value: "trade", label: "Trades" },
    { value: "deposit", label: "Deposits" },
    { value: "withdrawal", label: "Withdrawals" },
    { value: "alert", label: "Alerts" },
    { value: "system", label: "System" },
    { value: "news", label: "News" },
  ];

  // Fetch notifications from backend
  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("Please login to view notifications");
        router.push("/login");
        return;
      }

      let url = `${BACKEND_URL}/notifications/`;

      // Add filters to URL if not "all" or "unread"
      if (filter !== "all" && filter !== "unread") {
        url += `?type=${filter}`;
      }

      const response = await fetch(url, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("Session expired. Please login again.");
          localStorage.removeItem("authToken");
          router.push("/login");
          return;
        }
        throw new Error("Failed to fetch notifications");
      }

      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      toast.error("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [filter]);

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "all") return true;
    if (filter === "unread") return !notification.read;
    return notification.type === filter;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return "Yesterday";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "trade":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
        );
      case "deposit":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
            />
          </svg>
        );
      case "withdrawal":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        );
      case "alert":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        );
      case "system":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        );
      case "news":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/10 dark:bg-red-500/20 text-red-500";
      case "medium":
        return "bg-yellow-500/10 dark:bg-yellow-500/20 text-yellow-500";
      case "low":
        return "bg-blue-500/10 dark:bg-blue-500/20 text-blue-500";
      default:
        return "bg-gray-500/10 dark:bg-gray-500/20 text-gray-500";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "trade":
        return "bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-500";
      case "deposit":
        return "bg-blue-500/10 dark:bg-blue-500/20 text-blue-500";
      case "withdrawal":
        return "bg-green-500/10 dark:bg-green-500/20 text-green-500";
      case "alert":
        return "bg-purple-500/10 dark:bg-purple-500/20 text-purple-500";
      case "system":
        return "bg-gray-500/10 dark:bg-gray-500/20 text-gray-500";
      case "news":
        return "bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-500";
      default:
        return "bg-gray-500/10 dark:bg-gray-500/20 text-gray-500";
    }
  };

  const markAsRead = async (id: number) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      const response = await fetch(
        `${BACKEND_URL}/notifications/${id}/mark-read/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (response.ok) {
        setNotifications(
          notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
        );
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      setMarkingAllRead(true);
      const token = localStorage.getItem("authToken");
      if (!token) return;

      const response = await fetch(
        `${BACKEND_URL}/notifications/mark-all-read/`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      if (response.ok) {
        setNotifications(notifications.map((n) => ({ ...n, read: true })));
        toast.success("All notifications marked as read");
      } else {
        toast.error("Failed to mark all as read");
      }
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      toast.error("Failed to mark all as read");
    } finally {
      setMarkingAllRead(false);
    }
  };

  const closeModal = () => {
    setSelectedNotification(null);
  };

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
    if (!notification.read) {
      markAsRead(notification.id);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1f2e] dark:bg-gray-50 transition-colors pt-20">
      <DashboardNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white dark:text-gray-900 mb-2">
                Notifications
              </h1>
              <p className="text-gray-400 dark:text-gray-600">
                Stay updated with your account activities and market alerts
              </p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                disabled={markingAllRead}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {markingAllRead ? (
                  <>
                    <PulseLoader color="#fff" size={8} />
                    <span>Marking...</span>
                  </>
                ) : (
                  <>Mark all as read ({unreadCount})</>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === option.value
                    ? "bg-green-500 text-white"
                    : "bg-[#151922] dark:bg-gray-200 text-gray-400 dark:text-gray-600 hover:bg-gray-700 dark:hover:bg-gray-300"
                }`}
              >
                {option.label}
                {option.value === "unread" && unreadCount > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-white/20 dark:bg-black/20 rounded-full text-xs">
                    {unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <PulseLoader color="#10b981" size={15} />
          </div>
        ) : (
          <>
            {/* Notifications List */}
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto mb-4 bg-gray-700 dark:bg-gray-300 rounded-full flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-gray-400 dark:text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </div>
                <p className="text-gray-400 dark:text-gray-600 text-lg">
                  No notifications found
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification)}
                    className={`bg-[#151922] dark:bg-white rounded-lg p-5 border transition-all duration-300 cursor-pointer ${
                      notification.read
                        ? "border-gray-700 dark:border-gray-300 hover:border-gray-600 dark:hover:border-gray-400"
                        : "border-green-500 dark:border-green-500 hover:border-green-600 dark:hover:border-green-600"
                    }`}
                  >
                    <div className="flex gap-4">
                      {/* Icon */}
                      <div
                        className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${getTypeColor(
                          notification.type
                        )}`}
                      >
                        {getNotificationIcon(notification.type)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <h3
                            className={`text-lg font-semibold ${
                              notification.read
                                ? "text-gray-300 dark:text-gray-700"
                                : "text-white dark:text-gray-900"
                            }`}
                          >
                            {notification.title}
                          </h3>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            {!notification.read && (
                              <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
                            )}
                            {/* <span
                              className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(
                                notification.priority
                              )}`}
                            >
                              {notification.priority}
                            </span> */}
                          </div>
                        </div>

                        <p className="text-gray-400 dark:text-gray-600 text-sm mb-3 line-clamp-2">
                          {notification.message}
                        </p>

                        {/* Metadata */}
                        {notification.metadata && (
                          <div className="flex flex-wrap gap-3 mb-3 text-xs">
                            {notification.metadata.stock && (
                              <span className="px-2 py-1 bg-gray-700 dark:bg-gray-200 text-gray-300 dark:text-gray-700 rounded">
                                {notification.metadata.stock}
                              </span>
                            )}
                            {notification.metadata.amount && (
                              <span className="px-2 py-1 bg-gray-700 dark:bg-gray-200 text-gray-300 dark:text-gray-700 rounded">
                                {notification.metadata.amount}
                              </span>
                            )}
                            {notification.metadata.status && (
                              <span className="px-2 py-1 bg-gray-700 dark:bg-gray-200 text-gray-300 dark:text-gray-700 rounded">
                                {notification.metadata.status}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Footer */}
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500 dark:text-gray-500">
                            {formatDate(notification.created_at)}
                          </span>
                          <span className="text-xs text-green-500 hover:text-green-600 font-medium">
                            View Details →
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal */}
      {selectedNotification && (
        <div
          className="fixed inset-0 bg-black/70 dark:bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={closeModal}
        >
          <div
            className="bg-[#151922] dark:bg-white rounded-lg max-w-3xl w-full h-[95vh] flex flex-col animate-fadeIn overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button - Fixed at top */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-12 h-12 bg-black/80 dark:bg-white/90 hover:bg-black dark:hover:bg-white text-white dark:text-gray-900 rounded-full flex items-center justify-center transition-all shadow-lg z-10"
              aria-label="Close modal"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Scrollable Content */}
            <div className="overflow-y-auto flex-1 p-6 sm:p-8">
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center ${getTypeColor(
                      selectedNotification.type
                    )}`}
                  >
                    {getNotificationIcon(selectedNotification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h2 className="text-2xl sm:text-3xl font-bold text-white dark:text-gray-900 pr-12">
                        {selectedNotification.title}
                      </h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-medium ${getTypeColor(
                          selectedNotification.type
                        )}`}
                      >
                        {selectedNotification.type.toUpperCase()}
                      </span>
                      {/* <span
                        className={`text-xs px-3 py-1 rounded-full font-medium ${getPriorityColor(
                          selectedNotification.priority
                        )}`}
                      >
                        {selectedNotification.priority.toUpperCase()} PRIORITY
                      </span> */}
                    </div>
                  </div>
                </div>
              </div>

              {/* Timestamp */}
              <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-600 mb-6 pb-6 border-b border-gray-700 dark:border-gray-300">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>
                  {new Date(selectedNotification.created_at).toLocaleString(
                    "en-US",
                    {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </span>
              </div>

              {/* Metadata Cards */}
              {selectedNotification.metadata && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                  {selectedNotification.metadata.stock && (
                    <div className="bg-gray-700/30 dark:bg-gray-200 p-4 rounded-lg">
                      <div className="text-xs text-gray-400 dark:text-gray-600 mb-1">
                        Stock
                      </div>
                      <div className="text-lg font-bold text-white dark:text-gray-900">
                        {selectedNotification.metadata.stock}
                      </div>
                    </div>
                  )}
                  {selectedNotification.metadata.amount && (
                    <div className="bg-gray-700/30 dark:bg-gray-200 p-4 rounded-lg">
                      <div className="text-xs text-gray-400 dark:text-gray-600 mb-1">
                        Amount
                      </div>
                      <div className="text-lg font-bold text-white dark:text-gray-900">
                        {selectedNotification.metadata.amount}
                      </div>
                    </div>
                  )}
                  {selectedNotification.metadata.status && (
                    <div className="bg-gray-700/30 dark:bg-gray-200 p-4 rounded-lg">
                      <div className="text-xs text-gray-400 dark:text-gray-600 mb-1">
                        Status
                      </div>
                      <div className="text-lg font-bold text-white dark:text-gray-900">
                        {selectedNotification.metadata.status}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Full Details */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white dark:text-gray-900 mb-3">
                  Details
                </h3>
                <div className="text-gray-300 dark:text-gray-700 leading-relaxed space-y-4">
                  {selectedNotification.full_details
                    .split(". ")
                    .map((sentence, index) => (
                      <p key={index}>{sentence.trim()}.</p>
                    ))}
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={closeModal}
                className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
