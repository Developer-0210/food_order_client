"use client"

import type { Metadata } from "next"
import "./globals.css"
import { Toaster, toast } from "react-hot-toast"
import TokenRestore from "../components/TokenRestore"
import { X } from "lucide-react"

export const metadata: Metadata = {
  title: "JiffyMenu - Quick Food Ordering",
  description:
    "Order your food quickly, easily, and contactless with JiffyMenu. Perfect for restaurants and cafes.",
  generator: "Hari Singh Joshi",
  authors: [{ name: "Hari Singh Joshi", url: "https://www.jiffymenu.com/" }],
  keywords: [
    "food ordering",
    "restaurant menu",
    "online food order",
    "QR menu",
    "JiffyMenu",
    "contactless order",
    "digital menu",
    "fast food ordering",
  ],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#4F46E5",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "JiffyMenu - Order Food Instantly",
    description:
      "Experience contactless food ordering with QR menus using JiffyMenu.",
    url: "https://www.jiffymenu.com/",
    siteName: "JiffyMenu",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.jiffymenu.com/logo.png",
        width: 1200,
        height: 630,
        alt: "JiffyMenu preview image",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JiffyMenu - Order Food Instantly",
    description:
      "Experience contactless food ordering with QR menus using JiffyMenu.",
    site: "@jiffymenu",
    creator: "@harisinghjoshi",
    images: ["https://www.jiffymenu.com/logo.png"],
  },
  metadataBase: new URL("https://www.jiffymenu.com"),
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  category: "food",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="icon" href="/icon.png" />
      </head>
      <body>
        <TokenRestore />

        {/* Global Toaster */}
        <Toaster position="top-left" />

        {children}
      </body>
    </html>
  )
}

/**
 * Global toast helper
 * Usage:
 *   showToast("Message", "success")
 *   showToast("Something went wrong", "error")
 */
export function showToast(
  message: string,
  type: "success" | "error" | "info" = "success"
) {
  toast.custom((t) => (
    <div
      className={`flex items-center justify-between gap-4 px-4 py-3 rounded-lg shadow-md border
        ${type === "success" ? "bg-green-50 border-green-300 text-green-700" : ""}
        ${type === "error" ? "bg-red-50 border-red-300 text-red-700" : ""}
        ${type === "info" ? "bg-blue-50 border-blue-300 text-blue-700" : ""}`}
    >
      <span>{message}</span>
      <button
        onClick={() => toast.dismiss(t.id)}
        className="text-gray-500 hover:text-gray-800"
      >
        <X size={16} />
      </button>
    </div>
  ), { duration: Infinity })
}
