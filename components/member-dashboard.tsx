"use client"

import { QrCode, Dumbbell, User, LogOut } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"
import { supabase } from "@/lib/supabase"

export function MemberDashboard({ userData }: { userData: any, onNavigate: any }) {
  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-24 font-sans">
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-xl font-black italic uppercase tracking-tighter">
          THE LAB <span className="text-primary">PASS</span>
        </h1>
        <button onClick={handleLogout} className="text-zinc-500 hover:text-white transition-colors">
          <LogOut size={20} />
        </button>
      </header>

      <div className="bg-zinc-900/50 border border-white/10 rounded-[2rem] p-8 text-center shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-2 bg-primary text-black text-[10px] font-black uppercase italic px-4 rounded-bl-lg">
          Active Member
        </div>
        <div className="flex justify-center mb-6">
          <div className="bg-white p-4 rounded-2xl">
            <QRCodeSVG value={`MEMBER:${userData?.email}`} size={160} />
          </div>
        </div>
        <h2 className="text-2xl font-black uppercase italic tracking-tight">{userData?.fullName}</h2>
        <p className="text-primary text-[10px] font-black tracking-[0.3em] uppercase mt-2">Digital Access Key</p>
      </div>

      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-full p-4 flex justify-around shadow-2xl">
        <button className="text-primary"><QrCode size={24} /></button>
        <button className="text-zinc-600 hover:text-white transition-colors"><Dumbbell size={24} /></button>
        <button className="text-zinc-600 hover:text-white transition-colors"><User size={24} /></button>
      </nav>
    </div>
  )
}