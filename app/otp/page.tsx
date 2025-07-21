"use client"

import type React from "react"

import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Shield, Mail, KeyRound, ArrowLeft, CheckCircle } from "lucide-react"
import { ROUTES } from "../../lib/routes"

export default function VerifyPage() {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    email: "",
    otp: "",
  })

  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.post(ROUTES.OTP.LIST, form)
      toast.success("OTP Verified. Redirecting to login...")
      setTimeout(() => {
        router.push("/login")
      }, 1500)
    } catch (error: any) {
      const errorMsg = error?.response?.data?.detail || error?.message || "An unknown error occurred. Please try again."

      toast.error(errorMsg)
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
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center shadow-lg shadow-emerald-500/25">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 h-6 w-6 bg-emerald-400 rounded-full flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-white mb-2">Verify Your Email</CardTitle>
            <p className="text-slate-400 text-base leading-relaxed">
              We've sent a 6-digit verification code to your email address.
              <br />
              Please enter it below to continue.
            </p>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="email" className="text-sm font-semibold text-slate-300">
                  Email Address
                </Label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="pl-12 h-14 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-emerald-400 focus:ring-emerald-400/20 rounded-xl transition-all duration-200"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="otp" className="text-sm font-semibold text-slate-300">
                  Verification Code
                </Label>
                <div className="relative group">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                  <Input
                    id="otp"
                    name="otp"
                    placeholder="000000"
                    required
                    value={form.otp}
                    onChange={handleChange}
                    className="pl-12 h-14 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-emerald-400 focus:ring-emerald-400/20 rounded-xl text-center text-xl tracking-[0.5em] font-mono transition-all duration-200"
                    maxLength={6}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-14 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-200 text-base"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    <span>Verifying your code...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    <span>Verify & Continue</span>
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-700">
              <div className="text-center">
                <p className="text-slate-400 text-sm mb-3">Didn't receive the verification code?</p>
                <button className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium text-sm transition-colors duration-200 hover:underline underline-offset-4">
                  <Mail className="h-4 w-4" />
                  Resend Code
                </button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-slate-500">
                By verifying your email, you agree to our terms of service and privacy policy.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Security Badge */}
        <div className="mt-6 flex items-center justify-center gap-2 text-slate-500 text-xs">
          <Shield className="h-4 w-4" />
          <span>Your information is secure and encrypted</span>
        </div>
      </div>
    </div>
  )
}
