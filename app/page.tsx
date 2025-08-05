"use client"

import { useLayoutEffect, useState } from "react"
import { useRouter } from "next/navigation"
import LoginPage from "./login/page"

export default function HomePage() {
  const router = useRouter()
  const [isChecking, setIsChecking] = useState(true)

  useLayoutEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      router.replace("/admin/profile") // or wherever your logged-in page is
    } else {
      setIsChecking(false)
    }
  }, [])

  if (isChecking) return null // prevent flicker

  return (
    <div className="min-h-screen bg-gray-50">
      <LoginPage />
    </div>
  )
}
