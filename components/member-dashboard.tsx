"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { QrCode, Calendar, MapPin, Clock, Check, LogOut, Dumbbell } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

interface MemberDashboardProps {
  onNavigate: (screen: any) => void
}

type TabType = "pass" | "schedule"

export function MemberDashboard({ onNavigate }: MemberDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>("pass")
  const [selectedLocation, setSelectedLocation] = useState<string>("LUPENI")
  const [bookedClasses, setBookedClasses] = useState<string[]>([])
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const locations = ["LUPENI", "VULCAN", "PETROȘANI"]

  // FETCH DATE REALE DIN SUPABASE
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        onNavigate("landing")
        return
      }

      const { data: member } = await supabase
        .from('members')
        .select('*')
        .eq('email', user.email)
        .single()

      setUserData(member || { fullName: user.user_metadata.full_name, email: user.email })
      setLoading(false)
    }
    fetchUser()
  }, [onNavigate])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-primary font-black italic animate-pulse tracking-widest">LOADING LAB...</div>
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black flex flex-col selection:bg-primary selection:text-black"
    >
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(234,179,8,0.2)]">
                <Dumbbell className="w-6 h-6 text-black" />
              </div>
              <span className="text-xl font-black uppercase tracking-tighter text-white italic">
                FITNESS <span className="text-primary">LAB</span>
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="p-3 bg-white/5 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all border border-white/5"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="px-4 py-6 border-b border-white/5 bg-zinc-950/30">
        <div className="max-w-md mx-auto flex gap-2 p-1.5 bg-black border border-white/10 rounded-2xl">
          <button
            onClick={() => setActiveTab("pass")}
            className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-black uppercase text-[10px] tracking-[0.2em] transition-all ${
              activeTab === "pass"
                ? "bg-primary text-black shadow-lg shadow-primary/20"
                : "text-zinc-500 hover:text-white"
            }`}
          >
            <QrCode className="w-4 h-4" />
            Digital Pass
          </button>
          <button
            onClick={() => setActiveTab("schedule")}
            className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-black uppercase text-[10px] tracking-[0.2em] transition-all ${
              activeTab === "schedule"
                ? "bg-primary text-black shadow-lg shadow-primary/20"
                : "text-zinc-500 hover:text-white"
            }`}
          >
            <Calendar className="w-4 h-4" />
            Schedule
          </button>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 px-4 py-8">
        <AnimatePresence mode="wait">
          {activeTab === "pass" && (
            <motion.div
              key="pass"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-md mx-auto"
            >
              <div className="relative p-8 rounded-[2.5rem] bg-zinc-950 border border-white/10 shadow-2xl overflow-hidden group">
                {/* Glow Background */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/20 blur-[100px] -z-10" />

                <div className="relative text-center">
                  <div className="mb-8 flex justify-center">
                    <div className="p-5 bg-white rounded-[2rem] shadow-[0_0_50px_rgba(255,255,255,0.1)] group-hover:scale-105 transition-transform duration-500">
                      <QRCodeSVG
                        value={`MEMBER:${userData?.email || 'N/A'}`}
                        size={200}
                        level="H"
                        fgColor="#000000"
                        bgColor="#ffffff"
                      />
                    </div>
                  </div>

                  <div className="mb-10">
                    <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.4em] mb-2">Member ID</p>
                    <p className="text-white font-mono text-xl tracking-[0.2em] font-bold">
                      {userData?.id?.slice(0, 8).toUpperCase() || "FL-LAB-001"}
                    </p>
                  </div>

                  <div className="flex items-center gap-5 bg-black/40 p-5 rounded-3xl border border-white/5 text-left backdrop-blur-md">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-primary/30 flex-shrink-0 shadow-lg">
                      <img
                        src={userData?.photo_url || `https://ui-avatars.com/api/?name=${userData?.name || 'User'}&background=EAB308&color=000`}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-black italic uppercase text-lg truncate leading-none mb-2">{userData?.name || "Member Name"}</p>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
                        <span className="text-green-400 text-[10px] uppercase tracking-[0.2em] font-black italic">
                          Pass Valid 24/7
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "schedule" && (
            <motion.div
              key="schedule"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="max-w-md mx-auto"
            >
              <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                {locations.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => setSelectedLocation(loc)}
                    className={`px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all whitespace-nowrap border ${
                      selectedLocation === loc
                        ? "bg-primary text-black border-primary shadow-lg shadow-primary/10"
                        : "bg-zinc-950 text-zinc-500 border-white/5 hover:border-white/20"
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] pl-2">Available Classes</h3>
                {/* AICI POȚI MAPA DATELE REALE DIN DB DACA AI TABEL DE CLASE */}
                {["CROSSFIT", "BOXING", "PILATES"].map((cls, i) => (
                  <div key={i} className="p-6 rounded-[2rem] bg-zinc-950 border border-white/5 flex justify-between items-center group hover:border-primary/30 transition-all">
                    <div>
                      <div className="text-primary font-black italic text-xs mb-1 uppercase tracking-widest">18:30</div>
                      <h4 className="text-white font-black italic uppercase tracking-tight text-lg">{cls}</h4>
                      <p className="text-zinc-600 text-[9px] font-bold uppercase tracking-[0.2em] mt-1">Sala {selectedLocation}</p>
                    </div>
                    <button className="px-6 py-3 bg-white text-black rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-primary transition-colors shadow-xl">
                      Book
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </motion.div>
  )
}