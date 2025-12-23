"use client";

import { BACKEND_URL } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { useTheme } from "next-themes";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { theme, resolvedTheme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("authToken");

      // ✅ No token → redirect to login
      if (!token) {
        console.log("ProtectedRoute: No token, redirecting to /login");
        router.push("/login");
        return;
      }

      try {
        const res = await fetch(`${BACKEND_URL}/api/validate-token/`, {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        if (!res.ok) {
          // ✅ Invalid token → remove and redirect to login
          console.log("ProtectedRoute: Invalid token, redirecting to /login");
          localStorage.removeItem("authToken");
          router.push("/login");
          return;
        }

        const userData = await res.json();
        console.log("ProtectedRoute: User data:", userData);

        // ✅ Check email verification status
        if (userData.user && userData.user.email_verified === false) {
          console.log(
            "ProtectedRoute: Email not verified, redirecting to /verify-email"
          );
          router.push("/verify-email");
          return;
        }

        // ✅ All checks passed → allow access
        console.log("ProtectedRoute: All checks passed, rendering page");
        setLoading(false);
      } catch (error) {
        console.error("ProtectedRoute: Token validation failed:", error);
        localStorage.removeItem("authToken");
        router.push("/login");
      }
    };

    checkToken();
  }, [router]);

  if (!mounted) return null;

  const activeTheme = theme === "system" ? resolvedTheme : theme;

  // ✅ Show full-screen loader while checking (don't render children)
  if (loading) {
    return (
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 transition-colors duration-300 ${
          activeTheme === "light" ? "bg-white" : "bg-[#090909]"
        }`}
      >
        <div className="flex flex-col items-center space-y-4">
          <PulseLoader color="#10b981" size={20} />
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Verifying access...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
