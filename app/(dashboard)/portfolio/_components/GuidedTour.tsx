"use client";
import React, { useState, useEffect, useRef } from "react";
import { X, ArrowRight, ArrowLeft } from "lucide-react";

interface TourStep {
  target: string; // CSS selector for the element to highlight
  title: string;
  description: string;
  position: "top" | "bottom" | "left" | "right"; // Where to show the tooltip relative to element
}

const tourSteps: TourStep[] = [
  {
    target: "#hamburgerMenu",
    title: "Navigation Menu",
    description:
      "Access all features and pages from here. Click the menu icon to open the sidebar navigation.",
    position: "right",
  },
  {
    target: "#themeForToggle",
    title: "Theme Toggle",
    description:
      "Switch between light and dark mode for your visual comfort. Click here to change the theme.",
    position: "bottom",
  },
  {
    target: "#notificationToggle",
    title: "Notifications",
    description:
      "Stay updated with all your account activities. Click the bell icon to view all notifications.",
    position: "bottom",
  },
  {
    target: "#profileForToggle",
    title: "Your Profile",
    description:
      "Access your profile settings, change password, and logout. Click here to see more options.",
    position: "bottom",
  },
  {
    target: "#balanceOverviewToggle",
    title: "Balance Overview",
    description:
      "View your current account balance and registration date. This card shows your total available funds.",
    position: "bottom",
  },
];

interface GuidedTourProps {
  onComplete?: () => void;
}

