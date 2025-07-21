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
import Link from "next/link"
import { ROUTES } from "../../lib/routes"
import {
  UserPlus,
  Eye,
  EyeOff,
  User,
  Mail,
  Phone,
  Store,
  Lock,
  Sparkles,
  ArrowLeft,
  Shield,
  CheckCircle,
  Zap,
} from "lucide-react"

export default function RegisterPage() {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    restaurant_name: "",
    password: "",
    secret_key: "",
  })

  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.post(ROUTES.OTP.CREATE, form)
      toast.success("Signup successful. Redirecting...")
      setTimeout(() => {
        router.push("/otp")
      }, 1000)
    } catch (error: any) {
      toast.error(error?.response?.data?.detail || "Signup failed")
    } finally {
      setLoading(false)
    }
  }

  const isFormValid =
    form.name && form.email && form.contact && form.restaurant_name && form.password && form.secret_key

  const benefits = [
    {
      icon: <Store className="h-5 w-5" />,
      text: "Manage your restaurant operations",
      color: "text-purple-400",
    },
    {
      icon: <Zap className="h-5 w-5" />,
      text: "Track orders and customer interactions",
      color: "text-blue-400",
    },
    {
      icon: <Shield className="h-5 w-5" />,
      text: "Secure and reliable platform",
      color: "text-green-400",
    },
  ]

  const formFields = [
    {
      id: "name",
      label: "Full Name",
      type: "text",
      placeholder: "Enter your full name",
      icon: <User className="h-5 w-5" />,
      color: "blue",
    },
    {
      id: "email",
      label: "Email Address",
      type: "email",
      placeholder: "your.email@example.com",
      icon: <Mail className="h-5 w-5" />,
      color: "green",
    },
    {
      id: "contact",
      label: "Contact Number",
      type: "tel",
      placeholder: "Enter your contact number",
      icon: <Phone className="h-5 w-5" />,
      color: "orange",
    },
    {
      id: "restaurant_name",
      label: "Restaurant Name",
      type: "text",
      placeholder: "Enter your restaurant name",
      icon: <Store className="h-5 w-5" />,
      color: "purple",
    },
    {
      id: "secret_key",
      label: "Secret Key",
      type: "text",
      placeholder: "Enter the secret key provided",
      icon: <Sparkles className="h-5 w-5" />,
      color: "pink",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.1),transparent_50%)]"></div>

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="text-sm">Back</span>
      </button>

      <div className="w-full max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-center gap-12 p-4 py-12">
        {/* Left Section */}
        <div className="text-center lg:text-left lg:flex-1 max-w-lg">
          <div className="mx-auto lg:mx-0 mb-8 relative">
            <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-purple-400 to-violet-400 flex items-center justify-center shadow-lg shadow-purple-500/25">
              <UserPlus className="h-12 w-12 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 h-8 w-8 bg-purple-400 rounded-full flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">Join Us Today!</h1>
          <p className="text-slate-300 text-lg leading-relaxed mb-8">
            Create your restaurant management account and start managing your business efficiently with our powerful
            platform.
          </p>

          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-slate-800/50 border border-slate-700 flex items-center justify-center">
                  <span className={benefit.color}>{benefit.icon}</span>
                </div>
                <span className="text-slate-300">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section (Form) */}
        <div className="w-full max-w-lg">
          <Card className="border border-slate-800 bg-slate-800/50 backdrop-blur-xl shadow-2xl">
            <CardHeader className="text-center pb-6 pt-8">
              <div className="mx-auto mb-6 relative">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-400 to-violet-400 flex items-center justify-center shadow-lg shadow-purple-500/25">
                  <UserPlus className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 h-6 w-6 bg-purple-400 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-white mb-2">Create Account</CardTitle>
              <p className="text-slate-400">Join us as a restaurant owner</p>
            </CardHeader>

            <CardContent className="px-8 pb-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                {formFields.map((field) => (
                  <div key={field.id} className="space-y-2">
                    <Label htmlFor={field.id} className="text-sm font-semibold text-slate-300">
                      {field.label}
                    </Label>
                    <div className="relative group">
                      <span
                        className={`absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-${field.color}-400 transition-colors`}
                      >
                        {field.icon}
                      </span>
                      <Input
                        id={field.id}
                        name={field.id}
                        type={field.type}
                        value={form[field.id as keyof typeof form]}
                        onChange={handleChange}
                        required
                        placeholder={field.placeholder}
                        disabled={loading}
                        className={`pl-12 h-12 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-${field.color}-400 focus:ring-${field.color}-400/20 rounded-xl transition-all duration-200`}
                      />
                    </div>
                  </div>
                ))}

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-semibold text-slate-300">
                    Password
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-purple-400 transition-colors" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={handleChange}
                      required
                      placeholder="Create a strong password"
                      disabled={loading}
                      className="pl-12 pr-12 h-12 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-purple-400 transition-colors"
                      disabled={loading}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading || !isFormValid}
                  className="w-full h-14 bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-200 text-base mt-8"
                >
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      <span>Creating your account...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <UserPlus className="h-5 w-5" />
                      <span>Create Account</span>
                    </div>
                  )}
                </Button>
              </form>

              <div className="mt-8 pt-6 border-t border-slate-700">
                <div className="text-center">
                  <p className="text-slate-400 text-sm">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200 hover:underline underline-offset-4"
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-xs text-slate-500">
                  By creating an account, you agree to our terms of service and privacy policy.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Security Badge */}
          <div className="mt-6 flex items-center justify-center gap-2 text-slate-500 text-xs">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Secure registration with email verification</span>
          </div>
        </div>
      </div>
    </div>
  )
}
