"use client";

import { useEffect, useState } from "react";
import { BACKEND_URL } from "@/lib/constants";

interface UserProfile {
  id?: number;
  email?: string;
  first_name?: string;
  last_name?: string;
  free_margin?: number;
  user_funds?: number;
  balance?: number;
  equity?: number;
  margin_level?: number;
  account_id?: number;

  is_verified?: boolean;
  has_submitted_kyc?: boolean;

  country?: string;
  region?: string;
  city?: string;
  phone?: string;
  currency?: string;

  dob?: string;
  address?: string;
  postal_code?: string;

  token?: string;
}

export function useUserProfile() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        if (!token) {
          setError("No authentication token found");
          setLoading(false);
          return;
        }

        const response = await fetch(`${BACKEND_URL}/profile/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.error || "Failed to fetch profile");
        }

        setUser(data.user);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // console.log(user);

  return { user, loading, error };
}
