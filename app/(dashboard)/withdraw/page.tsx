"use client";
import React, { useState, useEffect } from "react";
import { ChevronDown, AlertCircle, Check, ArrowLeft, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "@/lib/constants";
import DashboardNavbar from "@/components/main/DashboardNavbar";

// Types
interface PaymentMethod {
  id: number;
  method_type: string;
  display_name: string;
  address: string;
}

interface UserProfile {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  account_id: string;
  balance: string;
  formatted_balance: string;
  is_verified: boolean;
}

interface WithdrawalTransaction {
  id: number;
  reference: string;
  transaction_type: string;
  transaction_type_display: string;
  amount: string;
  currency: string;
  unit: string;
  status: string;
  status_display: string;
  created_at: string;
}

export default function WithdrawPage() {
  const router = useRouter();

  // State
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const [transactions, setTransactions] = useState<WithdrawalTransaction[]>([]);
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [withdrawalAddress, setWithdrawalAddress] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch user profile and payment methods on mount
  useEffect(() => {
    fetchUserProfile();
    fetchPaymentMethods();
    fetchWithdrawalHistory();
  }, []);

  // Update withdrawal address when method changes
  useEffect(() => {
    if (selectedMethod && methods.length > 0) {
      const method = methods.find((m) => m.method_type === selectedMethod);
      if (method) {
        setWithdrawalAddress(method.address);
      }
    } else {
      setWithdrawalAddress("");
    }
  }, [selectedMethod, methods]);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        router.push("/login");
        return;
      }

      const response = await fetch(`${BACKEND_URL}/withdrawals/profile/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setProfile(data.user);
      } else {
        setError("Failed to load profile");
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError("Failed to connect to server");
    }
  };

  const fetchPaymentMethods = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      const response = await fetch(`${BACKEND_URL}/withdrawals/methods/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setMethods(data.methods);
      }
    } catch (err) {
      console.error("Error fetching methods:", err);
    }
  };

  const fetchWithdrawalHistory = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      const response = await fetch(
        `${BACKEND_URL}/withdrawals/history/?limit=10`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setTransactions(data.transactions);
      }
    } catch (err) {
      console.error("Error fetching withdrawal history:", err);
    }
  };

  const handleMethodSelect = (methodType: string) => {
    setSelectedMethod(methodType);
    setIsDropdownOpen(false);
    setError("");
  };

  const handleConfirmWithdrawal = async () => {
    setError("");
    setSuccess("");

    // Validation
    if (!selectedMethod) {
      setError("Please select a withdrawal method");
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    if (!withdrawalAddress) {
      setError("Withdrawal address is required");
      return;
    }

    if (profile && parseFloat(amount) > parseFloat(profile.balance)) {
      setError(
        `Insufficient balance. Your balance is ${profile.formatted_balance}`
      );
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("Please login to make a withdrawal");
        setLoading(false);
        return;
      }

      const response = await fetch(`${BACKEND_URL}/withdrawals/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          method_type: selectedMethod,
          amount: amount,
          withdrawal_address: withdrawalAddress,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(
          data.message || "Withdrawal request submitted successfully!"
        );

        // Update profile balance
        if (profile) {
          setProfile({
            ...profile,
            balance: data.transaction.new_balance,
            formatted_balance: data.transaction.formatted_new_balance,
          });
        }

        // Refresh withdrawal history
        fetchWithdrawalHistory();

        // Clear form
        setSelectedMethod("");
        setAmount("");
        setWithdrawalAddress("");

        // Redirect after 2 seconds
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setError(data.error || "Failed to submit withdrawal request");
      }
    } catch (err) {
      console.error("Error submitting withdrawal:", err);
      setError("Failed to submit withdrawal request");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    router.back();
  };

  const getDisplayName = (methodType: string): string => {
    return methodType.replace("_ERC20", "").replace("_TRC20", "");
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "successful":
      case "completed":
        return "bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400";
      case "failed":
        return "bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400";
      default:
        return "bg-yellow-100 dark:bg-yellow-500/20 text-yellow-600 dark:text-yellow-400";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-[#0A1628] dark:bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 transition-colors">
      <DashboardNavbar />
      <div className="max-w-4xl mx-auto py-20">
        {/* Page Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-100 dark:text-slate-900 mb-4">
          Withdrawal
        </h1>

        {/* Instructions */}
        <div className="mb-8 text-slate-300 dark:text-slate-600 text-sm sm:text-base space-y-1">
          <p>
            Select your preferred cryptocurrency withdrawal method from the
            dropdown below.
          </p>
          <p>
            Enter the amount you wish to withdraw in USD. Your saved wallet
            address will be automatically filled.
          </p>
          <p>
            Review all details carefully before confirming. Withdrawals are
            processed within 24-48 hours.
          </p>
          <p>
            Ensure your withdrawal address is correct as transactions cannot be
            reversed.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-[#1E293B] dark:bg-white rounded-2xl shadow-lg border border-slate-700 dark:border-slate-200 p-6 sm:p-8 transition-colors">
          {/* Choose Method Heading */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-100 dark:text-slate-900 mb-2">
              Choose method of payment
            </h2>
            <p className="text-sm text-slate-400 dark:text-slate-500 mb-1">
              Wallet Balance
            </p>
            <p className="text-4xl font-bold text-slate-100 dark:text-slate-900">
              {profile ? profile.formatted_balance : "$0.00"}
            </p>
          </div>

          <hr className="border-slate-700 dark:border-slate-200 mb-6" />

          {/* Withdrawal Method Dropdown */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-300 dark:text-slate-700 mb-2">
              Choose Withdrawal Method:
            </label>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`w-full px-4 py-3 sm:py-4 rounded-lg text-left flex items-center justify-between transition-all ${
                  isDropdownOpen
                    ? "bg-[#2D3B4E] dark:bg-slate-100 border-2 border-orange-500"
                    : "bg-[#2D3B4E] dark:bg-slate-100 border border-slate-600 dark:border-slate-300"
                } ${
                  selectedMethod
                    ? "text-slate-100 dark:text-slate-900"
                    : "text-slate-400 dark:text-slate-500"
                }`}
              >
                <span>
                  {selectedMethod
                    ? getDisplayName(selectedMethod)
                    : "Select method"}
                </span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-2 bg-[#2D3B4E] dark:bg-slate-100 border border-slate-600 dark:border-slate-300 rounded-lg shadow-lg overflow-hidden">
                  {/* Header */}
                  <div className="px-4 py-2 bg-blue-500 dark:bg-blue-400 text-white dark:text-slate-900 font-medium">
                    Select method
                  </div>

                  {/* Options */}
                  <div className="max-h-60 overflow-y-auto">
                    {methods.length === 0 ? (
                      <div className="px-4 py-3 text-sm text-slate-400 dark:text-slate-500">
                        No payment methods available. Please add a method in
                        settings.
                      </div>
                    ) : (
                      methods.map((method) => (
                        <button
                          key={method.id}
                          onClick={() => handleMethodSelect(method.method_type)}
                          className="w-full px-4 py-3 text-left text-slate-100 dark:text-slate-900 hover:bg-slate-700 dark:hover:bg-slate-200 transition-colors"
                        >
                          {method.display_name}
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* No methods warning */}
            {methods.length === 0 && !loading && (
              <div className="mt-3 p-3 bg-yellow-900/20 dark:bg-yellow-50 border border-yellow-800 dark:border-yellow-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-400 dark:text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-yellow-200 dark:text-yellow-800">
                    <p className="font-medium mb-1">
                      No withdrawal methods set up
                    </p>
                    <p>
                      Please add a withdrawal method in your{" "}
                      <button
                        onClick={() => router.push("/settings")}
                        className="underline hover:no-underline"
                      >
                        settings
                      </button>{" "}
                      before making a withdrawal.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Amount Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-300 dark:text-slate-700 mb-2">
              Amount (USD):
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              min="0"
              step="0.01"
              className="w-full px-4 py-3 sm:py-4 bg-[#2D3B4E] dark:bg-slate-100 border border-slate-600 dark:border-slate-300 rounded-lg text-slate-100 dark:text-slate-900 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
            {profile && parseFloat(amount) > parseFloat(profile.balance) && (
              <p className="mt-2 text-sm text-red-400 dark:text-red-500">
                Amount exceeds your balance of {profile.formatted_balance}
              </p>
            )}
          </div>

          {/* Withdrawal Address (only show when method is selected) */}
          {selectedMethod && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-300 dark:text-slate-700 mb-2">
                Withdrawal Address:
              </label>
              <input
                type="text"
                value={withdrawalAddress}
                readOnly
                className="w-full px-4 py-3 sm:py-4 bg-[#2D3B4E] dark:bg-slate-100 border border-slate-600 dark:border-slate-300 rounded-lg text-slate-100 dark:text-slate-900 focus:outline-none cursor-not-allowed opacity-75"
              />
              <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
                This is your saved withdrawal address for{" "}
                {getDisplayName(selectedMethod)}. To change it, update your
                payment method in settings.
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-900/20 dark:bg-red-50 border border-red-800 dark:border-red-200 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-400 dark:text-red-500 flex-shrink-0" />
                <p className="text-sm text-red-300 dark:text-red-700">
                  {error}
                </p>
              </div>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-900/20 dark:bg-green-50 border border-green-800 dark:border-green-200 rounded-lg">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-400 dark:text-green-500 flex-shrink-0" />
                <p className="text-sm text-green-300 dark:text-green-700">
                  {success}
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 border-t border-slate-700 dark:border-slate-200">
            <button
              onClick={handleClose}
              disabled={loading}
              className="flex-1 px-6 py-3 sm:py-4 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white rounded-lg font-medium transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Close
            </button>
            <button
              onClick={handleConfirmWithdrawal}
              disabled={
                loading || !selectedMethod || !amount || !withdrawalAddress
              }
              className="flex-1 px-6 py-3 sm:py-4 bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 text-white rounded-lg font-medium transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : "Confirm Withdrawal"}
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-6 p-4 bg-blue-900/20 dark:bg-blue-50 border border-blue-800 dark:border-blue-200 rounded-lg">
            <p className="text-xs text-blue-200 dark:text-blue-800">
              <strong>Note:</strong> Withdrawals are processed within 24-48
              hours. You will receive a notification once your withdrawal has
              been approved and processed.
            </p>
          </div>
        </div>

        {/* Latest Withdrawals Table */}
        <div className="bg-[#1E293B] dark:bg-white mt-10 border border-slate-700 dark:border-slate-200 rounded-2xl p-6 sm:p-8 shadow-lg">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100 dark:text-slate-900 mb-6 sm:mb-8">
            Latest Withdrawals
          </h2>

          {transactions.length === 0 ? (
            <div className="text-center py-12">
              <Info className="w-12 h-12 text-slate-500 dark:text-slate-400 mx-auto mb-4" />
              <p className="text-slate-400 dark:text-slate-600">
                No withdrawal transactions yet
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700 dark:border-slate-200">
                      <th className="text-left py-4 px-4 text-sm font-semibold text-slate-400 dark:text-slate-600 uppercase tracking-wider">
                        Reference
                      </th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-slate-400 dark:text-slate-600 uppercase tracking-wider">
                        Date/Time
                      </th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-slate-400 dark:text-slate-600 uppercase tracking-wider">
                        Currency
                      </th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-slate-400 dark:text-slate-600 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="text-left py-4 px-4 text-sm font-semibold text-slate-400 dark:text-slate-600 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr
                        key={transaction.id}
                        className="border-b border-slate-800 dark:border-slate-100 hover:bg-slate-800/50 dark:hover:bg-slate-50 transition-colors"
                      >
                        <td className="py-5 px-4 text-sm text-slate-300 dark:text-slate-700 font-medium">
                          {transaction.reference}
                        </td>
                        <td className="py-5 px-4 text-sm text-slate-300 dark:text-slate-700">
                          {formatDate(transaction.created_at)}
                        </td>
                        <td className="py-5 px-4">
                          <span className="inline-block px-3 py-1 bg-slate-700/40 dark:bg-slate-200 text-slate-200 dark:text-slate-700 rounded-md text-sm font-medium">
                            {transaction.currency}
                          </span>
                        </td>
                        <td className="py-5 px-4 text-sm font-semibold text-red-400 dark:text-red-600">
                          -${parseFloat(transaction.amount).toFixed(2)}
                        </td>
                        <td className="py-5 px-4">
                          <span
                            className={`inline-block px-3 py-1 rounded-md text-sm font-medium ${getStatusColor(
                              transaction.status
                            )}`}
                          >
                            {transaction.status_display}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile/Tablet Card View */}
              <div className="lg:hidden space-y-4">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="bg-slate-900/40 dark:bg-slate-50 border border-slate-700/40 dark:border-slate-200 rounded-xl p-4 space-y-3"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs text-slate-400 dark:text-slate-600 uppercase tracking-wider mb-1">
                          Reference
                        </p>
                        <p className="text-sm font-medium text-slate-200 dark:text-slate-800">
                          {transaction.reference}
                        </p>
                      </div>
                      <span
                        className={`inline-block px-3 py-1 rounded-md text-xs font-medium ${getStatusColor(
                          transaction.status
                        )}`}
                      >
                        {transaction.status_display}
                      </span>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400 dark:text-slate-600 uppercase tracking-wider mb-1">
                        Date/Time
                      </p>
                      <p className="text-sm text-slate-300 dark:text-slate-700">
                        {formatDate(transaction.created_at)}
                      </p>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-slate-700/20 dark:border-slate-200">
                      <div>
                        <p className="text-xs text-slate-400 dark:text-slate-600 uppercase tracking-wider mb-1">
                          Currency
                        </p>
                        <span className="inline-block px-3 py-1 bg-slate-700/40 dark:bg-slate-200 text-slate-200 dark:text-slate-700 rounded-md text-sm font-medium">
                          {transaction.currency}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-400 dark:text-slate-600 uppercase tracking-wider mb-1">
                          Amount
                        </p>
                        <p className="text-lg font-bold text-red-400 dark:text-red-600">
                          -${parseFloat(transaction.amount).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
