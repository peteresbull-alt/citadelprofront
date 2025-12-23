"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Activity } from "lucide-react";
import DashboardNavbar from "@/components/main/DashboardNavbar";
import { BACKEND_URL } from "@/lib/constants";
import { PulseLoader } from "react-spinners";
import SignalCard from "./SignalCard";
import PurchasedSignalCard from "./PurchasedSignalCard";
import PurchaseModal from "./PurchaseModal";
import ConfirmModal from "./ConfirmModal";
import SuccessModal from "./SuccessModal";
import { PurchasedSignal, Signal } from "./signal-types";

export default function SignalsPage() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [loading, setLoading] = useState(true);
  const [userBalance, setUserBalance] = useState(0);
  const [selectedSignal, setSelectedSignal] = useState<Signal | null>(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "purchased">("all");
  const [purchasedSignals, setPurchasedSignals] = useState<PurchasedSignal[]>(
    []
  );

  // Fetch user balance
  const fetchUserBalance = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      const response = await fetch(`${BACKEND_URL}/withdrawals/profile/`, {
        headers: { Authorization: `Token ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setUserBalance(parseFloat(data?.user?.balance));
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  // Fetch signals
  const fetchSignals = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const headers: Record<string, string> = {};
      if (token) {
        headers.Authorization = `Token ${token}`;
      }

      const response = await fetch(`${BACKEND_URL}/signals/`, { headers });
      if (response.ok) {
        const data = await response.json();
        setSignals(data.signals);
      }
    } catch (error) {
      console.error("Error fetching signals:", error);
      toast.error("Failed to load signals");
    } finally {
      setLoading(false);
    }
  };

  // Fetch purchased signals
  const fetchPurchasedSignals = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      const response = await fetch(`${BACKEND_URL}/signals/my-purchases/`, {
        headers: { Authorization: `Token ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setPurchasedSignals(data.purchases);
      }
    } catch (error) {
      console.error("Error fetching purchased signals:", error);
    }
  };

  useEffect(() => {
    fetchSignals();
    fetchUserBalance();
    fetchPurchasedSignals();
  }, []);

  const handlePurchaseClick = (signal: Signal) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Please login to purchase signals");
      return;
    }

    if (signal.is_purchased) {
      toast.info("You already own this signal");
      return;
    }

    setSelectedSignal(signal);
    setShowPurchaseModal(true);
  };

  const onSubmitPurchase = (data: { amount: string }) => {
    if (!selectedSignal) return;

    const enteredAmount = parseFloat(data.amount);
    const signalPrice = parseFloat(selectedSignal.price);

    // Validation: amount must match signal price
    if (enteredAmount < signalPrice) {
      toast.error(
        `Please enter the exact signal amount of ${signalPrice.toFixed(2)}`
      );
      return;
    }

    if (enteredAmount > signalPrice * 1.01) {
      toast.error(
        `Amount cannot exceed ${signalPrice.toFixed(2)} by more than 1%`
      );
      return;
    }

    // Check balance
    if (userBalance < signalPrice) {
      toast.error(
        `Insufficient balance. You need ${signalPrice.toFixed(
          2
        )} but have ${userBalance.toFixed(2)}`
      );
      return;
    }

    // Show confirmation modal
    setShowPurchaseModal(false);
    setShowConfirmModal(true);
  };

  const confirmPurchase = async () => {
    if (!selectedSignal) return;

    setPurchasing(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${BACKEND_URL}/signals/purchase/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          signal_id: selectedSignal.id,
          amount: selectedSignal.price,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setUserBalance(parseFloat(data.new_balance));
        setShowConfirmModal(false);
        setShowSuccessModal(true);

        // Refresh signals and purchases
        fetchSignals();
        fetchPurchasedSignals();

        toast.success("Signal purchased successfully!");
      } else {
        toast.error(data.error || "Failed to purchase signal");
      }
    } catch (error) {
      console.error("Error purchasing signal:", error);
      toast.error("Failed to complete purchase");
    } finally {
      setPurchasing(false);
    }
  };

  const closeAllModals = () => {
    setShowPurchaseModal(false);
    setShowConfirmModal(false);
    setShowSuccessModal(false);
    setSelectedSignal(null);
  };

  return (
    <div className="min-h-screen bg-[#1a1f2e] dark:bg-gray-50 transition-colors pt-20">
      <DashboardNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white dark:text-gray-900 mb-2">
                Trading Signals
              </h1>
              <p className="text-gray-400 dark:text-gray-600">
                Professional trading signals from expert analysts
              </p>
            </div>

            {/* Balance Display */}
            <div className="bg-emerald-500/10 dark:bg-emerald-500/20 border-2 border-emerald-500 rounded-xl px-6 py-4">
              <div className="text-xs md:text-sm text-emerald-500 dark:text-emerald-600 mb-1">
                Wallet Balance
              </div>
              <div className="text-xl md:text-2xl font-bold text-white dark:text-gray-900">
                $
                {userBalance.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mt-6 text-sm md:text-base border-b border-gray-700 dark:border-gray-300">
            <button
              onClick={() => setActiveTab("all")}
              className={`pb-3 px-4 font-medium transition-colors relative ${
                activeTab === "all"
                  ? "text-emerald-500 dark:text-emerald-600"
                  : "text-gray-400 dark:text-gray-600 hover:text-gray-300 dark:hover:text-gray-700"
              }`}
            >
              All Signals
              {activeTab === "all" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 dark:bg-emerald-600" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("purchased")}
              className={`pb-3 px-4 font-medium transition-colors relative ${
                activeTab === "purchased"
                  ? "text-emerald-500 dark:text-emerald-600"
                  : "text-gray-400 dark:text-gray-600 hover:text-gray-300 dark:hover:text-gray-700"
              }`}
            >
              Purchased Signals
              {activeTab === "purchased" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 dark:bg-emerald-600" />
              )}
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <PulseLoader color="#10b981" size={15} />
          </div>
        )}

        {/* All Signals Grid */}
        {!loading && activeTab === "all" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {signals.map((signal) => (
              <SignalCard
                key={signal.id}
                signal={signal}
                onPurchaseClick={handlePurchaseClick}
              />
            ))}
          </div>
        )}

        {/* Purchased Signals */}
        {!loading && activeTab === "purchased" && (
          <div className="space-y-6">
            {purchasedSignals.length === 0 ? (
              <div className="text-center py-12">
                <Activity className="w-13 h-13 md:text-16 md:text-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400 dark:text-gray-600 text-sm">
                  You haven&apos;t purchased any signals yet
                </p>
              </div>
            ) : (
              purchasedSignals.map((purchase) => (
                <PurchasedSignalCard key={purchase.id} purchase={purchase} />
              ))
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      {showPurchaseModal && selectedSignal && (
        <PurchaseModal
          signal={selectedSignal}
          onSubmit={onSubmitPurchase}
          onClose={closeAllModals}
        />
      )}

      {showConfirmModal && selectedSignal && (
        <ConfirmModal
          signal={selectedSignal}
          userBalance={userBalance}
          purchasing={purchasing}
          onConfirm={confirmPurchase}
          onCancel={() => {
            setShowConfirmModal(false);
            setShowPurchaseModal(true);
          }}
        />
      )}

      {showSuccessModal && selectedSignal && (
        <SuccessModal signal={selectedSignal} onClose={closeAllModals} />
      )}
    </div>
  );
}
