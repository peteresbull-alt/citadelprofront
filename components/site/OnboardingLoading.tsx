"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, Shield, Monitor, Cloud, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

interface OnboardingStep {
  step: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  duration: number;
}

const OnboardingLoading = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const steps: OnboardingStep[] = [
    {
      step: 1,
      title: "Seamless onboarding in progress",
      description:
        "We're securely connecting your account and preparing your workspace for a smooth start.",
      icon: (
        <motion.div
          className="relative "
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Monitor className="w-24 h-24 text-emerald-500 dark:text-emerald-400 mb-4" />
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Shield className="w-12 h-12 text-emerald-400 dark:text-emerald-300 absolute -bottom-2 -right-2" />
          </motion.div>
          <motion.div
            animate={{ x: [0, 10, 0], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Cloud className="w-16 h-16 text-teal-500 dark:text-teal-400 absolute -top-4 right-0" />
          </motion.div>
        </motion.div>
      ),
      duration: 7000,
    },
    {
      step: 2,
      title: "Personalizing your experience...",
      description:
        "We're tailoring Citadel Markets Pro to your preferences for a more relevant and efficient workflow.",
      icon: (
        <motion.div
          className="relative "
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Monitor className="w-8 h-8 text-white" />
            </motion.div>
            <motion.div
              className="w-16 h-16 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-lg flex items-center justify-center"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              whileHover={{ scale: 1.1, rotate: -5 }}
            >
              <Lock className="w-8 h-8 text-white" />
            </motion.div>
          </div>
          <motion.div
            animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Cloud className="w-20 h-20 text-emerald-400 dark:text-emerald-300 absolute -top-6 left-1/2 -translate-x-1/2 opacity-60" />
          </motion.div>
        </motion.div>
      ),
      duration: 7000,
    },
  ];

  useEffect(() => {
    if (currentStep < steps.length) {
      const timer = setTimeout(() => {
        if (currentStep === steps.length - 1) {
          setIsComplete(true);
        } else {
          setCurrentStep((prev) => prev + 1);
        }
      }, steps[currentStep].duration);

      return () => clearTimeout(timer);
    }
  }, [currentStep, steps]);

  const handleComplete = () => {
    router.push("/kyc");
  };

  if (!mounted) return null;

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 dark:from-gray-50 dark:via-white dark:to-gray-100 flex items-center justify-center p-6 transition-colors duration-500">
        <motion.div
          className="max-w-md w-full text-center py-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Step Indicator */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-gray-500 dark:text-gray-500 text-sm font-medium">
              Step 3 of 3
            </span>
          </motion.div>

          {/* Success Animation */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-emerald-500/30 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              ></motion.div>
              <motion.div
                className="relative bg-gradient-to-br from-emerald-400 to-emerald-600 w-32 h-32 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/50"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
                >
                  <CheckCircle
                    className="w-20 h-20 text-white"
                    strokeWidth={2.5}
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Success Message */}
          <motion.h2
            className="text-3xl lg:text-4xl font-bold text-white dark:text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            All set! Click below to start using Citadel Markets Pro
          </motion.h2>
          <motion.p
            className="text-gray-400 dark:text-gray-600 text-lg mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            Your set-up is complete. You can now access all features and start
            trading confidently.
          </motion.p>

          {/* CTA Button */}
          <motion.button
            onClick={handleComplete}
            className="w-full sm:w-auto px-12 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-lg font-semibold rounded-full transition-all duration-300 shadow-lg shadow-emerald-500/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 30px rgba(16, 185, 129, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Complete Registration
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 dark:from-gray-50 dark:via-white dark:to-gray-100 flex items-center justify-center p-6 transition-colors duration-500">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          className="max-w-md w-full text-center py-2"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Step Indicator */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-gray-500 dark:text-gray-500 text-sm font-medium">
              Step {currentStepData.step} of 3
            </span>
          </motion.div>

          {/* Loading Text */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.p
              className="text-gray-400 dark:text-gray-600 text-sm mb-6"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              Please wait...
            </motion.p>
          </motion.div>

          {/* Icon Animation */}
          <div className="mb-12 flex justify-center">
            {currentStepData.icon}
          </div>

          {/* Title and Description */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-white">
              {currentStepData.title}
            </h2>
            <p className="text-gray-400 text-base leading-relaxed">
              {currentStepData.description}
            </p>
          </motion.div>

          {/* Progress Dots */}
          <motion.div
            className="flex justify-center gap-2 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {steps.map((_, index) => (
              <motion.div
                key={index}
                className={`h-2 rounded-full transition-all duration-500 ${
                  index === currentStep
                    ? "w-8 bg-emerald-500"
                    : index < currentStep
                    ? "w-2 bg-emerald-500/50"
                    : "w-2 bg-gray-700"
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              ></motion.div>
            ))}
            <motion.div
              className={`h-2 w-2 rounded-full transition-all duration-500 ${
                isComplete ? "bg-emerald-500" : "bg-gray-700"
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.9 }}
            ></motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default OnboardingLoading;
