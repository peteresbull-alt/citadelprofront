"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function OrderPanel() {
  // Prices (dummy / snapshot)
  const bidPrice = 0.91083; // sell
  const askPrice = 0.91089; // buy
  const spread = Math.round((askPrice - bidPrice) / 0.0001); // in pips (approx)

  // UI state
  const [volume, setVolume] = useState<string>("1");
  const [stopEnabled, setStopEnabled] = useState<boolean>(true);
  const [tpEnabled, setTpEnabled] = useState<boolean>(true);
  const [openEnabled, setOpenEnabled] = useState<boolean>(true);

  // control values
  const [stopUnit, setStopUnit] = useState<"pips" | "price">("pips");
  const [tpUnit, setTpUnit] = useState<"pips" | "price">("pips");
  const [stopPips, setStopPips] = useState<number>(9);
  const [tpPips, setTpPips] = useState<number>(8);
  const [openPrice, setOpenPrice] = useState<number>(0.911);

  // assumptions / constants (dummy)
  const lotSize = Number(volume); // 1 => 1 lot
  const pipValuePerLot = 7.24; // $ per pip for 1 lot (dummy from screenshot)
  const requiredMarginPerLot = 659.63; // $ per lot (dummy)

  // derived
  const pipSize = 0.0001; // typical for AUDCAD
  const stopAmount =
    -Math.round(pipValuePerLot * stopPips * lotSize * 100) / 100;
  const tpAmount = Math.round(pipValuePerLot * tpPips * lotSize * 100) / 100;
  const requiredMargin = Math.round(requiredMarginPerLot * lotSize * 100) / 100;

  const stopRate = Number(
    (bidPrice - (stopUnit === "pips" ? stopPips * pipSize : 0)).toFixed(5)
  );
  const tpRate = Number(
    (askPrice + (tpUnit === "pips" ? tpPips * pipSize : 0)).toFixed(5)
  );

  const formatRate = (r: number) => r.toFixed(5);
  const formatMoney = (n: number) => {
    const sign = n < 0 ? "-" : "";
    return `${sign}$${Math.abs(n).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  // helpers
  const inc = (setter: (v: number) => void, value: number) => setter(value + 1);
  const dec = (setter: (v: number) => void, value: number) =>
    setter(Math.max(0, value - 1));

  return (
    <aside className="w-72 border-l bg-white p-3 flex flex-col gap-3 text-xs">
      {/* Buy / Sell row */}
      <div className="flex items-center gap-2">
        <Button
          className="flex-1 rounded-none border-[#00B074] group hover:bg-[#00B074] cursor-pointer"
          variant={"outline"}
        >
          <div className="text-[11px] text-[#00B074] group-hover:text-white">
            Sell
          </div>
          <div className="text-sm font-semibold group-hover:text-white text-[#00B074]">
            {bidPrice.toFixed(5)}
          </div>
        </Button>

        {/* spread / center pill */}
        <div className="w-7 h-7 flex items-center justify-center rounded bg-white border border-gray-200 text-xs">
          {spread}
        </div>

        <Button
          className="rounded-none cursor-pointer flex-1"
          variant={"destructive"}
        >
          <div className="text-[11px]">Buy</div>
          <div className="text-sm font-semibold">{askPrice.toFixed(5)}</div>
        </Button>
      </div>

      {/* Volume in lot (dropdown) */}
      <div>
        <label className="text-[11px] text-gray-500">Volume in lot</label>
        <Select value={volume} onValueChange={(v) => setVolume(v)}>
          <SelectTrigger defaultValue={"1"} className="h-8 text-xs mt-1 w-full">
            <SelectValue placeholder="1" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0.1">0.1</SelectItem>
            <SelectItem value="0.2">0.2</SelectItem>
            <SelectItem value="0.3">0.3</SelectItem>
            <SelectItem value="0.4">0.4</SelectItem>
            <SelectItem value="0.5">0.5</SelectItem>
            <SelectItem value="0.6">0.6</SelectItem>
            <SelectItem value="0.7">0.7</SelectItem>
            <SelectItem value="0.8">0.8</SelectItem>
            <SelectItem value="0.9">0.9</SelectItem>
            <SelectItem value="1">1</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stop loss */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <div className="text-[11px] text-gray-500">Stop loss:</div>
            <div className="text-[13px] text-red-600 font-medium">
              {formatMoney(stopAmount)}
            </div>
          </div>
          <Switch
            checked={stopEnabled}
            onCheckedChange={(v) => setStopEnabled(Boolean(v))}
            className="h-5 w-9"
          />
        </div>

        {stopEnabled && (
          <div className="border border-gray-100 rounded-md p-2">
            <div className="flex items-center gap-2">
              <Select
                value={stopUnit}
                onValueChange={(v: "pips" | "price") => setStopUnit(v)}
              >
                <SelectTrigger className="h-8 text-xs flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pips">Pips</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center gap-2">
                <button
                  aria-label="decrement stop"
                  onClick={() => dec(setStopPips, stopPips)}
                  className="h-7 w-7 text-xs border rounded"
                >
                  −
                </button>
                <Input
                  value={String(stopPips)}
                  onChange={(e) =>
                    setStopPips(Math.max(0, Number(e.target.value || 0)))
                  }
                  className="h-7 w-16 text-center text-xs"
                />
                <button
                  aria-label="increment stop"
                  onClick={() => inc(setStopPips, stopPips)}
                  className="h-7 w-7 text-xs border rounded"
                >
                  +
                </button>
              </div>
            </div>

            <div className="text-[11px] text-gray-500 mt-2">
              Rate:{" "}
              <span className="font-medium text-gray-700">
                {formatRate(stopRate)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Take profit */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <div className="text-[11px] text-gray-500">Take profit:</div>
            <div className="text-[13px] text-[#00B074] font-medium">
              {formatMoney(tpAmount)}
            </div>
          </div>
          <Switch
            checked={tpEnabled}
            onCheckedChange={(v) => setTpEnabled(Boolean(v))}
            className="h-5 w-9"
          />
        </div>

        {tpEnabled && (
          <div className="border border-gray-100 rounded-md p-2">
            <div className="flex items-center gap-2">
              <Select
                value={tpUnit}
                onValueChange={(v: "pips" | "price") => setTpUnit(v)}
              >
                <SelectTrigger className="h-8 text-xs flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pips">Pips</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center gap-2">
                <button
                  aria-label="decrement tp"
                  onClick={() => dec(setTpPips, tpPips)}
                  className="h-7 w-7 text-xs border rounded"
                >
                  −
                </button>
                <Input
                  value={String(tpPips)}
                  onChange={(e) =>
                    setTpPips(Math.max(0, Number(e.target.value || 0)))
                  }
                  className="h-7 w-16 text-center text-xs"
                />
                <button
                  aria-label="increment tp"
                  onClick={() => inc(setTpPips, tpPips)}
                  className="h-7 w-7 text-xs border rounded"
                >
                  +
                </button>
              </div>
            </div>

            <div className="text-[11px] text-gray-500 mt-2">
              Rate:{" "}
              <span className="font-medium text-gray-700">
                {formatRate(tpRate)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Open order when price is */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <div className="text-[11px] text-gray-500">
            Open order when price is:
          </div>
          <Switch
            checked={openEnabled}
            onCheckedChange={(v) => setOpenEnabled(Boolean(v))}
            className="h-5 w-9"
          />
        </div>

        {openEnabled && (
          <div className="mt-1 flex items-center gap-2">
            <Input
              value={openPrice.toFixed(5)}
              onChange={(e) => setOpenPrice(Number(e.target.value || 0))}
              className="h-8 text-xs"
            />
            <div className="flex flex-col">
              <button
                onClick={() =>
                  setOpenPrice((p) => Number((p + pipSize).toFixed(5)))
                }
                className="h-7 w-7 text-xs border rounded"
              >
                +
              </button>
              <button
                onClick={() =>
                  setOpenPrice((p) =>
                    Number(Math.max(0, p - pipSize).toFixed(5))
                  )
                }
                className="h-7 w-7 text-xs border rounded mt-1"
              >
                −
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Order details */}
      <div className="border-t pt-2">
        <div className="text-xs text-gray-500 mb-2">Order details</div>

        <div className="flex justify-between text-[12px] mb-1">
          <div className="text-gray-600">AUDCAD</div>
          <div className="text-[#00B074] font-medium">Buy</div>
        </div>

        <div className="flex justify-between text-[12px]">
          <div className="text-gray-500">Volume in lot</div>
          <div className="text-gray-700">{lotSize}</div>
        </div>

        <div className="flex justify-between text-[12px]">
          <div className="text-gray-500">1 lot:</div>
          <div className="text-gray-700">100,000.00 AUD ($65,963.00)</div>
        </div>

        <div className="flex justify-between text-[12px]">
          <div className="text-gray-500">Pips Value:</div>
          <div className="text-gray-700">${pipValuePerLot.toFixed(2)}</div>
        </div>

        <div className="flex justify-between text-[12px]">
          <div className="text-gray-500">Required Margin:</div>
          <div className="text-gray-700">
            ${requiredMargin.toLocaleString()}
          </div>
        </div>

        <div className="flex justify-between text-[12px] mt-1">
          <div className="text-gray-500">Stop loss:</div>
          <div className="text-red-600">
            {formatMoney(stopAmount)} (pips {stopPips})
          </div>
        </div>

        <div className="flex justify-between text-[12px]">
          <div className="text-gray-500">Take profit:</div>
          <div className="text-[#00B074]">
            {formatMoney(tpAmount)} (pips {tpPips})
          </div>
        </div>
      </div>

      {/* Invest button */}
      <Button className="w-full h-9 mt-2 bg-primary/10 text-primary font-semibold">
        Invest
      </Button>
    </aside>
  );
}
