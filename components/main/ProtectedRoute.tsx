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

  // ✅ Ensure theme is loaded before rendering anything theme-dependent
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
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
          localStorage.removeItem("authToken");
          router.push("/login");
        }
      } catch (error) {
        console.error("Token validation failed:", error);
        localStorage.removeItem("authToken");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, [router]);

  // ✅ Avoid hydration mismatch by waiting until after mount
  if (!mounted) return null;

  const activeTheme = theme === "system" ? resolvedTheme : theme;

  if (loading) {
    return (
      <>
        {children}

        {/* Overlay while validating session */}
        <div
          className={`fixed inset-0 flex items-center justify-center z-50 transition-colors duration-300 ${
            activeTheme === "dark" ? "bg-black/70" : "bg-white/80"
          }`}
        >
          <div className="flex flex-col items-center space-y-4">
            <PulseLoader
              color={activeTheme === "dark" ? "#00B074" : "#0f766e"}
              size={12}
            />
            <span
              className={`text-lg font-medium ${
                activeTheme === "dark" ? "text-gray-200" : "text-gray-800"
              }`}
            >
              Checking session...
            </span>
          </div>
        </div>
      </>
    );
  }

  return <>{children}</>;
}
