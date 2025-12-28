"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
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
import { Eye, EyeOff, Sun, Moon, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Link from "next/link";
import { PulseLoader } from "react-spinners";
import { BACKEND_URL } from "@/lib/constants";
import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";

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
  email: z.email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  country: z
    .object({
      value: z.string(),
      label: z.string(),
      flag: z.string(),
    })
    .refine((val) => Boolean(val?.value && val?.label), {
      message: "Country is required",
    }),
  referralCode: z.string().optional(),
});

type RegisterFormData = z.infer<typeof registerSchema>;

// ----------------------
// Main Component wrapped in Suspense
// ----------------------
function RegisterPageContent() {
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [referralCode, setReferralCode] = useState<string>("");
  const [referralValid, setReferralValid] = useState<boolean | null>(null);
  const [referrerName, setReferrerName] = useState<string>("");
  const { theme, setTheme } = useTheme();

  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const watchedValues = watch();

  // Country options with flags
  const countryOptions: CountryOption[] = useMemo(() => {
    return countryList()
      .getData()
      .map((country) => ({
        value: country.value,
        label: country.label,
        flag: country.value.toLowerCase(),
      }));
  }, []);

  // ✅ Handle referral code from URL and store in localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;

    const refParam = searchParams.get("ref");

    if (refParam) {
      const upperRef = refParam.trim().toUpperCase();
      setReferralCode(upperRef);
      setValue("referralCode", upperRef);

      // Store in localStorage for persistence
      localStorage.setItem("referral_code", upperRef);

      // Validate referral code
      validateReferralCode(upperRef);
    } else {
      // Check localStorage for existing referral code
      const storedRef = localStorage.getItem("referral_code");
      if (storedRef) {
        setReferralCode(storedRef);
        setValue("referralCode", storedRef);
        validateReferralCode(storedRef);
      }
    }
  }, [searchParams, setValue]);

  // Validate referral code
  const validateReferralCode = async (code: string) => {
    if (!code) {
      setReferralValid(null);
      return;
    }

    try {
      const response = await fetch(
        `${BACKEND_URL}/referral/validate/?code=${code}`
      );
      const data = await response.json();

      if (data.success && data.valid) {
        setReferralValid(true);
        setReferrerName(data.referrer.name);
      } else {
        setReferralValid(false);
        setReferrerName("");
      }
    } catch (error) {
      console.error("Error validating referral code:", error);
      setReferralValid(false);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    async function fetchCountry() {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();

        const countryName = data.country_name;
        const countryCallingCode = data.country_calling_code; // e.g., "+234"

        // Store calling code in localStorage for KYC page
        if (countryCallingCode) {
          localStorage.setItem("country_calling_code", countryCallingCode);
        }

        const found = countryOptions.find(
          (c) => c.label.toLowerCase() === countryName?.toLowerCase()
        );
        if (found) {
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
      const countryCallingCode =
        localStorage.getItem("country_calling_code") || "";

      const payload = {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        password: data.password,
        country: data.country.label,
        referral_code: referralCode || undefined,
        country_calling_code: countryCallingCode,
      };

      const res = await fetch(`${BACKEND_URL}/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        let errorMessage = "Registration failed. Please try again.";

        if (result?.error) {
          if (Array.isArray(result.error)) {
            errorMessage = result.error.join(" ");
          } else if (typeof result.error === "string") {
            errorMessage = result.error;
          }
        }

        throw new Error(errorMessage);
      }

      // ✅ Registration successful - NO email verification needed
      setMessage("✅ Registration successful! Redirecting...");

      // Save token and user data
      if (typeof window !== "undefined") {
        localStorage.setItem("authToken", result.token);
        if (result.user?.country_calling_code) {
          localStorage.setItem(
            "country_calling_code",
            result.user.country_calling_code
          );
        }
        localStorage.removeItem("referral_code");
      }

      // ✅ Redirect directly to onboarding (skip email verification entirely)
      setTimeout(() => router.push("/onboarding"), 1500);
    } catch (error: unknown) {
      let errorMessage = "Something went wrong. Please try again.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      setMessage(`❌ ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => setMounted(true), []);

  const formatOptionLabel = (
    option: CountryOption,
    meta?: FormatOptionLabelMeta<CountryOption>
  ) => {
    return (
      <div className="flex items-center gap-2">
        <span className={`fi fi-${option.flag}`}></span>
        <span>{option.label}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row gap-10 bg-[#090909] dark:bg-white text-white dark:text-black transition-colors duration-300">
      {/* Left side: Register Form */}
      <div className="flex-1 flex items-center justify-center px-8 py-8 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-sm space-y-6 flex flex-col"
        >
          {/* Logo */}
          <Link
            href="/"
            className="hidden dark:flex text-2xl md:text-4xl mb-10 font-extrabold self-center tracking-tight items-center gap-1 text-emerald-600"
          >
            <Image
              alt="logo"
              src={"/images/logo_dark.png"}
              className="h-30 md:h-40 w-auto"
              width={1000}
              height={1000}
            />
          </Link>
          <Link
            href="/"
            className="flex dark:hidden text-2xl md:text-4xl mb-10 font-extrabold self-center tracking-tight items-center gap-1"
          >
            <Image
              alt="logo"
              src={"/images/logo_light.png"}
              className="h-30 md:h-40 w-auto"
              width={1000}
              height={1000}
            />
          </Link>

          {/* Theme toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2 ml-auto rounded-md border fixed top-5 right-1 border-gray-700 dark:border-gray-300 hover:bg-gray-800 dark:hover:bg-gray-100 transition-all"
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4 text-emerald-500" />
              ) : (
                <Sun className="w-4 h-4 text-emerald-400" />
              )}
            </button>
          )}

          {/* Referral Banner */}
          {referralCode && referralValid && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 rounded-lg p-4"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-500/20 rounded-full">
                  <Gift className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-700">
                    🎉 Referred by {referrerName}!
                  </p>
                  <p className="text-xs text-emerald-700 dark:text-emerald-600">
                    You&apos;ll get special bonuses when you join
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {referralCode && referralValid === false && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-lg p-4"
            >
              <p className="text-sm text-red-700 dark:text-red-600">
                ❌ Invalid referral code
              </p>
            </motion.div>
          )}

          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              Let&apos;s Get Started In Less Than A Minute.
            </h1>
            <p className="text-left text-sm mt-4">
              Already have an account?{" "}
              <Link
                href="/login"
                className="uppercase text-emerald-500 hover:underline"
              >
                Log In
              </Link>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* First & Last Name */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <input
                  id="firstName"
                  type="text"
                  {...register("firstName")}
                  className={`peer w-full border rounded-md px-3 pt-5 pb-2 bg-transparent focus:outline-none transition-all ${
                    errors.firstName
                      ? "border-red-500"
                      : "border-gray-700 dark:border-gray-400"
                  }`}
                  placeholder=" "
                />
                <label
                  htmlFor="firstName"
                  className={`absolute left-3 text-gray-400 dark:text-gray-500 transition-all pointer-events-none ${
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

              <div className="relative flex-1">
                <input
                  id="lastName"
                  type="text"
                  {...register("lastName")}
                  className={`peer w-full border rounded-md px-3 pt-5 pb-2 bg-transparent focus:outline-none transition-all ${
                    errors.lastName
                      ? "border-red-500"
                      : "border-gray-700 dark:border-gray-400"
                  }`}
                  placeholder=" "
                />
                <label
                  htmlFor="lastName"
                  className={`absolute left-3 text-gray-400 dark:text-gray-500 transition-all pointer-events-none ${
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
                    : "border-gray-700 dark:border-gray-400"
                }`}
                placeholder=" "
              />
              <label
                htmlFor="email"
                className={`absolute left-3 text-gray-400 dark:text-gray-500 transition-all pointer-events-none ${
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
                    const value = field.value as CountryOption | undefined;

                    return (
                      <Select<CountryOption, false, GroupBase<CountryOption>>
                        instanceId="country-select"
                        value={value ?? null}
                        options={countryOptions}
                        placeholder="Select Country"
                        formatOptionLabel={formatOptionLabel}
                        onChange={(selected: PropsValue<CountryOption>) => {
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
                            color: theme === "dark" ? "#000" : "#fff",
                          }),
                          singleValue: (base) => ({
                            ...base,
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            color: theme === "dark" ? "#000" : "#fff",
                          }),
                          menu: (base) => ({
                            ...base,
                            zIndex: 50,
                            backgroundColor:
                              theme === "dark" ? "#fff" : "#1f2937",
                            color: theme === "dark" ? "#000" : "#fff",
                          }),
                          option: (base, { isFocused, isSelected }) => ({
                            ...base,
                            backgroundColor: isSelected
                              ? theme === "dark"
                                ? "#d1fae5"
                                : "#10b981"
                              : isFocused
                              ? theme === "dark"
                                ? "#f3f4f6"
                                : "#374151"
                              : "transparent",
                            color:
                              isSelected || isFocused
                                ? theme === "dark"
                                  ? "#000"
                                  : "#fff"
                                : theme === "dark"
                                ? "#000"
                                : "#d1d5db",
                            cursor: "pointer",
                          }),
                          placeholder: (base) => ({
                            ...base,
                            color: theme === "dark" ? "#6b7280" : "#9ca3af",
                          }),
                          input: (base) => ({
                            ...base,
                            color: theme === "dark" ? "#000" : "#fff",
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
                    : "border-gray-700 dark:border-gray-400"
                }`}
                placeholder=" "
              />
              <label
                htmlFor="password"
                className={`absolute left-3 text-gray-400 dark:text-gray-500 transition-all pointer-events-none ${
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
                className="absolute right-3 top-4 text-gray-400 dark:text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message as string}
                </p>
              )}
            </div>

            {/* Hidden referral code field */}
            <input type="hidden" {...register("referralCode")} />

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-700 hover:bg-emerald-600 text-white py-6 rounded-md"
            >
              {!loading ? (
                <span>Create Account</span>
              ) : (
                <PulseLoader color="#fff" size={15} />
              )}
            </Button>

            <div className="text-left text-sm">
              <div>
                <Checkbox id="terms" className="mr-1" />
                By signing up you agree to{" "}
                <Link
                  href="/privacy-policy"
                  className="text-emerald-500 hover:underline"
                >
                  Terms and Condition
                </Link>{" "}
                &{" "}
                <Link
                  href="/privacy-policy"
                  className="text-emerald-500 hover:underline"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>

            {message && (
              <p
                className={`text-center text-sm ${
                  message.startsWith("✅") ? "text-green-500" : "text-red-500"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </motion.div>
      </div>

      {/* Right side visual */}
      <div className="md:flex flex-1 items-center justify-center bg-gradient-to-br from-emerald-800 to-emerald-950 dark:from-emerald-800 dark:to-emerald-900 p-8 rounded-l-3xl">
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

// ----------------------
// Export with Suspense Wrapper
// ----------------------
export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <RegisterPageContent />
    </Suspense>
  );
}
