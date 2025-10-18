"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { BACKEND_URL } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { PulseLoader } from "react-spinners";

interface FormData {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

const ChangePassword = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setMessage(null);
    setLoading(true);

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setMessage({ type: "error", text: "You are not logged in" });
        setLoading(false);
        router.push("/login");
        return;
      }

      const res = await fetch(`${BACKEND_URL}/change-password/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to change password");

      setMessage({
        type: "success",
        text: result.success || "Password changed successfully ✅",
      });
      reset();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage({ type: "error", text: err.message });
      } else {
        setMessage({ type: "error", text: "Something went wrong" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 font-poppins transition-colors duration-300">
      {/* Header */}
      <div className="flex items-center bg-teal-900 dark:bg-teal-800 text-white px-4 py-3 shadow-sm">
        <div
          onClick={() => router.back()}
          className="cursor-pointer hover:opacity-80 transition"
        >
          <ArrowLeft className="w-6 h-6 mr-3" />
        </div>
        <h1 className="text-lg font-semibold">Change Password</h1>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-1 px-4 py-6 space-y-6 max-w-[600px] mx-auto w-full"
      >
        {/* Old Password */}
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300">
            Old Password
          </label>
          <div className="relative">
            <Input
              type={showOld ? "text" : "password"}
              {...register("old_password", {
                required: "Old password required",
              })}
              className="w-full border-b border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-gray-100 rounded-none focus:ring-0 focus:border-teal-600"
            />
            <button
              type="button"
              onClick={() => setShowOld(!showOld)}
              className="absolute right-2 top-2 text-gray-500 dark:text-gray-400 hover:text-teal-600"
            >
              {showOld ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.old_password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.old_password.message}
            </p>
          )}
        </div>

        {/* New Password */}
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300">
            New Password
          </label>
          <div className="relative">
            <Input
              type={showNew ? "text" : "password"}
              {...register("new_password", {
                required: "New password required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full border-b border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-gray-100 rounded-none focus:ring-0 focus:border-teal-600"
            />
            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-2 top-2 text-gray-500 dark:text-gray-400 hover:text-teal-600"
            >
              {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.new_password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.new_password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-300">
            Confirm Password
          </label>
          <div className="relative">
            <Input
              type={showConfirm ? "text" : "password"}
              {...register("confirm_password", {
                required: "Confirm your password",
                validate: (value) =>
                  value === watch("new_password") || "Passwords do not match",
              })}
              className="w-full border-b border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-gray-100 rounded-none focus:ring-0 focus:border-teal-600"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-2 top-2 text-gray-500 dark:text-gray-400 hover:text-teal-600"
            >
              {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.confirm_password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.confirm_password.message}
            </p>
          )}
        </div>

        {/* Messages */}
        {message && (
          <p
            className={`text-sm ${
              message.type === "error"
                ? "text-red-500"
                : "text-green-600 dark:text-green-500"
            }`}
          >
            {message.text}
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full md:w-fit px-6 bg-teal-900 dark:bg-teal-700 text-white py-3 rounded-lg font-medium hover:bg-teal-800 dark:hover:bg-teal-600 transition"
        >
          {!loading ? (
            "Update Password"
          ) : (
            <PulseLoader color="#fff" size={15} />
          )}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
