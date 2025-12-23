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

      // ✅ No token → stay on login/register page
      if (!token) {
        setChecking(false);
        return;
      }

      // ✅ Has token → validate it and check email verification
      try {
        const response = await fetch(`${BACKEND_URL}/validate-token/`, {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        if (!response.ok) {
          // ✅ Invalid token → remove and stay on page
          console.log("UnprotectedAuthRoute: Invalid token, removing...");
          localStorage.removeItem("authToken");
          setChecking(false);
          return;
        }

        const data = await response.json();
        console.log("UnprotectedAuthRoute: User data:", data);

        // ✅ Check email verification status
        if (data.user?.email_verified === false) {
          console.log(
            "UnprotectedAuthRoute: Email not verified, redirecting to /verify-email"
          );
          router.push("/verify-email");
          return;
        }

        // ✅ Email verified → redirect to portfolio
        console.log(
          "UnprotectedAuthRoute: Email verified, redirecting to /portfolio"
        );
        router.push("/portfolio");
      } catch (error) {
        console.error(
          "UnprotectedAuthRoute: Error checking auth status:",
          error
        );
        // ✅ Network error → stay on page
        setChecking(false);
      }
    };

    checkAuthStatus();
  }, [router]);

  // ✅ Show loading while checking
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
