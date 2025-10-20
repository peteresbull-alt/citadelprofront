"use client";

import { ArrowLeft, Copy, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BACKEND_URL } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { useUserProfile } from "@/hooks/useUserProfile";
import { toast } from "sonner";

interface AdminWallet {
  id: number;
  currency: string;
  wallet_address: string;
  qr_code_url?: string | null;
  amount?: string;
  is_active: boolean;
}

type DepositForm = {
  receipt: File | null;
};

// ✅ Dropzone component with dark mode
const DropzoneField = ({
  value,
  onChange,
  error,
}: {
  value: File | null;
  onChange: (file: File | null) => void;
  error?: string;
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [], "application/pdf": [] },
    multiple: false,
    onDrop: (acceptedFiles) => onChange(acceptedFiles[0]),
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`w-full border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition
          ${
            isDragActive
              ? "border-teal-600 bg-teal-50 dark:bg-teal-900/20"
              : "border-gray-300 dark:border-gray-600"
          }`}
      >
        <input {...getInputProps()} />
        {value ? (
          value.type.startsWith("image/") ? (
            <div className="flex flex-col items-center">
              <Image
                src={URL.createObjectURL(value)}
                alt="Receipt Preview"
                width={200}
                height={200}
                unoptimized
                className="max-h-48 rounded-lg shadow-md mb-2 object-contain"
              />
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {value.name}
              </p>
            </div>
          ) : (
            <p className="text-sm text-gray-800 dark:text-gray-200">
              Selected: <span className="font-medium">{value.name}</span>
            </p>
          )
        ) : (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Drag & drop receipt here, or click to upload
          </p>
        )}
      </div>
      {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
    </div>
  );
};

const DepositPage = () => {
  const router = useRouter();
  const [wallets, setWallets] = useState<AdminWallet[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<AdminWallet | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const { user } = useUserProfile();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DepositForm>({
    defaultValues: { receipt: null },
  });

  console.log(errors);

  // ✅ Fetch wallets
  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/admin-wallets/`);
        if (res.ok) {
          const data: AdminWallet[] = await res.json();
          setWallets(data);
        }
      } catch (err) {
        console.error("Error fetching wallets:", err);
      }
    };
    fetchWallets();
  }, []);

  const handleChoose = () => {
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
    if (selectedWallet && unit) setOpen(true);
  };

  const handleCopy = () => {
    if (selectedWallet) {
      navigator.clipboard.writeText(selectedWallet.wallet_address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const calculatedAmount =
    selectedWallet && unit
      ? (parseFloat(unit) * parseFloat(selectedWallet.amount || "0")).toString()
      : "";

  const onSubmit = async (data: DepositForm) => {
    if (!data.receipt || !selectedWallet || !unit) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("receipt", data.receipt);
    formData.append("currency", selectedWallet.currency);
    formData.append("unit", unit);
    formData.append("amount", calculatedAmount);

    try {
      const res = await fetch(`${BACKEND_URL}/deposits/`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Token ${localStorage.getItem("authToken")}`,
        },
      });

      if (!res.ok) throw new Error("Deposit failed");

      const result = await res.json();
      console.log("Deposit success:", result);

      reset();
      setUnit("");
      setOpen(false);

      toast("Transaction Successful.", {
        description:
          "Transaction made successfully. Your deposits are pending at the moment.",
      });
      router.push("/history");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 font-poppins transition-colors duration-300">
      {/* Header */}
      <div className="flex items-center bg-teal-900 dark:bg-teal-800 text-white px-4 py-3">
        <div
          onClick={() => router.back()}
          className="cursor-pointer hover:opacity-80 transition"
        >
          <ArrowLeft className="w-6 h-6 mr-3" />
        </div>
        <h1 className="text-lg font-semibold">Deposit</h1>
      </div>

      {/* Deposit form */}
      <div className="flex-1 px-6 py-8 max-w-xl mx-auto">
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-6">
          Please choose a payment method and enter the units you want to
          deposit. The total amount will be calculated automatically.
        </p>

        <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">
          Select Deposit Option
        </h2>

        <Select
          onValueChange={(value) => {
            const wallet = wallets.find((w) => w.currency === value) || null;
            setSelectedWallet(wallet);
          }}
        >
          <SelectTrigger className="w-full border p-2 py-3 rounded-none bg-transparent dark:border-gray-700 dark:text-gray-200 dark:bg-gray-900">
            <SelectValue placeholder="Select a currency" />
          </SelectTrigger>
          <SelectContent className="dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700">
            {wallets.map((wallet) => (
              <SelectItem key={wallet.id} value={wallet.currency}>
                {wallet.currency}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Unit Input */}
        <Input
          type="number"
          placeholder="Enter units (e.g. 2 BTC)"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="mt-4 border p-2 py-3 rounded-none dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
        />
        {unit === "" && (
          <p className="text-red-600 text-xs mt-1">
            Please enter the number of units.
          </p>
        )}

        {/* Calculated Amount */}
        <Input
          type="text"
          placeholder="Calculated amount in $"
          value={calculatedAmount}
          disabled
          className="mt-2 border p-2 py-3 rounded-none bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
        />

        <Button
          onClick={handleChoose}
          disabled={!selectedWallet || !unit}
          className="mt-6 w-full bg-teal-900 dark:bg-teal-700 text-white hover:bg-teal-800 dark:hover:bg-teal-600 py-3 rounded-none"
        >
          Choose
        </Button>
      </div>

      {/* Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[95%] sm:max-w-md mx-auto max-h-[90vh] overflow-y-auto dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-center text-lg sm:text-xl">
              Deposit {unit} {selectedWallet?.currency} (~{calculatedAmount})
            </DialogTitle>
          </DialogHeader>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center space-y-4"
          >
            <p className="text-gray-700 dark:text-gray-300 text-sm text-center px-4">
              Please send{" "}
              <span className="font-semibold">
                {unit} {selectedWallet?.currency}
              </span>{" "}
              (≈ {calculatedAmount}) to the wallet address below, then upload
              your receipt.
            </p>

            {/* QR Code */}
            {selectedWallet?.qr_code_url && (
              <Image
                src={selectedWallet.qr_code_url}
                alt="QR Code"
                width={200}
                height={200}
                className="rounded-lg border dark:border-gray-700 w-[150px] sm:w-[200px] h-auto"
              />
            )}

            {/* Wallet Address */}
            <div className="flex items-center w-full border rounded-lg px-3 py-2 dark:border-gray-700">
              <Input
                value={selectedWallet?.wallet_address}
                readOnly
                className="text-sm sm:text-base break-all truncate border-none bg-transparent focus-visible:ring-0 dark:text-gray-200"
              />
              <button
                type="button"
                onClick={handleCopy}
                className="ml-2 shrink-0"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-green-600 dark:text-green-500" />
                ) : (
                  <Copy className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                )}
              </button>
            </div>

            {/* Dropzone */}
            <Controller
              name="receipt"
              control={control}
              rules={{ required: "You must upload a receipt" }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <DropzoneField
                  value={value}
                  onChange={onChange}
                  error={error?.message}
                />
              )}
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-900 dark:bg-teal-700 text-white hover:bg-teal-800 dark:hover:bg-teal-600 py-3 rounded-none"
            >
              {loading ? "Submitting..." : "Submit Receipt"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DepositPage;
