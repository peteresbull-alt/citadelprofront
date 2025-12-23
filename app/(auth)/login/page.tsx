"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { motion } from "framer-motion";
import { Eye, EyeOff, Sun, Moon, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Link from "next/link";
import { BACKEND_URL } from "@/lib/constants";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { PulseLoader } from "react-spinners";

type FormValues = {
  email: string;
  password: string;
};

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const emailValue = watch("email");
  const passwordValue = watch("password");


  const onSubmit = async (data: FormValues) => {
    const newData = { email: data.email, password: data.password };

    try {
      setLoading(true);

      const response = await fetch(`${BACKEND_URL}/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });

      const result = await response.json();

      if (!response.ok) {
        const backendError =
          result?.error || "Something went wrong. Please try again.";
        toast.error(backendError);
        return;
      }

      // ✅ Check ONLY for 2FA (no email verification)
      if (result?.requires_2fa) {
        toast.info("2FA code sent to your email");
        setTimeout(() => {
          router.push(`/verify-2fa?email=${encodeURIComponent(data.email)}`);
        }, 1500);
        return;
      }

      // ✅ Normal login - redirect to portfolio
      localStorage.setItem("authToken", result.token);
      toast.success("✅ Login successful");
      router.push("/portfolio");
    } catch (error) {
      console.error(error);
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => setMounted(true), []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row gap-10 bg-[#090909] dark:bg-white text-white dark:text-black transition-colors duration-300">
      {/* Left side: Login Form */}
      <div className="flex-1 flex items-center justify-center px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-sm space-y-6 flex flex-col"
        >
          <Link
            href="/"
            className="hidden dark:flex text-2xl md:text-4xl mb-10 font-extrabold self-center tracking-tight items-center gap-1 text-emerald-600 dark:bg-gradient-to-r dark:from-white dark:via-emerald-200 dark:to-emerald-400 dark:bg-clip-text dark:text-transparent"
          >
            <Image
              alt="logo"
              src={"/images/logo_dark.png"}
              className="h-30 md:h-40 w-auto"
              width={1000}
              height={1000}
            />
          </Link>
          <Link
            href="/"
            className="flex dark:hidden text-2xl md:text-4xl mb-10 font-extrabold self-center tracking-tight items-center gap-1 text-emerald-600 dark:bg-gradient-to-r dark:from-white dark:via-emerald-200 dark:to-emerald-400 dark:bg-clip-text dark:text-transparent"
          >
            <Image
              alt="logo"
              src={"/images/logo_light.png"}
              className="h-30 md:h-40 w-auto"
              width={1000}
              height={1000}
            />
          </Link>

          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold flex items-center gap-2">
              <Link href={"/"}>
                <ArrowLeft />
              </Link>
              Sign In
            </h1>

            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="p-2 rounded-md border border-gray-700 dark:border-gray-300 hover:bg-gray-800 dark:hover:bg-gray-100 transition-all"
              >
                {theme === "light" ? (
                  <Moon className="w-4 h-4 text-emerald-500" />
                ) : (
                  <Sun className="w-4 h-4 text-emerald-400" />
                )}
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Input */}
            <div className="relative">
              <input
                id="email"
                type="email"
                {...register("email")}
                className={`peer w-full border rounded-md px-3 pt-5 pb-2 bg-transparent focus:outline-none transition-all ${
                  errors.email
                    ? "border-red-500"
                    : "border-gray-700 dark:border-gray-400"
                }`}
                placeholder=" "
              />
              <label
                htmlFor="email"
                className={`absolute left-3 text-gray-400 dark:text-gray-500 transition-all pointer-events-none ${
                  emailValue
                    ? "text-xs top-1"
                    : "peer-focus:text-xs peer-focus:top-1 top-3"
                }`}
              >
                Email
              </label>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message as string}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className={`peer w-full border rounded-md px-3 pt-5 pb-2 bg-transparent focus:outline-none transition-all ${
                  errors.password
                    ? "border-red-500"
                    : "border-gray-700 dark:border-gray-400"
                }`}
                placeholder=" "
              />
              <label
                htmlFor="password"
                className={`absolute left-3 text-gray-400 dark:text-gray-500 transition-all pointer-events-none ${
                  passwordValue
                    ? "text-xs top-1"
                    : "peer-focus:text-xs peer-focus:top-1 top-3"
                }`}
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-4 text-gray-400 dark:text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message as string}
                </p>
              )}
            </div>

            {/* <div className="text-sm text-emerald-500 hover:underline cursor-pointer">
              Forgot password?
            </div> */}

            <Button
              disabled={loading}
              type="submit"
              className="w-full py-6 bg-emerald-700 hover:bg-emerald-600 text-white rounded-md"
            >
              {!loading ? (
                <span>Login</span>
              ) : (
                <PulseLoader color="#fff" size={15} />
              )}
            </Button>

            <p className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="/register" className="text-emerald-500 hover:underline">
                Sign Up
              </a>
            </p>

            {/* <div className="flex items-center gap-2">
              <div className="flex-1 h-px bg-gray-700 dark:bg-gray-300" />
              <span className="text-gray-400 dark:text-gray-500 text-sm">
                or
              </span>
              <div className="flex-1 h-px bg-gray-700 dark:bg-gray-300" />
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full py-6 border-emerald-500 text-emerald-500 hover:bg-emerald-900/20 dark:hover:bg-emerald-50"
            >
              Login with Google
            </Button> */}
          </form>
        </motion.div>
      </div>

      {/* Right side: Visual section */}
      <div className="md:flex flex-1 items-center justify-center bg-gradient-to-br from-emerald-800 to-emerald-950 dark:from-emerald-800 dark:to-emerald-900 p-8 rounded-l-3xl">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full max-w-md flex flex-col items-center text-center text-white space-y-6"
        >
          <h2 className="text-2xl font-semibold">
            Trusted by millions of traders worldwide
          </h2>

          {/* Full image */}
          <div className="relative w-full aspect-square overflow-hidden">
            <Image
              src="/images/trusted.webp" // rename your uploaded image to this or update path accordingly
              alt="Trustpilot and Awards Section"
              width={825}
              height={770}
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
