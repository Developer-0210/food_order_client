"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "sonner"
import { ROUTES } from "../../lib/routes"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, KeyRound, Lock, Eye, EyeOff, ArrowLeft, Shield, Key } from "lucide-react"

export default function ChangePasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [secretKey, setSecretKey] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !otp || !password || !confirmPassword || !secretKey) {
      return toast.error("Please fill all fields")
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match")
    }

    try {
      setLoading(true)
      await axios.post(ROUTES.OTP.PASSCHANGE, {
        email,
        otp,
        password,
        secret_key: secretKey,
      })
      toast.success("Password updated successfully")
      router.push("/login")
    } catch (err: any) {
      console.error(err)
      toast.error(err.response?.data?.detail || "Failed to update password")
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
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-violet-400 to-purple-400 flex items-center justify-center shadow-lg shadow-violet-500/25">
                <Lock className="h-10 w-10 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 h-6 w-6 bg-violet-400 rounded-full flex items-center justify-center">
                <Key className="h-4 w-4 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-white mb-2">Create New Password</CardTitle>
            <p className="text-slate-400 text-base leading-relaxed">
              Almost there! Enter your verification details
              <br />
              and create a strong new password.
            </p>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-slate-300">
                  Email Address
                </Label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-violet-400 transition-colors" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-12 h-12 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-violet-400 focus:ring-violet-400/20 rounded-xl transition-all duration-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="otp" className="text-sm font-semibold text-slate-300">
                  Verification Code
                </Label>
                <div className="relative group">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-violet-400 transition-colors" />
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    className="pl-12 h-12 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-violet-400 focus:ring-violet-400/20 rounded-xl text-center tracking-widest font-mono transition-all duration-200"
                    maxLength={6}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold text-slate-300">
                  New Password
                </Label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-violet-400 transition-colors" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-12 pr-12 h-12 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-violet-400 focus:ring-violet-400/20 rounded-xl transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-violet-400 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-semibold text-slate-300">
                  Confirm Password
                </Label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-violet-400 transition-colors" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="pl-12 pr-12 h-12 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-violet-400 focus:ring-violet-400/20 rounded-xl transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-violet-400 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="secretKey" className="text-sm font-semibold text-slate-300">
                  Secret Key
                </Label>
                <div className="relative group">
                  <Shield className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-violet-400 transition-colors" />
                  <Input
                    id="secretKey"
                    type="text"
                    placeholder="Enter your secret key"
                    value={secretKey}
                    onChange={(e) => setSecretKey(e.target.value)}
                    required
                    className="pl-12 h-12 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-violet-400 focus:ring-violet-400/20 rounded-xl transition-all duration-200"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-14 bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-200 text-base mt-6"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    <span>Updating password...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    <span>Update Password</span>
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-slate-500">
                Make sure your password is at least 8 characters long and includes a mix of letters, numbers, and
                symbols.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Security Badge */}
        <div className="mt-6 flex items-center justify-center gap-2 text-slate-500 text-xs">
          <Shield className="h-4 w-4" />
          <span>Your new password will be encrypted and stored securely</span>
        </div>
      </div>
    </div>
  )
}
