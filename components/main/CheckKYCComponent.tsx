"use client";

import { BACKEND_URL } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckKYCComponent() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const KYCStatus = async () => {
      const token = localStorage.getItem("authToken");

      try {
        const res = await fetch(`${BACKEND_URL}/profile/`, {
          method: "GET",
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        if (res.ok) {
          console.log("Success");
        }

        const data = await res.json();

        console.log("KYC Stuff: ", data);

        if (!data.user.has_submitted_kyc) {
          router.push("/kyc");
        }
      } catch (error) {
        console.error("KYC Validation Failed:", error);
      } finally {
        console.log("KYC Collected");
      }
    };

    KYCStatus();
  }, [router]);

  // Avoid hydration mismatch by waiting until after mount
  if (!mounted) return null;

  return null;
}
