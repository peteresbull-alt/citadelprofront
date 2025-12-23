import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import { Analytics } from "@vercel/analytics/next";

import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/mode/theme-provider";
import Script from "next/script";

const poppins = Poppins({
  // pick the weights you need
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://citadelmarketspro.com"), // Replace with your actual domain
  title: {
    default: "CitadelMarketsPro - Your Goal to Global Investment",
    template: "%s | CitadelMarketsPro",
  },
  description:
    "Copy Stocks, Options & Contracts with Precision. The Premier Copy-Trading Hub for Options Traders. Start trading like experts with our advanced copy-trading platform.",
  keywords: [
    "copy trading",
    "options trading",
    "stock trading",
    "contract trading",
    "copy expert traders",
    "trading platform",
    "investment platform",
    "social trading",
    "automated trading",
    "forex trading",
    "cryptocurrency trading",
    "portfolio management",
    "trading signals",
    "financial markets",
    "trading experts",
    "mirror trading",
    "algorithmic trading",
  ],
  authors: [{ name: "CitadelMarketsPro" }],
  creator: "CitadelMarketsPro",
  publisher: "CitadelMarketsPro",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://citadelmarketspro.com",
    siteName: "CitadelMarketsPro",
    title: "CitadelMarketsPro - Your Goal to Global Investment",
    description:
      "Copy Stocks, Options & Contracts with Precision. The Premier Copy-Trading Hub for Options Traders",
    images: [
      {
        url: "https://www.citadelmarketspro.com/og-image.png", // Create this image (1200x630px recommended)
        width: 1200,
        height: 630,
        alt: "CitadelMarketsPro - Copy Trading Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CitadelMarketsPro - Your Goal to Global Investment",
    description:
      "Copy Stocks, Options & Contracts with Precision. The Premier Copy-Trading Hub for Options Traders",
    images: ["https://www.citadelmarketspro.com/twitter-image.png"], // Create this image (1200x600px recommended)
    creator: "@citadelmarketspro", // Replace with your actual Twitter handle
    site: "@citadelmarketspro", // Replace with your actual Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "https://www.citadelmarketspro.com/favicon.ico" },
      {
        url: "https://www.citadelmarketspro.com/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "https://www.citadelmarketspro.com/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "https://www.citadelmarketspro.com/apple-touch-icon.png",
        sizes: "180x180",
      },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
      },
    ],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://citadelmarketspro.com",
  },
  // verification: {
  //   google: "your-google-verification-code",
  // },
  category: "finance",
  other: {
    "msapplication-TileColor": "#134E4A",
    "theme-color": "#134E4A",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Additional SEO meta tags */}
        <meta name="application-name" content="CitadelMarketsPro" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="CitadelMarketsPro" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${poppins.variable} font-sans antialiased `}>
        <ThemeProvider
          disableTransitionOnChange
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          {children}
        </ThemeProvider>
        <Toaster
          position="top-right" // positions: top-left, top-center, bottom-right, etc.
          richColors // enables colored toasts
          theme="light" // "light" | "dark" | "system"
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

        {/* <LiveChat /> */}

        <Script
          src="//code.jivosite.com/widget/fekUvZsGiI"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
