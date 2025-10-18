"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export type Trader = {
  id: number;
  name: string;
  country: string;
  avatar: string;
  gain: number;
  risk: number;
  capital: string;
  copiers: number;
  avgTradeTime: string;
  trades: number;
};

// ✅ COPY Button
function ActionButton({ id }: { id: number }) {
  const router = useRouter();
  return (
    <Button
      size="sm"
      className="bg-teal-600 dark:bg-teal-500 rounded-none px-6 
                 hover:bg-teal-700 dark:hover:bg-teal-400 text-white 
                 transition-colors duration-300"
      onClick={() => router.push(`/social/${id}`)}
    >
      COPY
    </Button>
  );
}

export const columns: ColumnDef<Trader>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <span className="text-gray-800 dark:text-gray-100">Leader Name</span>
    ),
    cell: ({ row }) => {
      const trader = row.original;
      const avatarUrl =
        trader.avatar && trader.avatar.startsWith("http")
          ? trader.avatar
          : "/default-avatar.png";

      return (
        <div className="flex items-center gap-3">
          <Image
            src={avatarUrl}
            alt={trader.name}
            width={45}
            height={45}
            className="rounded-full h-10 w-10 object-cover border border-gray-200 dark:border-gray-700"
          />
          <span className="truncate max-w-[120px] md:max-w-none text-[16px] text-gray-900 dark:text-gray-100">
            {trader.name}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "country",
    header: () => (
      <span className="text-gray-800 dark:text-gray-100">Country</span>
    ),
    cell: ({ row }) => (
      <span className="text-gray-700 dark:text-gray-300">
        {row.original.country}
      </span>
    ),
  },
  {
    accessorKey: "gain",
    header: () => (
      <span className="text-gray-800 dark:text-gray-100">Gain</span>
    ),
    cell: ({ row }) => {
      const gain = row.original.gain;
      return (
        <span
          className={`font-bold ${
            gain >= 0
              ? "text-teal-600 dark:text-teal-400"
              : "text-red-600 dark:text-red-400"
          }`}
        >
          {gain}%
        </span>
      );
    },
  },
  {
    accessorKey: "risk",
    header: () => (
      <span className="text-gray-800 dark:text-gray-100">Risk</span>
    ),
    cell: ({ row }) => {
      const risk = row.original.risk;
      const isLowRisk = risk <= 3;

      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium border transition-colors duration-300 ${
            isLowRisk
              ? "bg-teal-100 text-teal-700 border-teal-300 dark:bg-teal-900/40 dark:text-teal-300 dark:border-teal-700"
              : "bg-red-100 text-red-700 border-red-300 dark:bg-red-900/40 dark:text-red-300 dark:border-red-700"
          }`}
        >
          {risk}
        </span>
      );
    },
  },
  {
    accessorKey: "capital",
    header: () => (
      <span className="text-gray-800 dark:text-gray-100">Capital</span>
    ),
    cell: ({ row }) => (
      <span className="text-gray-700 dark:text-gray-300">
        {row.original.capital}
      </span>
    ),
  },
  {
    accessorKey: "copiers",
    header: () => (
      <span className="text-gray-800 dark:text-gray-100">Copiers</span>
    ),
    cell: ({ row }) => (
      <span className="text-gray-700 dark:text-gray-300">
        {row.original.copiers}
      </span>
    ),
  },
  {
    accessorKey: "avgTradeTime",
    header: () => (
      <span className="text-gray-800 dark:text-gray-100">Avg. Trade Time</span>
    ),
    cell: ({ row }) => (
      <span className="text-gray-700 dark:text-gray-300">
        {row.original.avgTradeTime}
      </span>
    ),
  },
  {
    accessorKey: "trades",
    header: () => (
      <span className="text-gray-800 dark:text-gray-100">Trades</span>
    ),
    cell: ({ row }) => (
      <span className="text-gray-700 dark:text-gray-300">
        {row.original.trades}
      </span>
    ),
  },
  {
    id: "actions",
    header: () => (
      <span className="text-gray-800 dark:text-gray-100">Action</span>
    ),
    cell: ({ row }) => <ActionButton id={row.original.id} />,
  },
];
