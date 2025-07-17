import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, MessageSquare, Globe, Users, Headphones } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <MessageSquare className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about our QR code ordering system? Need support for your restaurant? Here's how you can reach us.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Contact Information */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-3">
                <Phone className="h-5 w-5" />
                Get in Touch
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Phone className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Phone Support</h3>
                  <p className="text-gray-600 text-lg">Technical: +91 74539 66532</p>
                  <p className="text-gray-600 text-lg">Management & General: +91 82097 29074, +91 76682 34187</p>
                  <p className="text-sm text-gray-500">Monday - Friday, 9AM - 6PM IST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Mail className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email Support</h3>
                  <p className="text-gray-600 text-lg">Technical: joshiharish942@gmail.com</p>
                  <p className="text-gray-600 text-lg">General & Other: jiffymenu@gmail.com</p>
                  <p className="text-sm text-gray-500">Response within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <MapPin className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Office Address</h3>
                  <p className="text-gray-600">
                    Suddhowala,<br />
                    Dehradun<br />
                    India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Business Hours</h3>
                  <div className="text-gray-600 space-y-1">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 4:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Support Channels */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-3">
                <Headphones className="h-5 w-5" />
                Support Channels
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <MessageSquare className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Live Chat</h3>
                  <p className="text-gray-600">Available 24/7 for urgent issues</p>
                  <p className="text-sm text-blue-600 font-medium">Click the chat icon in bottom right</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Globe className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Help Center</h3>
                  <p className="text-gray-600">Comprehensive guides and tutorials</p>
                  <p className="text-sm text-blue-600 font-medium">help.qrrestaurant.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Community Forum</h3>
                  <p className="text-gray-600">Connect with other restaurant owners</p>
                  <p className="text-sm text-blue-600 font-medium">community.qrrestaurant.com</p>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">Emergency Support</h4>
                <p className="text-blue-800 text-sm">
                  For critical system issues during business hours, call our emergency line:
                  <span className="font-semibold"> +1 (555) 911-HELP</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Department Contacts */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-t-lg">
              <CardTitle className="text-center">Sales Team</CardTitle>
            </CardHeader>
            <CardContent className="p-6 text-center">
              <Mail className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <p className="text-gray-600 mb-2">New customer inquiries</p>
              <p className="font-semibold text-gray-900">sales@qrrestaurant.com</p>
              <p className="text-sm text-gray-500 mt-2">Response within 2 hours</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-500 to-purple-500 text-white rounded-t-lg">
              <CardTitle className="text-center">Technical Support</CardTitle>
            </CardHeader>
            <CardContent className="p-6 text-center">
              <Headphones className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <p className="text-gray-600 mb-2">System issues & bugs</p>
              <p className="font-semibold text-gray-900">joshiharish942@gmail.com</p>
              <p className="text-sm text-gray-500 mt-2">24/7 support available</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-t-lg">
              <CardTitle className="text-center">Billing Support</CardTitle>
            </CardHeader>
            <CardContent className="p-6 text-center">
              <Phone className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <p className="text-gray-600 mb-2">Payment & subscription help</p>
              <p className="font-semibold text-gray-900">billing@qrrestaurant.com</p>
              <p className="text-sm text-gray-500 mt-2">Business hours only</p>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">How quickly can I set up QR ordering?</h3>
                  <p className="text-gray-600 text-sm">
                    Most restaurants can be up and running within 24-48 hours after signup. Our team provides full setup
                    assistance.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Do you provide training for staff?</h3>
                  <p className="text-gray-600 text-sm">
                    Yes, we offer comprehensive training sessions and ongoing support for your team through video calls
                    and documentation.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Can I customize the menu design?</h3>
                  <p className="text-gray-600 text-sm">
                    Our system offers full customization to match your restaurant's branding, colors, and layout
                    preferences.
                  </p>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">What payment methods are supported?</h3>
                  <p className="text-gray-600 text-sm">
                    We support all major credit cards, digital wallets (Apple Pay, Google Pay), and local payment
                    methods.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Is there a setup fee?</h3>
                  <p className="text-gray-600 text-sm">
                    No setup fees! We offer transparent monthly pricing with no hidden costs. Contact sales for pricing
                    details.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Can I try before I buy?</h3>
                  <p className="text-gray-600 text-sm">
                    Yes, we offer a 14-day free trial with full access to all features. No credit card required to
                    start.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Office Hours */}
        <div className="mt-12 text-center">
          <Card className="border-0 shadow-lg max-w-2xl mx-auto">
            <CardContent className="p-6">
              <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Need Immediate Help?</h3>
              <p className="text-gray-600 mb-4">
                Our support team is available during business hours. For urgent issues outside business hours, use our
                live chat or emergency support line.
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                <p className="text-gray-700 font-medium">
                  We typically respond to all inquiries within 24 hours, but most are answered much faster!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
