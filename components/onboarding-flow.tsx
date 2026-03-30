"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Camera, User, ChevronRight, ChevronLeft, Sparkles, Dumbbell } from "lucide-react"
import type { AppScreen, UserData } from "./fitness-lab-app"

interface OnboardingFlowProps {
  onNavigate: (screen: AppScreen) => void
  userData: UserData
  setUserData: (data: UserData) => void
}

export function OnboardingFlow({ onNavigate, userData, setUserData }: OnboardingFlowProps) {
  const [step, setStep] = useState(1)
  const [fullName, setFullName] = useState(userData.fullName)
  const [profileImage, setProfileImage] = useState<string | null>(userData.profileImage)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleNext = () => {
    if (step === 1 && profileImage) {
      setStep(2)
    } else if (step === 2 && fullName.trim()) {
      setUserData({ fullName: fullName.trim(), profileImage })
      setStep(3)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    } else {
      onNavigate("landing")
    }
  }

  const handleContinue = () => {
    onNavigate("payment")
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
              onClick={handleBack}
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

      {/* Progress Bar */}
      {step < 3 && (
        <div className="px-4 py-6">
          <div className="max-w-md mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-white/40 uppercase tracking-wider">Step {step} of 2</span>
            </div>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: step === 1 ? "50%" : "100%" }}
                transition={{ duration: 0.4 }}
                className="h-full bg-primary rounded-full"
              />
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white mb-3">
                  <span className="text-primary italic">Profile</span> Photo
                </h2>
                <p className="text-white/50">Upload a photo for your digital membership pass</p>
              </div>

              {/* Upload Area */}
              <div className="flex justify-center mb-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => fileInputRef.current?.click()}
                  className="relative w-48 h-48 rounded-2xl border-2 border-dashed border-white/20 hover:border-primary/50 transition-colors overflow-hidden bg-white/5 backdrop-blur-sm"
                >
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                        <Camera className="w-8 h-8 text-primary" />
                      </div>
                      <span className="text-white/60 text-sm uppercase tracking-wider">Tap to upload</span>
                    </div>
                  )}
                  {profileImage && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                  )}
                </motion.button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>

              {/* Continue Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNext}
                disabled={!profileImage}
                className="w-full py-4 bg-primary text-black font-bold uppercase tracking-wider rounded-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-all"
              >
                Continue
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white mb-3">
                  <span className="text-primary italic">Your</span> Name
                </h2>
                <p className="text-white/50">This will appear on your membership pass</p>
              </div>

              {/* Name Input */}
              <div className="mb-8">
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <User className="w-5 h-5 text-white/40" />
                  </div>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full py-4 pl-12 pr-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-lg"
                  />
                </div>
              </div>

              {/* Continue Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNext}
                disabled={!fullName.trim()}
                className="w-full py-4 bg-primary text-black font-bold uppercase tracking-wider rounded-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-all"
              >
                Continue
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-md text-center"
            >
              {/* Celebration Animation */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6"
              >
                <Sparkles className="w-12 h-12 text-primary" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white mb-3"
              >
                <span className="text-primary italic">You&apos;re Ready,</span>
                <br />
                {fullName.split(" ")[0]}!
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-white/60 mb-4"
              >
                Welcome to the Lab.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-white/40 mb-8"
              >
                Complete your membership to unlock full access to all locations.
              </motion.p>

              {/* Profile Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center justify-center gap-4 mb-8 p-4 rounded-2xl bg-white/5 border border-white/5"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-primary/50">
                  {profileImage && (
                    <img src={profileImage} alt={fullName} className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="text-left">
                  <div className="text-white font-bold text-lg">{fullName}</div>
                  <div className="text-white/40 text-sm uppercase tracking-wider">New Member</div>
                </div>
              </motion.div>

              {/* Continue Button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleContinue}
                className="w-full py-4 bg-primary text-black font-bold uppercase tracking-wider rounded-full flex items-center justify-center gap-2 hover:bg-primary/90 transition-all"
              >
                Complete Membership
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </motion.div>
  )
}
