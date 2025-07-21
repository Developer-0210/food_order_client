"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Mail, ArrowLeft, KeyRound, Send, Lock } from "lucide-react"
import { ROUTES } from "../../lib/routes"

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return toast.error("Please enter your email")

    try {
      setLoading(true)
      await axios.post(ROUTES.OTP.PASSRQST, { email })
      toast.success("OTP sent to your email")
      router.push("/Changepassword")
    } catch (err: any) {
      toast.error(err.response?.data?.detail || "Failed to send OTP")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="text-sm">Back</span>
      </button>

      <div className="w-full max-w-lg relative z-10">
        <Card className="border border-slate-800 bg-slate-800/50 backdrop-blur-xl shadow-2xl">
          <CardHeader className="text-center pb-6 pt-8">
            <div className="mx-auto mb-6 relative">
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center shadow-lg shadow-orange-500/25">
                <Lock className="h-10 w-10 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 h-6 w-6 bg-orange-400 rounded-full flex items-center justify-center">
                <KeyRound className="h-4 w-4 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-white mb-2">Reset Password</CardTitle>
            <p className="text-slate-400 text-base leading-relaxed">
              Don not worry, it happens to the best of us.
              <br />
              Enter your email and we'll send you a reset code.
            </p>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="email" className="text-sm font-semibold text-slate-300">
                  Email Address
                </Label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-orange-400 transition-colors" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-12 h-14 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-orange-400 focus:ring-orange-400/20 rounded-xl transition-all duration-200"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  We'll send a 6-digit verification code to this email address.
                </p>
              </div>

              <Button
                type="submit"
                className="w-full h-14 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-xl shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-200 text-base"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    <span>Sending reset code...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="h-5 w-5" />
                    <span>Send Reset Code</span>
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-700">
              <div className="text-center">
                <p className="text-slate-400 text-sm mb-3">Remembered your password?</p>
                <button
                  onClick={() => router.push("/login")}
                  className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-medium text-sm transition-colors duration-200 hover:underline underline-offset-4"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Login
                </button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-slate-500">Having trouble? Contact our support team for assistance.</p>
            </div>
          </CardContent>
        </Card>

        {/* Security Badge */}
        <div className="mt-6 flex items-center justify-center gap-2 text-slate-500 text-xs">
          <Lock className="h-4 w-4" />
          <span>Your password reset request is secure and encrypted</span>
        </div>

        {/* Additional Help */}
        <div className="mt-4 text-center">
          <p className="text-slate-600 text-xs">Reset codes expire in 10 minutes for your security</p>
        </div>
      </div>
    </div>
  )
}
