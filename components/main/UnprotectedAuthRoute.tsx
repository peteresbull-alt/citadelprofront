"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UnprotectedAuthRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const jsonToken = localStorage.getItem("authToken");
    const token = jsonToken;

    if (token) {
      router.push("/portfolio");
    }
  }, [router]);

  return <>{children}</>;
}
