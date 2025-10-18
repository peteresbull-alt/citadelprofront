"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft } from "lucide-react";
import { BACKEND_URL } from "@/lib/constants";
import { useDepositStore } from "@/hooks/useDepositStore";
import { useUserProfile } from "@/hooks/useUserProfile";

import { toast } from "sonner";

type Trader = {
  id: number;
  name: string;
  country: string;
  avatar: string;
  gain: number;
  risk: number;
  capital: string;
  copiers: number;
  avg_trade_time: string;
  trades: number;
};

export default function CopyTradePageDetail() {
  const { id } = useParams(); // get [id] from URL
  const router = useRouter();

  const { user } = useUserProfile();

  const [trader, setTrader] = useState<Trader | null>(null);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState(1000);

  const setGlobalAmount = useDepositStore((state) => state.setAmount); // ✅

  // Fetch trader detail when component mounts
  useEffect(() => {
    if (!id) return;

    const fetchTrader = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/traders/${id}/`);
        if (!res.ok) throw new Error("Failed to fetch trader");
        const data = await res.json();
        setTrader(data);
      } catch (error) {
        console.error("Error fetching trader:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrader();
  }, [id]);

  const handleIncrease = () => setAmount(amount + 50);
  const handleDecrease = () => amount > 50 && setAmount(amount - 50);

  const handleDeposit = () => {
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
    setGlobalAmount(amount); // ✅ Save to global state
    router.push("/social/deposit"); // Navigate
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        Loading...
      </div>
    );
  }

  if (!trader) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        Trader not found
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0B2537] text-white font-sans">
      {/* Header */}
      <div className="flex items-center px-4 py-3 border-b border-teal-900 bg-teal-900">
        <button onClick={() => router.back()} className="mr-3">
          <ArrowLeft className="w-6 h-6 lg:w-7 lg:h-7" />
        </button>
        <h1 className="text-lg lg:text-2xl font-semibold">Start copy</h1>
      </div>

      {/* Trader Info */}
      <div className="flex flex-col items-center px-4 py-6 text-center">
        <h2 className="text-xl lg:text-3xl font-semibold text-green-500">
          {trader.name}
        </h2>
        <p className="text-green-400 mt-1 text-sm lg:text-lg">
          {trader.gain} % Gain
        </p>
        <p className="text-gray-400 text-xs lg:text-sm mt-1">
          Country: {trader.country}
        </p>
      </div>

      {/* Amount Input */}
      <div className="flex justify-center items-center bg-[#1B3B52] rounded-md mx-4 lg:mx-20 p-4 lg:p-6 space-x-4">
        <button
          onClick={handleDecrease}
          className="text-white text-2xl lg:text-4xl font-bold px-3 py-1"
        >
          -
        </button>
        <div className="flex flex-col items-center">
          <p className="text-gray-300 text-xs lg:text-sm">Amount</p>
          <Input
            type="text"
            readOnly
            value={`$${amount}`}
            className="text-center text-lg md:text-2xl font-semibold bg-transparent border-none focus-visible:ring-0 text-white w-24 lg:w-36"
          />
        </div>
        <button
          onClick={handleIncrease}
          className="text-white text-2xl lg:text-4xl font-bold px-3 py-1"
        >
          +
        </button>
      </div>

      <p className="text-center text-xs lg:text-sm text-gray-300 mt-2">
        Capital: <span className="font-medium">{trader.capital}</span>
      </p>

      {/* Stop Copying Rule */}
      <div className="flex justify-between items-center mx-4 lg:mx-20 mt-6">
        <p className="text-sm lg:text-lg text-white">
          Stop copying if copy amount drops below{" "}
          <span className="font-medium">65%</span>
        </p>
      </div>

      {/* Copy open trades */}
      <div className="flex items-start space-x-3 mx-4 lg:mx-20 mt-4">
        <Checkbox id="copy-trades" className="mt-1" />
        <div className="flex flex-col">
          <label
            htmlFor="copy-trades"
            className="text-sm lg:text-lg text-white"
          >
            Copy open trades
          </label>
          <p className="text-xs lg:text-sm text-gray-400">
            Open trades will be copied from the Leader under the current market
            conditions and rates of the assets.
          </p>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1"></div>

      {/* Deposit Button */}
      <div className="px-4 lg:px-20 pb-6 mb-20 mt-5">
        <Button
          onClick={handleDeposit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white lg:py-4 rounded-none py-5 text-base lg:text-lg"
        >
          Deposit
        </Button>
      </div>
    </div>
  );
}
