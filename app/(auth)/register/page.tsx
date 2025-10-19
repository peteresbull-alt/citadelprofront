"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { motion } from "framer-motion";
import Select, {
  FormatOptionLabelMeta,
  GroupBase,
  PropsValue,
} from "react-select";
import countryList from "react-select-country-list";
import { Eye, EyeOff, Sun, Moon, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Link from "next/link";
import { PulseLoader } from "react-spinners";
import { BACKEND_URL } from "@/lib/constants";
import { useRouter } from "next/navigation";

// ----------------------
// Types
// ----------------------
interface CountryOption {
  value: string;
  label: string;
  flag: string;
}

// ----------------------
// Validation Schema
// ----------------------
const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  // include flag so runtime shape matches Select options
  country: z
    .object({
      value: z.string(),
      label: z.string(),
      flag: z.string(),
    })
    .refine((val) => Boolean(val?.value && val?.label), {
      message: "Country is required",
    }),
});

type RegisterFormData = z.infer<typeof registerSchema>;

// ----------------------
// Component
// ----------------------
export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    // you can set defaultValues here if desired
  });

  const watchedValues = watch();

  // ✅ Country options with flags (typed)
  const countryOptions: CountryOption[] = useMemo(() => {
    return countryList()
      .getData()
      .map((country) => ({
        value: country.value,
        label: country.label,
        flag: country.value.toLowerCase(),
      }));
  }, []);

  // ✅ Auto-detect country using ipapi
  useEffect(() => {
    async function fetchCountry() {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        const countryName = data.country_name;
        const found = countryOptions.find(
          (c) => c.label.toLowerCase() === countryName?.toLowerCase()
        );
        if (found) {
          // set the full CountryOption object (matches schema)
          setValue("country", found);
        }
      } catch (err) {
        console.warn("Could not auto-detect country:", err);
      }
    }
    fetchCountry();
  }, [countryOptions, setValue]);

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    setMessage(null);

    try {
      const payload = {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        password: data.password,
        country: data.country.label,
      };

      const res = await fetch(`${BACKEND_URL}/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      // ✅ Handle error responses gracefully
      if (!res.ok) {
        let errorMessage = "Registration failed. Please try again.";

        // Case 1: Django returns {"error": "User already exists"}
        if (result?.error) {
          if (Array.isArray(result.error)) {
            // Password validation errors come as a list
            errorMessage = result.error.join(" ");
          } else if (typeof result.error === "string") {
            errorMessage = result.error;
          }
        }

        throw new Error(errorMessage);
      }

      // ✅ Success handling
      setMessage("✅ Registration successful! Redirecting to login...");
      console.log("Registration successful:", result);

      // Redirect after a short delay
      setTimeout(() => router.push("/login"), 1500);
    } catch (error: any) {
      console.error("Registration error:", error);
      setMessage(
        `❌ ${error.message || "Something went wrong. Please try again."}`
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => setMounted(true), []);

  // ✅ Custom Option & SingleValue for react-select (to display flag + name)
  const formatOptionLabel = (
    option: CountryOption,
    meta?: FormatOptionLabelMeta<CountryOption>
  ) => (
    <div className="flex items-center gap-2">
      <span className={`fi fi-${option.flag}`}></span>
      <span>{option.label}</span>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row gap-10 bg-white dark:bg-[#090909] text-black dark:text-white transition-colors duration-300">
      {/* Left side: Register Form */}
      <div className="flex-1 flex items-center justify-center px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-sm space-y-6 flex flex-col"
        >
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl md:text-4xl mb-10 font-extrabold self-center tracking-tight flex items-center gap-1 text-emerald-600 dark:bg-gradient-to-r dark:from-white dark:via-emerald-200 dark:to-emerald-400 dark:bg-clip-text dark:text-transparent"
          >
            <Image
              alt="logo"
              src={"/images/logo.png"}
              className="h-10 md:h-12 w-auto"
              width={1000}
              height={1000}
            />
            <span>Citadel</span>
            <sup className="dark:text-white text-black">pro</sup>
          </Link>

          {/* Title & Theme toggle */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold flex items-center gap-2">
              <Link href={"/"}>
                <ArrowLeft />
              </Link>
              Sign Up
            </h1>

            {mounted && (
              <button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="p-2 rounded-md border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              >
                {theme === "light" ? (
                  <Moon className="w-4 h-4 text-emerald-500" />
                ) : (
                  <Sun className="w-4 h-4 text-emerald-400" />
                )}
              </button>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* First & Last Name */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* First Name */}
              <div className="relative flex-1">
                <input
                  id="firstName"
                  type="text"
                  {...register("firstName")}
                  className={`peer w-full border rounded-md px-3 pt-5 pb-2 bg-transparent focus:outline-none transition-all ${
                    errors.firstName
                      ? "border-red-500"
                      : "border-gray-400 dark:border-gray-700"
                  }`}
                  placeholder=" "
                />
                <label
                  htmlFor="firstName"
                  className={`absolute left-3 text-gray-500 dark:text-gray-400 transition-all pointer-events-none ${
                    watchedValues.firstName
                      ? "text-xs top-1"
                      : "peer-focus:text-xs peer-focus:top-1 top-3"
                  }`}
                >
                  First Name
                </label>
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName.message as string}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div className="relative flex-1">
                <input
                  id="lastName"
                  type="text"
                  {...register("lastName")}
                  className={`peer w-full border rounded-md px-3 pt-5 pb-2 bg-transparent focus:outline-none transition-all ${
                    errors.lastName
                      ? "border-red-500"
                      : "border-gray-400 dark:border-gray-700"
                  }`}
                  placeholder=" "
                />
                <label
                  htmlFor="lastName"
                  className={`absolute left-3 text-gray-500 dark:text-gray-400 transition-all pointer-events-none ${
                    watchedValues.lastName
                      ? "text-xs top-1"
                      : "peer-focus:text-xs peer-focus:top-1 top-3"
                  }`}
                >
                  Last Name
                </label>
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.lastName.message as string}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="relative">
              <input
                id="email"
                type="email"
                {...register("email")}
                className={`peer w-full border rounded-md px-3 pt-5 pb-2 bg-transparent focus:outline-none transition-all ${
                  errors.email
                    ? "border-red-500"
                    : "border-gray-400 dark:border-gray-700"
                }`}
                placeholder=" "
              />
              <label
                htmlFor="email"
                className={`absolute left-3 text-gray-500 dark:text-gray-400 transition-all pointer-events-none ${
                  watchedValues.email
                    ? "text-xs top-1"
                    : "peer-focus:text-xs peer-focus:top-1 top-3"
                }`}
              >
                Email
              </label>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message as string}
                </p>
              )}
            </div>

            {/* Country Dropdown */}
            <div className="relative">
              {mounted && (
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => {
                    // field.value has type CountryOption | undefined
                    const value = field.value as CountryOption | undefined;

                    return (
                      <Select<CountryOption, false, GroupBase<CountryOption>>
                        instanceId="country-select"
                        // value must match option type
                        value={value ?? null}
                        options={countryOptions}
                        placeholder="Select Country"
                        formatOptionLabel={formatOptionLabel}
                        // ensure onChange provides CountryOption to RHF
                        onChange={(selected: PropsValue<CountryOption>) => {
                          // selected can be null | CountryOption (PropsValue covers variants)
                          // cast safely:
                          const sel = Array.isArray(selected)
                            ? (selected[0] as CountryOption)
                            : (selected as CountryOption);
                          field.onChange(sel);
                        }}
                        styles={{
                          control: (base) => ({
                            ...base,
                            backgroundColor: "transparent",
                            borderColor: errors.country ? "red" : "#9ca3af",
                            borderRadius: "0.375rem",
                            boxShadow: "none",
                            paddingTop: 8,
                            paddingBottom: 8,
                            color: theme === "dark" ? "#fff" : "#000",
                          }),
                          singleValue: (base) => ({
                            ...base,
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            color: theme === "dark" ? "#fff" : "#000",
                          }),
                          menu: (base) => ({
                            ...base,
                            zIndex: 50,
                            backgroundColor:
                              theme === "dark" ? "#1f2937" : "#fff",
                            color: theme === "dark" ? "#fff" : "#000",
                          }),
                          option: (base, { isFocused, isSelected }) => ({
                            ...base,
                            backgroundColor: isSelected
                              ? theme === "dark"
                                ? "#10b981"
                                : "#d1fae5"
                              : isFocused
                              ? theme === "dark"
                                ? "#374151"
                                : "#f3f4f6"
                              : "transparent",
                            color:
                              isSelected || isFocused
                                ? theme === "dark"
                                  ? "#fff"
                                  : "#000"
                                : theme === "dark"
                                ? "#d1d5db"
                                : "#000",
                            cursor: "pointer",
                          }),
                          placeholder: (base) => ({
                            ...base,
                            color: theme === "dark" ? "#9ca3af" : "#6b7280",
                          }),
                          input: (base) => ({
                            ...base,
                            color: theme === "dark" ? "#fff" : "#000",
                          }),
                        }}
                      />
                    );
                  }}
                />
              )}
              {errors.country && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.country.message as string}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className={`peer w-full border rounded-md px-3 pt-5 pb-2 bg-transparent focus:outline-none transition-all ${
                  errors.password
                    ? "border-red-500"
                    : "border-gray-400 dark:border-gray-700"
                }`}
                placeholder=" "
              />
              <label
                htmlFor="password"
                className={`absolute left-3 text-gray-500 dark:text-gray-400 transition-all pointer-events-none ${
                  watchedValues.password
                    ? "text-xs top-1"
                    : "peer-focus:text-xs peer-focus:top-1 top-3"
                }`}
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-4 text-gray-500 dark:text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message as string}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-6 rounded-md"
            >
              {!loading ? (
                <span>Create Account</span>
              ) : (
                <PulseLoader color="#fff" size={15} />
              )}
            </Button>

            {message && (
              <p
                className={`text-center text-sm ${
                  message.startsWith("✅") ? "text-green-500" : "text-red-500"
                }`}
              >
                {message}
              </p>
            )}

            <p className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-emerald-500 hover:underline">
                Sign In
              </Link>
            </p>
          </form>
        </motion.div>
      </div>

      {/* Right side visual */}
      <div className="md:flex flex-1 items-center justify-center bg-gradient-to-br from-emerald-600 to-emerald-900 dark:from-emerald-800 dark:to-emerald-950 p-8 rounded-l-3xl">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full max-w-md flex flex-col items-center text-center text-white space-y-6"
        >
          <h2 className="text-2xl font-semibold">
            Join millions of traders worldwide
          </h2>
          <div className="relative w-full aspect-square overflow-hidden">
            <Image
              src="/images/trusted.webp"
              alt="Trading Community"
              width={825}
              height={770}
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
