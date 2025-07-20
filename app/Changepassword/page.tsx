"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import axios from "axios"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ROUTES } from "../../lib/routes"

export default function ResetPassword() {
  const [otp, setOtp] = useState("")
  const [password, setPassword] = useState("")
  const [secretKey, setSecretKey] = useState("")
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""
  const router = useRouter()

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const payload = {
        email,
        otp,
        password,
        secret_key: secretKey, // ✅ MUST be "secret_key", not "secretKey"
      }

      console.log("Sending payload:", payload) // ✅ Confirm keys

      const res = await axios.post(ROUTES.OTP.PASSCHANGE, payload)

      alert(res.data.message || "Password reset successfully.")
      router.push("/login")
    } catch (err: any) {
      console.error(err)
      alert(err.response?.data?.detail || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 border rounded-lg shadow-md space-y-4">
        <h2 className="text-xl font-semibold text-center">Reset Password</h2>

        <Input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <Input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Secret Key"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
        />

        <Button className="w-full" onClick={handleSubmit} disabled={loading}>
          {loading ? "Submitting..." : "Reset Password"}
        </Button>
      </div>
    </div>
  )
}
