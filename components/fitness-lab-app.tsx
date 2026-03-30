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
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUserData({
          fullName: user.user_metadata.full_name || "Member",
          email: user.email || "",
          profileImage: user.user_metadata.avatar_url
        })
        setCurrentScreen("onboarding")
      }
      setIsLoading(false)
    }
    checkUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setUserData({
          fullName: session.user.user_metadata.full_name || "Member",
          email: session.user.email || "",
          profileImage: session.user.user_metadata.avatar_url
        })
        setCurrentScreen("onboarding")
      }
      if (event === 'SIGNED_OUT') {
        setUserData(null)
        setCurrentScreen("landing")
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  if (isLoading) return <div className="bg-black min-h-screen" />

  return (
    <main className="bg-black text-white min-h-screen">
      {currentScreen === "landing" && (
        <LandingPage onNavigate={setCurrentScreen} />
      )}
      
      {currentScreen === "onboarding" && (
        <OnboardingFlow 
          onNavigate={setCurrentScreen} 
          userData={userData} 
          setUserData={setUserData} 
        />
      )}
      
      {currentScreen === "payment" && (
        <PaymentScreen 
          onNavigate={setCurrentScreen} 
          userData={userData} 
        />
      )}
      
      {currentScreen === "dashboard" && userData && (
        <MemberDashboard 
          userData={userData} 
          onNavigate={setCurrentScreen} 
        />
      )}
    </main>
  )
}