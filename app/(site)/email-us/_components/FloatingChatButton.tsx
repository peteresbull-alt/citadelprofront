"use client";
import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";

const FloatingChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-lg shadow-emerald-500/50 flex items-center justify-center transition-all duration-300 hover:scale-110 z-50"
        aria-label="Chat with us"
      >
        {isOpen ? (
          <X className="w-7 h-7" />
        ) : (
          <MessageCircle className="w-7 h-7" />
        )}
      </button>

      {/* Chat Widget (Simple placeholder) */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border-2 border-emerald-400 z-50 overflow-hidden">
          <div className="bg-emerald-500 text-white p-4">
            <h3 className="font-bold text-lg">Chat with us</h3>
            <p className="text-sm text-emerald-100">
              We&apos;re here to help 24/7
            </p>
          </div>
          <div className="p-4 h-64 bg-gray-50 dark:bg-gray-800">
            <p className="text-gray-600 dark:text-gray-400 text-center mt-20">
              Chat widget coming soon...
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChatButton;
