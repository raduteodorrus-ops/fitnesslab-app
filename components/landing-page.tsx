"use client"

import { motion } from "framer-motion"
import { MapPin, ChevronRight, Dumbbell } from "lucide-react"
import type { AppScreen } from "./fitness-lab-app"
import { supabase } from "@/lib/supabase" // ASIGURĂ-TE CĂ AI FIȘIERUL ACESTA ÎN LIB

interface LandingPageProps {
  onNavigate: (screen: AppScreen) => void
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const locations = ["LUPENI", "VULCAN", "PETROȘANI"]

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      })
      if (error) throw error
    } catch (error) {
      console.error("Error logging in:", error)
      alert("Eroare la logare. Verifică setările Supabase.")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-black flex flex-col selection:bg-primary selection:text-black"
    >
      {/* Sticky Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                <Dumbbell className="w-6 h-6 text-black" />
              </div>
              <span className="text-xl font-black uppercase tracking-tighter text-white italic">
                Fitness <span className="text-primary">Lab</span>
              </span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGoogleLogin}
              className="px-6 py-2.5 bg-primary text-black font-black uppercase text-xs tracking-[0.2em] rounded-full hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
            >
              Member Login
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10" />
        
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 text-[10px] font-black uppercase tracking-[0.4em] backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              Premium Fitness Experience
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-6xl sm:text-8xl lg:text-9xl font-black uppercase leading-[0.85] tracking-tighter mb-10"
          >
            <span className="text-white block">WORK</span>
            <span className="text-primary italic block">HARDER,</span>
            <span className="text-white block">FEEL</span>
            <span className="text-primary italic block">BETTER</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-white/40 text-sm sm:text-base font-bold uppercase tracking-widest max-w-xl mx-auto mb-14 leading-relaxed italic"
          >
            Transform your body and mind with our state-of-the-art facilities 
            and expert trainers across the Jiu Valley.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-5 justify-center mb-20"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGoogleLogin}
              className="group px-10 py-5 bg-primary text-black font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 hover:bg-primary/90 transition-all shadow-[0_20px_40px_rgba(234,179,8,0.2)]"
            >
              Start Your Journey
              <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all backdrop-blur-md"
            >
              View Locations
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-5"
          >
            {locations.map((location, index) => (
              <motion.div
                key={location}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-primary/50 transition-colors cursor-default"
              >
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-white/70 text-xs uppercase tracking-[0.2em] font-black italic">
                  {location}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="border-t border-white/5 py-10 bg-zinc-950/50 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="text-3xl sm:text-5xl font-black text-primary italic tracking-tighter group-hover:scale-110 transition-transform">3</div>
              <div className="text-[10px] text-white/30 uppercase font-black tracking-[0.3em] mt-2">Locations</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl sm:text-5xl font-black text-white italic tracking-tighter group-hover:scale-110 transition-transform">500+</div>
              <div className="text-[10px] text-white/30 uppercase font-black tracking-[0.3em] mt-2">Members</div>
            </div>
            <div className="text-center group">
              <div className="text-3xl sm:text-5xl font-black text-primary italic tracking-tighter group-hover:scale-110 transition-transform">24/7</div>
              <div className="text-[10px] text-white/30 uppercase font-black tracking-[0.3em] mt-2">Access</div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}