"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Shield,
  ArrowLeft,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Sun,
  Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { BACKEND_URL } from "@/lib/constants";
import { toast } from "sonner";
import { PulseLoader } from "react-spinners";
import Link from "next/link";
import Image from "next/image";

export default function Verify2FAPage() {
  const [code, setCode] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    // Get email from URL params (passed from login page)
    const email = searchParams.get("email");
    if (email) {
      setUserEmail(email);
    } else {
      // If no email, redirect to login
      router.push("/login");
    }
  }, [searchParams, router]);

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
      const response = await fetch(`${BACKEND_URL}/verify-2fa/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail,
          code: verificationCode,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        const errorMessage = result?.error || "Verification failed";
        toast.error(errorMessage);
        return;
      }

      // Save token
      localStorage.setItem("authToken", result.token);

      toast.success("✅ Login successful!");

      // Redirect to portfolio
      setTimeout(() => {
        router.push("/portfolio");
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
      // For 2FA resend, we need to login again to trigger code sending
      toast.info("Please login again to receive a new code");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.error("Network error. Please try again.");
    } finally {
      setResending(false);
    }
  };

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
              <Shield className="w-10 h-10 text-emerald-500 dark:text-emerald-600" />
            </div>
            <h1 className="text-3xl font-bold">Two-Factor Authentication</h1>
            <p className="text-gray-400 dark:text-gray-600">
              Enter the 4-digit code sent to {userEmail}
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
                  Verify & Login
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
                {resending ? "Processing..." : "Didn't receive code?"}
              </button>
            </div>

            {/* Security Notice */}
            <div className="bg-amber-900/20 dark:bg-amber-50 border border-amber-800 dark:border-amber-200 rounded-lg p-4">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-amber-400 dark:text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-200 dark:text-amber-800">
                  <p className="font-semibold mb-1">Security Notice</p>
                  <p>
                    Never share this code with anyone. The code expires in 10
                    minutes.
                  </p>
                  <p className="mt-2">
                    If you didn&apos;t request this login, your account may be
                    compromised.
                  </p>
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
          <Shield className="w-32 h-32 text-white mx-auto" />
          <h2 className="text-3xl font-bold text-white">Enhanced Security</h2>
          <p className="text-white/90 text-lg max-w-md">
            Two-factor authentication keeps your account safe by requiring a
            verification code in addition to your password.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
