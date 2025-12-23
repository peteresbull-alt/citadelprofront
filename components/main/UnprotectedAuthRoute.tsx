"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "@/lib/constants";
import { PulseLoader } from "react-spinners";

export default function UnprotectedAuthRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setChecking(false);
        return;
      }

      try {
        const response = await fetch(`${BACKEND_URL}/api/validate-token/`, {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        if (!response.ok) {
          localStorage.removeItem("authToken");
          setChecking(false);
          return;
        }

        // ✅ Valid token - redirect to portfolio (no email verification check)
        router.push("/portfolio");
      } catch (error) {
        console.error("Error checking auth status:", error);
        setChecking(false);
      }
    };

    checkAuthStatus();
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#090909] dark:bg-white">
        <div className="flex flex-col items-center space-y-4">
          <PulseLoader color="#10b981" size={15} />
          <p className="text-gray-400 dark:text-gray-600 text-sm">
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
