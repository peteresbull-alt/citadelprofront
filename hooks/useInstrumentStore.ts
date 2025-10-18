import { create } from "zustand";
import { persist } from "zustand/middleware";


export interface Instrument {
  symbol: string;
  flag?: string; // ✅ optional
  change: number;
  bid: number;
  ask: number;
  low: number;
  high: number;
  time: string;
}

interface InstrumentState {
  selectedInstrument: Instrument | null;
  setInstrument: (instrument: Instrument) => void;
}

export const useInstrumentStore = create<InstrumentState>()(
  persist(
    (set) => ({
      selectedInstrument: null,
      setInstrument: (instrument) => set({ selectedInstrument: instrument }),
    }),
    { name: "instrument-storage" } 
  )
);
