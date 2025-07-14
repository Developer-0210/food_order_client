import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from "react-hot-toast"
export const metadata: Metadata = {
  title: 'Food Order',
  description: 'Order Your Food',
  generator: 'Hari Singh Joshi',
}

export default function RootLayout(
  {
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
      <Toaster position="top-left" toastOptions={{ duration: 10000 }} />
        {children}</body>
    </html>
  )
}
