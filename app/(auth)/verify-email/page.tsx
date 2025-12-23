"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Mail,
  ArrowLeft,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Moon,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { BACKEND_URL } from "@/lib/constants";
import { toast } from "sonner";
import { PulseLoader } from "react-spinners";
import Link from "next/link";
import Image from "next/image";

export default function VerifyEmailPage() {
  const [code, setCode] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  // ✅ Check authentication and verification status
  useEffect(() => {
    const checkVerificationStatus = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const response = await fetch(`${BACKEND_URL}/api/validate-token/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        if (!response.ok) {
          // Invalid token, redirect to login
          localStorage.removeItem("authToken");
          router.push("/login");
          return;
        }

        const data = await response.json();

        // ✅ If already verified, redirect to onboarding
        if (data.user?.email_verified === true) {
          toast.success("Email already verified!");
          router.push("/onboarding");
          return;
        }

        // ✅ Email not verified, stay on this page
        setCheckingStatus(false);
      } catch (error) {
        console.error("Error checking verification status:", error);
        toast.error("Failed to verify session. Please try again.");
        router.push("/login");
      }
    };

    checkVerificationStatus();
  }, [router]);

  const handleCodeChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 4);
    if (/^\d+$/.test(pastedData)) {
      const newCode = pastedData.split("");
      setCode([...newCode, ...Array(4 - newCode.length).fill("")]);
    }
  };

  const handleVerify = async () => {
    const verificationCode = code.join("");

    if (verificationCode.length !== 4) {
      toast.error("Please enter the complete 4-digit code");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("Please login again");
        router.push("/login");
        return;
      }

      const response = await fetch(`${BACKEND_URL}/verify-email/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({ code: verificationCode }),
      });

      const result = await response.json();

      if (!response.ok) {
        const errorMessage = result?.error || "Verification failed";
        toast.error(errorMessage);
        return;
      }

      toast.success("✅ Email verified successfully!");

      // Redirect to onboarding
      setTimeout(() => {
        router.push("/onboarding");
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    setResending(true);

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        toast.error("Please login again");
        router.push("/login");
        return;
      }

      const response = await fetch(`${BACKEND_URL}/resend-code/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        const errorMessage = result?.error || "Failed to resend code";
        toast.error(errorMessage);
        return;
      }

      toast.success("✅ Verification code sent! Check your email.");
      setCode(["", "", "", ""]);
      document.getElementById("code-0")?.focus();
    } catch (error) {
      console.error(error);
      toast.error("Network error. Please try again.");
    } finally {
      setResending(false);
    }
  };

  // ✅ Show loading screen while checking verification status
  if (checkingStatus) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#090909] dark:bg-white">
        <div className="text-center space-y-4">
          <PulseLoader color="#10b981" size={15} />
          <p className="text-gray-400 dark:text-gray-600">
            Checking verification status...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#090909] dark:bg-white text-white dark:text-black transition-colors duration-300">
      {/* Left side: Verification Form */}
      <div className="flex-1 flex items-center justify-center px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md space-y-6"
        >
          {/* Logo */}
          <Link
            href="/"
            className="hidden dark:flex text-2xl md:text-4xl mb-10 font-extrabold self-center tracking-tight items-center gap-1 justify-center"
          >
            <Image
              alt="logo"
              src="/images/logo_dark.png"
              className="h-30 md:h-40 w-auto"
              width={1000}
              height={1000}
            />
          </Link>
          <Link
            href="/"
            className="flex dark:hidden text-2xl md:text-4xl mb-10 font-extrabold self-center tracking-tight items-center gap-1 justify-center"
          >
            <Image
              alt="logo"
              src="/images/logo_light.png"
              className="h-30 md:h-40 w-auto"
              width={1000}
              height={1000}
            />
          </Link>

          {/* Theme toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="fixed top-5 right-5 p-2 rounded-md border border-gray-700 dark:border-gray-300 hover:bg-gray-800 dark:hover:bg-gray-100 transition-all"
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4 text-emerald-500" />
              ) : (
                <Sun className="w-4 h-4 text-emerald-400" />
              )}
            </button>
          )}

          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-20 h-20 bg-emerald-900/20 dark:bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-10 h-10 text-emerald-500 dark:text-emerald-600" />
            </div>
            <h1 className="text-3xl font-bold">Verify Your Email</h1>
            <p className="text-gray-400 dark:text-gray-600">
              We&apos;ve sent a 4-digit verification code to your email
            </p>
          </div>

          {/* Code Input */}
          <div className="space-y-6">
            <div className="flex justify-center gap-3" onPaste={handlePaste}>
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-16 h-16 text-center text-2xl font-bold border-2 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500 border-gray-700 dark:border-gray-400 transition-all"
                />
              ))}
            </div>

            {/* Verify Button */}
            <Button
              onClick={handleVerify}
              disabled={loading || code.some((d) => !d)}
              className="w-full py-6 bg-emerald-700 hover:bg-emerald-600 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <PulseLoader color="#fff" size={15} />
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Verify Email
                </span>
              )}
            </Button>

            {/* Resend Code */}
            <div className="text-center">
              <button
                onClick={handleResendCode}
                disabled={resending}
                className="text-emerald-500 hover:underline disabled:opacity-50 flex items-center justify-center gap-2 mx-auto"
              >
                <RefreshCw
                  className={`w-4 h-4 ${resending ? "animate-spin" : ""}`}
                />
                {resending ? "Sending..." : "Resend Code"}
              </button>
            </div>

            {/* Info Notice */}
            <div className="bg-blue-900/20 dark:bg-blue-50 border border-blue-800 dark:border-blue-200 rounded-lg p-4">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-400 dark:text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-200 dark:text-blue-800">
                  <p className="font-semibold mb-1">
                    Didn&apos;t receive the code?
                  </p>
                  <p>
                    Check your spam folder or click &quot;Resend Code&quot; to get a new
                    one.
                  </p>
                  <p className="mt-2">The code expires in 10 minutes.</p>
                </div>
              </div>
            </div>

            {/* Back to Login */}
            <div className="text-center">
              <Link
                href="/login"
                className="text-gray-400 dark:text-gray-600 hover:text-emerald-500 flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right side: Visual section */}
      <div className="hidden md:flex flex-1 items-center justify-center bg-gradient-to-br from-emerald-800 to-emerald-950 dark:from-emerald-800 dark:to-emerald-900 p-8 rounded-l-3xl">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6"
        >
          <CheckCircle className="w-32 h-32 text-white mx-auto" />
          <h2 className="text-3xl font-bold text-white">One More Step!</h2>
          <p className="text-white/90 text-lg max-w-md">
            Verify your email to unlock all features and start your trading
            journey with Citadel Markets Pro.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
