"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, MessageSquare, Globe, Users, Headphones, ArrowLeft, Shield } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ContactPage() {
  const router = useRouter()

  const contactMethods = [
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Phone Support",
      details: [
        { label: "Technical", value: "+91 74539 66532" },
        { label: "Management & General", value: "+91 82097 29074, +91 76682 34187" },
      ],
      availability: "Monday - Friday, 9AM - 6PM IST",
      color: "blue",
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email Support",
      details: [
        { label: "Technical", value: "joshiharish942@gmail.com" },
        { label: "General & Other", value: "jiffymenu@gmail.com" },
      ],
      availability: "Response within 24 hours",
      color: "green",
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Office Address",
      details: [{ label: "", value: "Suddhowala,\nDehradun\nIndia" }],
      availability: "",
      color: "purple",
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Business Hours",
      details: [
        { label: "Monday - Friday", value: "9:00 AM - 6:00 PM" },
        { label: "Saturday", value: "10:00 AM - 4:00 PM" },
        { label: "Sunday", value: "Closed" },
      ],
      availability: "",
      color: "cyan",
    },
  ]

  const supportChannels = [
    {
      icon: <MessageSquare className="h-5 w-5" />,
      title: "Live Chat",
      description: "Available 24/7 for urgent issues",
      action: "Click the chat icon in bottom right",
      color: "green",
    },
    {
      icon: <Globe className="h-5 w-5" />,
      title: "Help Center",
      description: "Comprehensive guides and tutorials",
      action: "help.qrrestaurant.com",
      color: "purple",
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Community Forum",
      description: "Connect with other restaurant owners",
      action: "community.qrrestaurant.com",
      color: "blue",
    },
  ]

  const departments = [
    {
      title: "Sales Team",
      icon: <Mail className="h-8 w-8" />,
      description: "New customer inquiries",
      contact: "sales@qrrestaurant.com",
      response: "Response within 2 hours",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Technical Support",
      icon: <Headphones className="h-8 w-8" />,
      description: "System issues & bugs",
      contact: "joshiharish942@gmail.com",
      response: "24/7 support available",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "Billing Support",
      icon: <Phone className="h-8 w-8" />,
      description: "Payment & subscription help",
      contact: "billing@qrrestaurant.com",
      response: "Business hours only",
      gradient: "from-purple-500 to-violet-500",
    },
  ]

  const faqs = [
    {
      question: "How quickly can I set up QR ordering?",
      answer:
        "Most restaurants can be up and running within 24-48 hours after signup. Our team provides full setup assistance.",
    },
    {
      question: "Do you provide training for staff?",
      answer:
        "Yes, we offer comprehensive training sessions and ongoing support for your team through video calls and documentation.",
    },
    {
      question: "Can I customize the menu design?",
      answer:
        "Our system offers full customization to match your restaurant's branding, colors, and layout preferences.",
    },
    {
      question: "What payment methods are supported?",
      answer: "We support all major credit cards, digital wallets (Apple Pay, Google Pay), and local payment methods.",
    },
    {
      question: "Is there a setup fee?",
      answer:
        "No setup fees! We offer transparent monthly pricing with no hidden costs. Contact sales for pricing details.",
    },
    {
      question: "Can I try before I buy?",
      answer: "Yes, we offer a 14-day free trial with full access to all features. No credit card required to start.",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="text-sm">Back</span>
      </button>

      <div className="container mx-auto px-4 py-12 max-w-6xl relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="mx-auto mb-6 relative">
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/25 mx-auto">
              <MessageSquare className="h-10 w-10 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 h-6 w-6 bg-blue-400 rounded-full flex items-center justify-center">
              <Headphones className="h-4 w-4 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">
            Have questions about our QR code ordering system? Need support for your restaurant? Here's how you can reach
            us.
          </p>
        </div>

        {/* Main Contact Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Contact Information */}
          <Card className="border border-slate-800 bg-slate-800/50 backdrop-blur-xl shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-t-xl">
              <CardTitle className="flex items-center gap-3">
                <Phone className="h-5 w-5" />
                Get in Touch
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {contactMethods.map((method, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div
                    className={`flex-shrink-0 h-12 w-12 rounded-xl bg-gradient-to-br from-${method.color}-500/20 to-${method.color}-600/20 border border-${method.color}-500/30 flex items-center justify-center text-${method.color}-400`}
                  >
                    {method.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-2">{method.title}</h3>
                    <div className="space-y-1">
                      {method.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-slate-300">
                          {detail.label && <span className="text-slate-400">{detail.label}: </span>}
                          <span className="whitespace-pre-line">{detail.value}</span>
                        </p>
                      ))}
                    </div>
                    {method.availability && <p className="text-sm text-slate-500 mt-2">{method.availability}</p>}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Support Channels */}
          <Card className="border border-slate-800 bg-slate-800/50 backdrop-blur-xl shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-xl">
              <CardTitle className="flex items-center gap-3">
                <Headphones className="h-5 w-5" />
                Support Channels
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {supportChannels.map((channel, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div
                    className={`flex-shrink-0 h-12 w-12 rounded-xl bg-gradient-to-br from-${channel.color}-500/20 to-${channel.color}-600/20 border border-${channel.color}-500/30 flex items-center justify-center text-${channel.color}-400`}
                  >
                    {channel.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">{channel.title}</h3>
                    <p className="text-slate-300 mb-1">{channel.description}</p>
                    <p className="text-sm text-blue-400 font-medium">{channel.action}</p>
                  </div>
                </div>
              ))}

              <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl">
                <h4 className="font-semibold text-blue-400 mb-2">Emergency Support</h4>
                <p className="text-slate-300 text-sm">
                  For critical system issues during business hours, call our emergency line:
                  <span className="font-semibold text-blue-400"> +1 (555) 911-HELP</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Department Contacts */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {departments.map((dept, index) => (
            <Card
              key={index}
              className="border border-slate-800 bg-slate-800/30 backdrop-blur-xl shadow-lg hover:bg-slate-800/40 transition-all duration-200"
            >
              <CardHeader className={`bg-gradient-to-r ${dept.gradient} text-white rounded-t-xl`}>
                <CardTitle className="text-center">{dept.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-6 text-center">
                <div className="text-blue-400 mx-auto mb-3">{dept.icon}</div>
                <p className="text-slate-300 mb-2">{dept.description}</p>
                <p className="font-semibold text-white mb-2">{dept.contact}</p>
                <p className="text-sm text-slate-500">{dept.response}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <Card className="border border-slate-800 bg-slate-800/50 backdrop-blur-xl shadow-2xl mb-12">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-violet-500 text-white rounded-t-xl">
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                {faqs.slice(0, 3).map((faq, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-6">
                {faqs.slice(3, 6).map((faq, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-white mb-2">{faq.question}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Office Hours */}
        <Card className="border border-slate-800 bg-slate-800/50 backdrop-blur-xl shadow-2xl max-w-2xl mx-auto">
          <CardContent className="p-8 text-center">
            <div className="mx-auto mb-6 relative">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/25 mx-auto">
                <Clock className="h-8 w-8 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">Need Immediate Help?</h3>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Our support team is available during business hours. For urgent issues outside business hours, use our
              live chat or emergency support line.
            </p>
            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 p-6 rounded-xl">
              <p className="text-slate-200 font-medium">
                We typically respond to all inquiries within 24 hours, but most are answered much faster!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Security Badge */}
        <div className="mt-8 flex items-center justify-center gap-2 text-slate-500 text-xs">
          <Shield className="h-4 w-4" />
          <span>All communications are secure and confidential</span>
        </div>
      </div>
    </div>
  )
}
