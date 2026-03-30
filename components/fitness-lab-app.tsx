"use client"

import { useState, useEffect } from "react"
import { LandingPage } from "./landing-page"
import { OnboardingFlow } from "./onboarding-flow"
import { MemberDashboard } from "./member-dashboard"
import { PaymentScreen } from "./payment-screen"
import { supabase } from "@/lib/supabase"

export type AppScreen = "landing" | "onboarding" | "payment" | "dashboard"

export function FitnessLabApp() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>("landing")
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setUserData({
          fullName: session.user.user_metadata.full_name || "Member",
          email: session.user.email || "",
          profileImage: session.user.user_metadata.avatar_url
        })
        setCurrentScreen("onboarding")
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  return (
    <main className="min-h-screen bg-black">
      {currentScreen === "landing" && (
        <LandingPage onNavigate={setCurrentScreen} />
      )}
      {currentScreen === "onboarding" && (
        <OnboardingFlow onNavigate={setCurrentScreen} userData={userData} setUserData={setUserData} />
      )}
      {currentScreen === "payment" && (
        <PaymentScreen onNavigate={setCurrentScreen} userData={userData} />
      )}
      {currentScreen === "dashboard" && userData && (
        <MemberDashboard userData={userData} onNavigate={setCurrentScreen} />
      )}
    </main>
  )
}