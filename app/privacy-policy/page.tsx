"use client"

import { useEffect } from "react"
import { ShieldCheck, ArrowLeft, Lock, Eye, FileText, Users, Cookie, Mail } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function PrivacyPolicyPage() {
  const router = useRouter()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const sections = [
    {
      icon: <Eye className="h-5 w-5" />,
      title: "Information We Collect",
      content: [
        "Table number (to associate orders)",
        "Selected food items and quantities",
        "Device/browser details for service optimization",
      ],
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "How We Use Your Information",
      content:
        "Your data is used solely to process and manage your food order. We do not share your personal data with third parties except as required by law.",
    },
    {
      icon: <Lock className="h-5 w-5" />,
      title: "Data Security",
      content:
        "We implement appropriate technical and organizational measures to protect your information from unauthorized access and misuse.",
    },
    {
      icon: <Cookie className="h-5 w-5" />,
      title: "Cookies",
      content:
        "We may use cookies to enhance your browsing experience. You can choose to disable cookies in your browser settings.",
    },
    {
      icon: <FileText className="h-5 w-5" />,
      title: "Changes to This Policy",
      content: "We may update this Privacy Policy from time to time. Changes will be reflected on this page.",
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Contact Us",
      content: "If you have any questions about this policy, please contact our staff or management.",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-green-900/20 to-slate-900"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_50%)]"></div>

      {/* Header */}
      <header className="sticky top-0 z-20 bg-slate-800/80 backdrop-blur-xl border-b border-slate-700">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-green-400 to-emerald-400 flex items-center justify-center shadow-lg">
                <Image
                  src="/placeholder.svg?height=24&width=24"
                  alt="Logo"
                  width={24}
                  height={24}
                  className="rounded-md"
                />
              </div>
              <h1 className="text-xl font-bold text-white">Privacy Policy</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 md:py-16 relative z-10">
        <div className="w-full max-w-4xl mx-auto">
          {/* Hero Section */}
          <Card className="border border-slate-800 bg-slate-800/50 backdrop-blur-xl shadow-2xl mb-8">
            <CardHeader className="text-center pb-8 pt-8">
              <div className="mx-auto mb-6 relative">
                <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-400 flex items-center justify-center shadow-lg shadow-green-500/25">
                  <ShieldCheck className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 h-6 w-6 bg-green-400 rounded-full flex items-center justify-center">
                  <Lock className="h-4 w-4 text-white" />
                </div>
              </div>
              <CardTitle className="text-3xl md:text-4xl font-bold text-white mb-4">
                Our Commitment to Privacy
              </CardTitle>
              <CardDescription className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">
                We value your privacy and are committed to protecting your personal information. This Privacy Policy
                outlines how we collect, use, and safeguard your data when you use our food ordering service.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Content Sections */}
          <div className="space-y-6">
            {sections.map((section, index) => (
              <Card
                key={index}
                className="border border-slate-800 bg-slate-800/30 backdrop-blur-xl shadow-lg hover:bg-slate-800/40 transition-all duration-200"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 flex items-center justify-center text-green-400">
                      {section.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl text-white mb-3 flex items-center gap-2">
                        {index + 1}. {section.title}
                      </h3>
                      {Array.isArray(section.content) ? (
                        <ul className="space-y-2 text-slate-300">
                          {section.content.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start gap-2">
                              <div className="h-1.5 w-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-slate-300 leading-relaxed">{section.content}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Footer */}
          <Card className="border border-slate-800 bg-slate-800/30 backdrop-blur-xl shadow-lg mt-8">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <ShieldCheck className="h-5 w-5 text-green-400" />
                <span className="text-slate-300 font-medium">Your privacy is protected</span>
              </div>
              <div className="text-sm text-slate-500 border-t border-slate-700 pt-4">
                © {new Date().getFullYear()} JiffyMenu. All rights reserved.
              </div>
            </CardContent>
          </Card>

          {/* Security Badge */}
          <div className="mt-6 flex items-center justify-center gap-2 text-slate-500 text-xs">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>This policy is regularly updated to ensure your privacy protection</span>
          </div>
        </div>
      </main>
    </div>
  )
}
