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
          return;
        }

        // ✅ Token valid - allow access (no email verification check)
        setLoading(false);
      } catch (error) {
        console.error("Token validation failed:", error);
        localStorage.removeItem("authToken");
        router.push("/login");
      }
    };

    checkToken();
  }, [router]);

  if (!mounted) return null;

  const activeTheme = theme === "system" ? resolvedTheme : theme;

  if (loading) {
    return (
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 ${
          activeTheme === "light" ? "bg-[#090909]" : "bg-white"
        }`}
      >
        <div className="flex flex-col items-center space-y-4">
          <PulseLoader color="#10b981" size={20} />
          <p className="text-gray-500 dark:text-black text-sm">
            Verifying access...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
