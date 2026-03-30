"use client"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { LandingPage } from "./landing-page"
import { OnboardingFlow } from "./onboarding-flow"
import { PaymentScreen } from "./payment-screen"
import { MemberDashboard } from "./member-dashboard"

export type AppScreen = "landing" | "onboarding" | "payment" | "dashboard"

export interface UserData {
  fullName: string
  profileImage: string | null
}

export function FitnessLabApp() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>("landing")
  const [userData, setUserData] = useState<UserData>({
    fullName: "",
    profileImage: null,
  })

  const navigateTo = (screen: AppScreen) => {
    setCurrentScreen(screen)
  }

  return (
    <div className="min-h-screen bg-black">
      <AnimatePresence mode="wait">
        {currentScreen === "landing" && (
          <LandingPage key="landing" onNavigate={navigateTo} />
        )}
        {currentScreen === "onboarding" && (
          <OnboardingFlow
            key="onboarding"
            onNavigate={navigateTo}
            userData={userData}
            setUserData={setUserData}
          />
        )}
        {currentScreen === "payment" && (
          <PaymentScreen
            key="payment"
            onNavigate={navigateTo}
            userData={userData}
          />
        )}
        {currentScreen === "dashboard" && (
          <MemberDashboard
            key="dashboard"
            onNavigate={navigateTo}
            userData={userData}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
