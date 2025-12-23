// store/useDepositStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DepositState {
  amount: number;
  setAmount: (value: number) => void;
}

export const useDepositStore = create<DepositState>()(
  persist(
    (set) => ({
      amount: 0, // default
      setAmount: (value) => set({ amount: value }),
    }),
    {
      name: "deposit-storage", // key in localStorage
    }
  )
);
