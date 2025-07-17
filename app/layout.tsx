import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from "react-hot-toast"

export const metadata: Metadata = {
  title: 'Jiffy-Menu',
  description: 'Order Your Food quickly and easily with JiffyMenu',
  generator: 'Hari Singh Joshi',
  authors: [{ name: 'Hari Singh Joshi', url: 'https://yourwebsite.com' }],
  keywords: ['food ordering', 'restaurant', 'online food', 'JiffyMenu', 'quick order', 'QR code menu'],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#4F46E5', // example purple color
  openGraph: {
    title: 'JiffyMenu - Order Your Food',
    description: 'Order Your Food quickly and easily with JiffyMenu',
    url: 'https://yourwebsite.com',
    siteName: 'JiffyMenu',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://yourwebsite.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'JiffyMenu preview image',
      },
    ],
  },
}

export default function RootLayout(
  {
    children,
  }: Readonly<{
    children: React.ReactNode
  }>
) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/icon.png" />
        {/* You can add more icons for different devices here */}
      </head>
      <body>
        <Toaster position="top-left" toastOptions={{ duration: 10000 }} />
        {children}
      </body>
    </html>
  )
}
