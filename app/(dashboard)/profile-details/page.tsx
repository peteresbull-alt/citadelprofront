"use client";

import { useForm } from "react-hook-form";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { BACKEND_URL } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
// import { useTheme } from "next-themes";

type FormValues = {
  firstName: string;
  lastName: string;
  dob: string;
  country: string;
  address: string;
  city: string;
  postalCode: string;
};

export default function PersonalDetailsPage() {
  const router = useRouter();
  const { user } = useUserProfile();
  const [loading, setLoading] = useState(false);
  // const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      dob: "",
      country: "",
      address: "",
      city: "",
      postalCode: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    const token = localStorage.getItem("authToken");

    if (!token) {
      toast("Bad Auth", {
        description: "No authentication token found!",
      });
      setLoading(false);
      window.location.href = "/login";
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/profile/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          first_name: data.firstName,
          last_name: data.lastName,
          dob: data.dob,
          address: data.address,
          postal_code: data.postalCode,
          country: data.country,
          city: data.city,
        }),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      const result = await res.json();
      toast("Uploaded", {
        description: result.message || "Profile updated successfully",
      });
    } catch (err) {
      console.error(err);
      toast("Error", {
        description: "An error occurred while updating profile.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setValue("firstName", user.first_name || "");
      setValue("lastName", user.last_name || "");
      setValue("country", user.country || "");
      setValue("city", user.city || "");
      setValue("dob", user.dob || "");
      setValue("address", user.address || "");
      setValue("postalCode", user.postal_code || "");
    }
    setMounted(true);
  }, [user, setValue]);

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#0d0d0d] text-gray-900 dark:text-gray-100 font-poppins transition-colors duration-500">
      {/* Header */}
      <div className="flex items-center justify-between bg-teal-900 dark:bg-[#101010] text-white px-4 py-3 transition-colors">
        <div
          onClick={() => router.back()}
          className="cursor-pointer flex items-center gap-2"
        >
          <ArrowLeft className="w-6 h-6" />
          <h1 className="text-lg font-semibold">Personal Details</h1>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-1 px-4 py-6 space-y-6 max-w-[1000px]"
      >
        {/* Field Groups */}
        {[
          { name: "firstName", label: "First Name" },
          { name: "lastName", label: "Last Name" },
          { name: "dob", label: "Date of Birth", type: "date" },
          { name: "address", label: "Street Address" },
          { name: "postalCode", label: "Postal Code" },
          { name: "country", label: "Country" },
          { name: "city", label: "City" },
        ].map(({ name, label, type }) => (
          <div key={name}>
            <label className="block text-sm text-gray-500 dark:text-gray-400">
              {label}
            </label>
            <Input
              type={type || "text"}
              {...register(name as keyof FormValues, {
                required: `${label} is required`,
              })}
              className="w-full border-b text-gray-800 dark:text-gray-100 bg-transparent dark:bg-[#1a1a1a]
                rounded-none border-t-0 shadow-none border-x-0
                border-gray-300 dark:border-gray-700 focus:border-emerald-500
                transition-colors duration-300"
            />
            {errors[name as keyof FormValues] && (
              <p className="text-red-500 text-sm">
                {errors[name as keyof FormValues]?.message as string}
              </p>
            )}
          </div>
        ))}

        {/* Update Button */}
        <button
          type="submit"
          className="w-full mb-10 bg-teal-900 dark:bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-teal-800 dark:hover:bg-emerald-500 transition-all duration-300"
        >
          {!loading ? (
            <span>Update</span>
          ) : (
            <PulseLoader color="#fff" size={15} />
          )}
        </button>
      </form>
    </div>
  );
}