export default function GuidedTour({ onComplete }: GuidedTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });
  const [highlightPosition, setHighlightPosition] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user has seen the tour
    const hasSeenTour = localStorage.getItem("hasSeenDashboardTour");

    if (!hasSeenTour) {
      // Start tour after a delay
      setTimeout(() => {
        setIsActive(true);
      }, 1500);
    }
  }, []);

  useEffect(() => {
    if (!isActive) return;

    const currentStepData = tourSteps[currentStep];
    const targetElement = document.querySelector(
      currentStepData.target
    ) as HTMLElement;

    if (!targetElement) {
      console.warn(`Element not found: ${currentStepData.target}`);
      // Skip to next step if element not found
      if (currentStep < tourSteps.length - 1) {
        setTimeout(() => setCurrentStep(currentStep + 1), 100);
      }
      return;
    }

    // Scroll element into view smoothly
    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });

    // Get element position
    const rect = targetElement.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft =
      window.pageXOffset || document.documentElement.scrollLeft;

    setHighlightPosition({
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft,
      width: rect.width,
      height: rect.height,
    });

    // Calculate tooltip position after a small delay to ensure tooltip is rendered
    setTimeout(() => {
      if (!tooltipRef.current) return;

      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const tooltipWidth = tooltipRect.width;
      const tooltipHeight = tooltipRect.height;
      const padding = 20; // Space between element and tooltip
      const viewportPadding = 16; // Minimum space from viewport edges

      let top = 0;
      let left = 0;

      // Get viewport dimensions
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Calculate initial position based on preferred position
      switch (currentStepData.position) {
        case "top":
          top = rect.top + scrollTop - tooltipHeight - padding;
          left = rect.left + scrollLeft + rect.width / 2 - tooltipWidth / 2;
          break;
        case "bottom":
          top = rect.top + scrollTop + rect.height + padding;
          left = rect.left + scrollLeft + rect.width / 2 - tooltipWidth / 2;
          break;
        case "left":
          top = rect.top + scrollTop + rect.height / 2 - tooltipHeight / 2;
          left = rect.left + scrollLeft - tooltipWidth - padding;
          break;
        case "right":
          top = rect.top + scrollTop + rect.height / 2 - tooltipHeight / 2;
          left = rect.left + scrollLeft + rect.width + padding;
          break;
      }

      // Aggressive viewport boundary checks to keep tooltip fully visible
      // Left boundary
      if (left < viewportPadding) {
        left = viewportPadding;
      }

      // Right boundary - ensure entire tooltip including buttons are visible
      if (left + tooltipWidth > viewportWidth - viewportPadding) {
        left = viewportWidth - tooltipWidth - viewportPadding;
      }

      // Top boundary
      if (top < scrollTop + viewportPadding) {
        // If tooltip would go above viewport, position it below the element instead
        top = rect.top + scrollTop + rect.height + padding;
      }

      // Bottom boundary - THIS IS CRITICAL for button visibility
      const bottomEdge = top + tooltipHeight;
      const viewportBottom = scrollTop + viewportHeight;

      if (bottomEdge > viewportBottom - viewportPadding) {
        // Tooltip goes below viewport, reposition above the element
        top = rect.top + scrollTop - tooltipHeight - padding;

        // If still doesn't fit above, center it in viewport
        if (top < scrollTop + viewportPadding) {
          top = scrollTop + (viewportHeight - tooltipHeight) / 2;
          // Make sure it's not negative
          if (top < scrollTop + viewportPadding) {
            top = scrollTop + viewportPadding;
          }
        }
      }

      // Final safety check - ensure tooltip is within viewport
      top = Math.max(
        scrollTop + viewportPadding,
        Math.min(
          top,
          scrollTop + viewportHeight - tooltipHeight - viewportPadding
        )
      );
      left = Math.max(
        viewportPadding,
        Math.min(left, viewportWidth - tooltipWidth - viewportPadding)
      );

      setTooltipPosition({ top, left });
    }, 100);
  }, [currentStep, isActive]);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    localStorage.setItem("hasSeenDashboardTour", "true");
    setIsActive(false);
    if (onComplete) onComplete();
  };

  const handleComplete = () => {
    localStorage.setItem("hasSeenDashboardTour", "true");
    setIsActive(false);
    if (onComplete) onComplete();
  };

  if (!isActive || !highlightPosition) return null;

  const currentStepData = tourSteps[currentStep];

  return (
    <>
      {/* Light overlay with cutout */}
      <div className="fixed inset-0 z-[100] pointer-events-none">
        {/* Light backdrop - user can still see the interface */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />

        {/* Highlighted element area (clear and bright) */}
        <div
          className="absolute transition-all duration-500 ease-out"
          style={{
            top: `${highlightPosition.top - 8}px`,
            left: `${highlightPosition.left - 8}px`,
            width: `${highlightPosition.width + 16}px`,
            height: `${highlightPosition.height + 16}px`,
            boxShadow:
              "0 0 0 9999px rgba(0, 0, 0, 0.3), 0 0 0 4px rgba(34, 197, 94, 0.8), 0 0 40px rgba(34, 197, 94, 0.6)",
            borderRadius: "8px",
            pointerEvents: "none",
          }}
        />

        {/* Pulsing ring around element */}
        <div
          className="absolute transition-all duration-500 ease-out animate-pulse"
          style={{
            top: `${highlightPosition.top - 8}px`,
            left: `${highlightPosition.left - 8}px`,
            width: `${highlightPosition.width + 16}px`,
            height: `${highlightPosition.height + 16}px`,
            border: "3px solid rgba(34, 197, 94, 0.8)",
            borderRadius: "8px",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Tooltip popup - stays fully on screen */}
      <div
        ref={tooltipRef}
        className="fixed z-[101] transition-all duration-500 ease-out pointer-events-auto max-h-[85vh] overflow-visible animate-slideIn"
        style={{
          top: `${tooltipPosition.top}px`,
          left: `${tooltipPosition.left}px`,
        }}
      >
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl border-2 border-green-500/50 dark:border-green-400/50 w-[85vw] sm:w-80 max-w-sm">
          {/* Header */}
          <div className="flex items-start justify-between p-3 sm:p-4 border-b border-slate-200 dark:border-slate-700">
            <div className="flex-1 pr-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold flex-shrink-0">
                  {currentStep + 1}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
                  {currentStepData.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                {currentStepData.description}
              </p>
            </div>
            <button
              onClick={handleSkip}
              className="ml-1 p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex-shrink-0"
              aria-label="Skip tour"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500 dark:text-slate-400" />
            </button>
          </div>

          {/* Footer - Always visible with buttons */}
          <div className="p-3 sm:p-4 bg-slate-50 dark:bg-slate-900/50">
            {/* Progress indicator */}
            <div className="flex items-center justify-center gap-1.5 mb-3">
              {tourSteps.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentStep
                      ? "w-8 bg-green-500"
                      : index < currentStep
                      ? "w-1.5 bg-green-500/50"
                      : "w-1.5 bg-slate-300 dark:bg-slate-600"
                  }`}
                />
              ))}
            </div>

            {/* Navigation buttons - Always visible */}
            <div className="flex items-center justify-between gap-2">
              <button
                onClick={handleSkip}
                className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 font-medium transition-colors px-2 py-1"
              >
                Skip
              </button>

              <div className="flex gap-2">
                {currentStep > 0 && (
                  <button
                    onClick={handleBack}
                    className="px-3 sm:px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm font-medium">Back</span>
                  </button>
                )}
                <button
                  onClick={handleNext}
                  className="px-3 sm:px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-colors flex items-center gap-1.5 shadow-lg"
                >
                  <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
                    {currentStep === tourSteps.length - 1 ? "Finish" : "Next"}
                  </span>
                  {currentStep < tourSteps.length - 1 && (
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Arrow pointer - positions dynamically */}
          <div
            className={`absolute w-0 h-0 ${
              currentStepData.position === "top"
                ? "bottom-[-10px] left-1/2 -translate-x-1/2 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-green-500/50"
                : currentStepData.position === "bottom"
                ? "top-[-10px] left-1/2 -translate-x-1/2 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-green-500/50"
                : currentStepData.position === "left"
                ? "right-[-10px] top-1/2 -translate-y-1/2 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[10px] border-l-green-500/50"
                : "left-[-10px] top-1/2 -translate-y-1/2 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[10px] border-r-green-500/50"
            }`}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
