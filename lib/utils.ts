import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFirstLetter(word?: string) {
  if (word) {
    return word[0];
  } else {
    return "";
  }
}

export const formatHighNumbersInCompact = (num?: number) => {
  if (!num) return 0;
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(num);
};



export function formatDate(dateString: string, locale: string = "en-US") {
  if (!dateString) return "";

  const date = new Date(dateString);

  // Example: "Sep 30, 2025, 3:03 PM"
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}