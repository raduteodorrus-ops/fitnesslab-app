"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, CreditCard, Check, Lock, Dumbbell } from "lucide-react"
import type { AppScreen, UserData } from "./fitness-lab-app"

interface PaymentScreenProps {
  onNavigate: (screen: AppScreen) => void
  userData: UserData
}

export function PaymentScreen({ onNavigate, userData }: PaymentScreenProps) {
  const [selectedMethod, setSelectedMethod] = useState<"apple" | "google" | "card" | null>(null)
  const [cardNumber, setCardNumber] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvc, setCvc] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    return parts.length ? parts.join(" ") : value
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsProcessing(false)
    onNavigate("dashboard")
  }

  const isFormValid = () => {
    if (selectedMethod === "apple" || selectedMethod === "google") return true
    return cardNumber.replace(/\s/g, "").length === 16 && expiry.length === 5 && cvc.length === 3
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black flex flex-col"
    >
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => onNavigate("onboarding")}
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm uppercase tracking-wider">Back</span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-black" />
              </div>
            </div>
            <div className="w-20" />
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-8 max-w-md mx-auto w-full">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white mb-3">
            <span className="text-primary italic">Complete</span> Payment
          </h2>
          <p className="text-white/50">Unlock full access to all Fitness Lab locations</p>
        </motion.div>

        {/* Pricing Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/5 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white font-bold uppercase tracking-wider">Monthly Full Access</h3>
              <p className="text-white/40 text-sm">All 3 locations • 24/7 access</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-black text-primary">150</div>
              <div className="text-white/40 text-sm">RON/mo</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Lupeni", "Vulcan", "Petroșani"].map((loc) => (
              <span
                key={loc}
                className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs uppercase tracking-wider"
              >
                {loc}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <h3 className="text-white/60 text-xs uppercase tracking-wider mb-4">Payment Method</h3>

          {/* Apple Pay */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setSelectedMethod("apple")}
            className={`w-full p-4 rounded-xl border mb-3 flex items-center justify-between transition-all ${
              selectedMethod === "apple"
                ? "border-primary bg-primary/10"
                : "border-white/10 bg-white/5 hover:border-white/20"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="black">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
              </div>
              <span className="text-white font-bold">Apple Pay</span>
            </div>
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectedMethod === "apple" ? "border-primary bg-primary" : "border-white/30"
              }`}
            >
              {selectedMethod === "apple" && <Check className="w-4 h-4 text-black" />}
            </div>
          </motion.button>

          {/* Google Pay */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setSelectedMethod("google")}
            className={`w-full p-4 rounded-xl border mb-3 flex items-center justify-between transition-all ${
              selectedMethod === "google"
                ? "border-primary bg-primary/10"
                : "border-white/10 bg-white/5 hover:border-white/20"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </div>
              <span className="text-white font-bold">Google Pay</span>
            </div>
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectedMethod === "google" ? "border-primary bg-primary" : "border-white/30"
              }`}
            >
              {selectedMethod === "google" && <Check className="w-4 h-4 text-black" />}
            </div>
          </motion.button>

          {/* Credit Card */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setSelectedMethod("card")}
            className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all ${
              selectedMethod === "card"
                ? "border-primary bg-primary/10"
                : "border-white/10 bg-white/5 hover:border-white/20"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold">Credit Card</span>
            </div>
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectedMethod === "card" ? "border-primary bg-primary" : "border-white/30"
              }`}
            >
              {selectedMethod === "card" && <Check className="w-4 h-4 text-black" />}
            </div>
          </motion.button>
        </motion.div>

        {/* Card Details Form */}
        {selectedMethod === "card" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 space-y-4"
          >
            <div>
              <label className="text-white/40 text-xs uppercase tracking-wider block mb-2">
                Card Number
              </label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className="w-full py-4 px-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-white/40 text-xs uppercase tracking-wider block mb-2">
                  Expiry
                </label>
                <input
                  type="text"
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  placeholder="MM/YY"
                  maxLength={5}
                  className="w-full py-4 px-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                />
              </div>
              <div>
                <label className="text-white/40 text-xs uppercase tracking-wider block mb-2">
                  CVC
                </label>
                <input
                  type="text"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 3))}
                  placeholder="123"
                  maxLength={3}
                  className="w-full py-4 px-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Pay Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handlePayment}
          disabled={!selectedMethod || !isFormValid() || isProcessing}
          className="w-full py-4 bg-primary text-black font-bold uppercase tracking-wider rounded-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-all"
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Lock className="w-4 h-4" />
              Pay 150 RON
            </>
          )}
        </motion.button>

        {/* Security Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-white/30 text-xs mt-4 flex items-center justify-center gap-1"
        >
          <Lock className="w-3 h-3" />
          Secured by SSL encryption
        </motion.p>
      </main>
    </motion.div>
  )
}
