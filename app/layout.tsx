import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import { Analytics } from "@vercel/analytics/next";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/mode/theme-provider";

const poppins = Poppins({
  // pick the weights you need
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "CitadelMarketPro - Your Passport to Global Investment",
  description:
    "At CitadelMarketPro, our clients are at the heart of everything we do. \
    We are dedicated to providing a safe, transparent, and secure trading environment, \
    reinforced by robust government regulation under the FSCA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster
          position="top-right" // positions: top-left, top-center, bottom-right, etc.
          richColors // enables colored toasts
          theme="dark" // "light" | "dark" | "system"
          toastOptions={{
            style: {
              background: "#134E4A", // custom background color
              color: "#fff", // text color
              borderRadius: "10px",
              border: "1px solid #134E4A",
              fontSize: "14px",
            },
            className: "shadow-lg", // optional Tailwind class
          }}
        />
        <Analytics />
      </body>
    </html>
  );
}
