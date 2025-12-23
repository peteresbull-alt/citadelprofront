"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import DashboardNavbar from "@/components/main/DashboardNavbar";
import { BACKEND_URL } from "@/lib/constants";
import { PulseLoader } from "react-spinners";

interface NewsItem {
  id: number;
  title: string;
  summary: string;
  content: string;
  category: string;
  source: string;
  author: string;
  published_at: string;
  image_url: string | null;
  tags: string[];
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export default function NewsPage() {
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Stocks",
    "Technology",
    "Economy",
    "Cryptocurrency",
    "Commodities",
    "Forex",
  ];

  // Fetch news from API
  useEffect(() => {
    fetchNews();
  }, [selectedCategory, searchQuery]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);

      // Build query params
      const params = new URLSearchParams();
      if (selectedCategory !== "All") {
        params.append("category", selectedCategory);
      }
      if (searchQuery.trim()) {
        params.append("search", searchQuery.trim());
      }

      const url = `${BACKEND_URL}/news/?${params.toString()}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch news");
      }

      const data = await response.json();
      setNewsData(data);
    } catch (err) {
      setError("Failed to load news. Please try again later.");
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const closeModal = () => {
    setSelectedNews(null);
  };

  // Default placeholder image
  const getImageUrl = (imageUrl: string | null) => {
    return (
      imageUrl ||
      "https://via.placeholder.com/400x200/1a1f2e/ffffff?text=News+Image"
    );
  };

  return (
    <div className="min-h-screen bg-[#1a1f2e] dark:bg-gray-50 transition-colors pt-20">
      <DashboardNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white dark:text-gray-900 mb-2">
            Market News
          </h1>
          <p className="text-gray-400 dark:text-gray-600">
            Stay updated with the latest financial news and market insights
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 bg-[#151922] dark:bg-white text-white dark:text-gray-900 border-2 border-gray-700 dark:border-gray-300 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
            />
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-green-500 text-white"
                    : "bg-[#151922] dark:bg-gray-200 text-gray-400 dark:text-gray-600 hover:bg-gray-700 dark:hover:bg-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <PulseLoader color="#10b981" size={15} />
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">{error}</p>
            <button
              onClick={fetchNews}
              className="mt-4 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* No Results */}
        {!loading && !error && newsData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 dark:text-gray-600 text-lg">
              No news found matching your criteria
            </p>
          </div>
        )}

        {/* News Grid */}
        {!loading && !error && newsData.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsData.map((news) => (
              <div
                key={news.id}
                onClick={() => setSelectedNews(news)}
                className="bg-[#151922] dark:bg-white rounded-lg overflow-hidden border border-gray-700 dark:border-gray-300 hover:border-green-500 dark:hover:border-green-500 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-green-500/20"
              >
                {/* Image */}
                <div className="relative h-48 bg-gray-800 dark:bg-gray-200">
                  <Image
                    src={getImageUrl(news.image_url)}
                    alt={news.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                      {news.category}
                    </span>
                  </div>
                  {news.is_featured && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-full">
                        Featured
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-white dark:text-gray-900 mb-2 line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="text-gray-400 dark:text-gray-600 text-sm mb-4 line-clamp-3">
                    {news.summary}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
                    <span>{news.source}</span>
                    <span>{formatDate(news.published_at)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedNews && (
        <div
          className="fixed inset-0 bg-black/70 dark:bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={closeModal}
        >
          <div
            className="bg-[#151922] dark:bg-white rounded-lg max-w-4xl w-full h-[95vh] flex flex-col animate-fadeIn overflow-hidden"
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
            <div className="overflow-y-auto flex-1">
              {/* Modal Header - Banner Image */}
              <div className="relative h-64 sm:h-80 bg-gray-800 dark:bg-gray-200">
                <Image
                  src={getImageUrl(selectedNews.image_url)}
                  alt={selectedNews.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <span className="px-3 py-1 bg-green-500 text-white text-sm font-semibold rounded-full">
                    {selectedNews.category}
                  </span>
                  {selectedNews.is_featured && (
                    <span className="px-3 py-1 bg-yellow-500 text-white text-sm font-semibold rounded-full">
                      Featured
                    </span>
                  )}
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-white dark:text-gray-900 mb-4">
                  {selectedNews.title}
                </h2>

                {/* Meta Information */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-400 dark:text-gray-600 mb-6 pb-6 border-b border-gray-700 dark:border-gray-300">
                  <div className="flex items-center gap-2">
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span>{selectedNews.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
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
                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                      />
                    </svg>
                    <span>{selectedNews.source}</span>
                  </div>
                  <div className="flex items-center gap-2">
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
                    <span>{formatDate(selectedNews.published_at)}</span>
                  </div>
                </div>

                {/* Article Content */}
                <div className="text-gray-300 dark:text-gray-700 leading-relaxed mb-6 space-y-4">
                  {selectedNews.content.split("\n").map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                {/* Tags */}
                {selectedNews.tags && selectedNews.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedNews.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-700 dark:bg-gray-200 text-gray-300 dark:text-gray-700 text-sm rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>n 
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
