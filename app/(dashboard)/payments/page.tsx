"use client";

import {
  ArrowLeft,
  CreditCard,
  Banknote,
  Wallet,
  DollarSign,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BACKEND_URL } from "@/lib/constants";
import { useUserProfile } from "@/hooks/useUserProfile";
import { toast } from "sonner";

interface Payment {
  id?: number;
  method_type: string;
  address?: string;
  bank_name?: string;
  bank_account_number?: string;
  cashapp_id?: string;
  paypal_email?: string;
  wallet_type?: string;
}

type PaymentFormData = Partial<Payment>;

const Payments = () => {
  const router = useRouter();
  const [method, setMethod] = useState<string>("");
  const [formData, setFormData] = useState<PaymentFormData>({});
  const [loading, setLoading] = useState(false);
  const [userPayments, setUserPayments] = useState<Payment[]>([]);
  const [loadingPayments, setLoadingPayments] = useState(true);

  const { user } = useUserProfile();

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/payments/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("authToken")}`,
          },
        });

        if (!res.ok)
          throw new Error(`Failed to fetch payments (${res.status})`);

        const data = await res.json();
        let payments: Payment[] = [];
        if (Array.isArray(data)) payments = data;
        else if (data && Array.isArray(data.payments)) payments = data.payments;

        setUserPayments(payments);
      } catch (err) {
        console.error("Error fetching payments:", err);
        setUserPayments([]);
      } finally {
        setLoadingPayments(false);
      }
    };
    fetchPayments();
  }, []);

  const handleChange = (field: keyof PaymentFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!user?.is_verified) {
      toast("KYC Verification", {
        description: "You must verify your KYC before performing this action.",
        action: {
          label: "Verify KYC",
          onClick: () => router.push("/account-verification"),
        },
      });
      return;
    }

    if (!method) {
      toast("Payment Method", {
        description: "Please select a payment method.",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/payments/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("authToken")}`,
        },
        body: JSON.stringify({
          method_type:
            method === "wallet"
              ? formData.wallet_type || "BTC"
              : method.toUpperCase(),
          ...formData,
        }),
      });

      if (!res.ok) throw new Error("Failed to save payment info");

      const refreshed: Payment = await res.json();
      setUserPayments((prev) => [...prev, refreshed]);
      setMethod("");
      setFormData({});
      toast("Saved", { description: "Payment info saved successfully!" });
    } catch (err) {
      console.error(err);
      toast("Error", { description: "Error saving payment info" });
    } finally {
      setLoading(false);
    }
  };

  const renderForm = () => {
    switch (method) {
      case "wallet":
        return (
          <div className="space-y-4">
            <Label>Wallet Address</Label>
            <Input
              className="py-3 rounded-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
              placeholder="Enter your crypto wallet address"
              onChange={(e) => handleChange("address", e.target.value)}
            />
            <Label>Wallet Type</Label>
            <Select
              onValueChange={(val) => handleChange("wallet_type", val)}
              defaultValue="BTC"
            >
              <SelectTrigger className="w-full py-3 rounded-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
                <SelectValue placeholder="Choose wallet" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-900 dark:text-gray-100">
                <SelectItem value="BTC">Bitcoin</SelectItem>
                <SelectItem value="ETH">Ethereum</SelectItem>
                <SelectItem value="SOL">Solana</SelectItem>
              </SelectContent>
            </Select>
          </div>
        );
      case "bank":
        return (
          <div className="space-y-4">
            <Label>Bank Name</Label>
            <Input
              className="py-3 rounded-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
              placeholder="Enter your bank name"
              onChange={(e) => handleChange("bank_name", e.target.value)}
            />
            <Label>Account Number</Label>
            <Input
              className="py-3 rounded-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
              placeholder="Enter your account number"
              onChange={(e) =>
                handleChange("bank_account_number", e.target.value)
              }
            />
          </div>
        );
      case "cashapp":
        return (
          <div className="space-y-4">
            <Label>Cash App ID</Label>
            <Input
              className="py-3 rounded-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
              placeholder="$YourCashAppID"
              onChange={(e) => handleChange("cashapp_id", e.target.value)}
            />
          </div>
        );
      case "paypal":
        return (
          <div className="space-y-4">
            <Label>PayPal Email</Label>
            <Input
              className="py-3 rounded-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
              type="email"
              placeholder="Enter your PayPal email"
              onChange={(e) => handleChange("paypal_email", e.target.value)}
            />
          </div>
        );
      default:
        return (
          <p className="text-gray-500 dark:text-gray-400">
            Select a payment method
          </p>
        );
    }
  };

  const renderIcon = (type: string) => {
    const base = "w-5 h-5";
    switch (type.toLowerCase()) {
      case "wallet":
      case "btc":
      case "eth":
      case "sol":
        return (
          <Wallet className={`${base} text-teal-700 dark:text-teal-400`} />
        );
      case "bank":
        return (
          <Banknote className={`${base} text-teal-700 dark:text-teal-400`} />
        );
      case "cashapp":
        return (
          <CreditCard className={`${base} text-teal-700 dark:text-teal-400`} />
        );
      case "paypal":
        return (
          <DollarSign className={`${base} text-teal-700 dark:text-teal-400`} />
        );
      default:
        return (
          <CreditCard className={`${base} text-gray-500 dark:text-gray-400`} />
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 font-poppins transition-colors duration-300">
      {/* Header */}
      <div className="flex items-center bg-teal-900 dark:bg-gray-800 text-white px-4 py-3 shadow-md">
        <div onClick={() => router.back()} className="cursor-pointer">
          <ArrowLeft className="w-6 h-6 mr-3" />
        </div>
        <h1 className="text-lg font-semibold">Payment Methods</h1>
      </div>

      {/* Current Saved Payments */}
      <div className="p-4">
        <h2 className="font-semibold text-lg mb-3 dark:text-gray-100">
          Your Preferred Payment Methods
        </h2>
        {loadingPayments ? (
          <p className="text-gray-500 dark:text-gray-400">Loading...</p>
        ) : userPayments.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            No saved payment methods
          </p>
        ) : (
          <div className="grid gap-3">
            {userPayments.map((p, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between border rounded-xl p-3 shadow-sm bg-gray-50 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <div className="flex items-center space-x-3">
                  {renderIcon(p.method_type)}
                  <div>
                    <p className="font-medium capitalize dark:text-gray-100">
                      {p.method_type.replace("_", " ")}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {p.address ||
                        p.bank_name ||
                        p.bank_account_number ||
                        p.cashapp_id ||
                        p.paypal_email}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center p-4 mb-20">
        <Card className="w-full max-w-md shadow-lg rounded-2xl border dark:border-gray-700 dark:bg-gray-800 transition-colors">
          <CardHeader>
            <CardTitle className="text-center dark:text-gray-100">
              Update Payment Info
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label>Select Payment Method</Label>
              <Select onValueChange={(value) => setMethod(value)}>
                <SelectTrigger className="w-full mt-2 py-3 rounded-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
                  <SelectValue placeholder="Choose a method" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-900 dark:text-gray-100">
                  <SelectItem value="wallet">
                    Crypto Wallet (BTC, ETH, SOL)
                  </SelectItem>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                  <SelectItem value="cashapp">Cash App</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {renderForm()}

            <Button
              className="w-full bg-teal-900 hover:bg-teal-800 dark:bg-teal-700 dark:hover:bg-teal-600 py-3 rounded-none transition-colors"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Payment Info"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Payments;
