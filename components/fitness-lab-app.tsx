"use client"

import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import { LandingPage } from "./landing-page"
import { OnboardingFlow } from "./onboarding-flow"
import { MemberDashboard } from "./member-dashboard"
import { PaymentScreen } from "./payment-screen"
import { supabase } from "@/lib/supabase"

export type AppScreen = "landing" | "onboarding" | "payment" | "dashboard"

export interface UserData {
  fullName: string
  email: string
  profileImage?: string
  membershipStatus?: "active" | "inactive"
}

export function FitnessLabApp() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>("landing")
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // ASCULTĂM DUPĂ USER ÎN SUPABASE
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUserData({
          fullName: user.user_metadata.full_name || "Member",
          email: user.email || "",
          profileImage: user.user_metadata.avatar_url,
          membershipStatus: "active"
        })
        setCurrentScreen("dashboard")
      }
      setIsLoading(false)
    }

    checkUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setUserData({
          fullName: session.user.user_metadata.full_name || "Member",
          email: session.user.email || "",
          profileImage: session.user.user_metadata.avatar_url,
          membershipStatus: "active"
        })
        setCurrentScreen("dashboard")
      }
      if (event === 'SIGNED_OUT') {
        setUserData(null)
        setCurrentScreen("landing")
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleNavigate = (screen: AppScreen) => {
    setCurrentScreen(screen)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-primary font-black italic animate-pulse tracking-widest uppercase">
          Initializing Lab...
        </div>
      </div>
    )
  }

  return (
    <main className="bg-black text-white min-h-screen font-sans selection:bg-primary selection:text-black">
      <AnimatePresence mode="wait">
        {currentScreen === "landing" && (
          <LandingPage key="landing" onNavigate={handleNavigate} />
        )}

        {currentScreen === "onboarding" && (
          <OnboardingFlow key="onboarding" onNavigate={handleNavigate} />
        )}

        {currentScreen === "payment" && (
          <PaymentScreen key="payment" onNavigate={handleNavigate} />
        )}

        {currentScreen === "dashboard" && userData && (
          <MemberDashboard 
            key="dashboard" 
            onNavigate={handleNavigate} 
            userData={userData} 
          />
        )}
      </AnimatePresence>
    </main>
  )
}