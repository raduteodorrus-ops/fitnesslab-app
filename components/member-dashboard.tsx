"use client"

import { useState } from "react"
import { CalendarDays, List, QrCode, User, Dumbbell, LogOut } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"
import { supabase } from "@/lib/supabase"

interface UserData {
  fullName: string
  email: string
  profileImage?: string
}

export function MemberDashboard({ userData, onNavigate }: { userData: UserData, onNavigate: (s: any) => void }) {
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list")

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  const classes = [
    { id: 1, name: "Body Pump", time: "09:00 AM", instructor: "Alex", location: "Lupeni" },
    { id: 2, name: "HIIT Blast", time: "06:30 PM", instructor: "Andreea", location: "Vulcan" },
    { id: 3, name: "Yoga Flow", time: "08:00 AM", instructor: "Maria", location: "Petroșani" },
  ]

  return (
    <div className="min-h-screen bg-black text-white p-4 pb-24 font-sans">
      {/* Header */}
      <header className="flex items-center justify-between mb-8 pt-4">
        <div>
          <h1 className="text-2xl font-black italic text-white uppercase tracking-tighter">
            THE LAB <span className="text-[#EAB308]">PASS</span>
          </h1>
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
            Welcome back, {userData.fullName.split(' ')[0]}
          </p>
        </div>
        <button onClick={handleLogout} className="text-zinc-500 hover:text-white transition-colors">
          <LogOut size={20} />
        </button>
      </header>

      {/* Profile Card (QR Section) */}
      <div className="bg-zinc-900 border border-white/5 rounded-[2rem] p-6 mb-8 text-center relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-2 bg-[#EAB308] text-black text-[10px] font-black uppercase italic px-4 rounded-bl-xl">
          Active Member
        </div>
        <div className="flex justify-center mb-4 mt-4">
           <div className="bg-white p-3 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <QRCodeSVG value={`MEMBER:${userData.email}`} size={160} />
          </div>
        </div>
        <h2 className="text-xl font-black uppercase italic tracking-tight">{userData.fullName}</h2>
        <p className="text-[#EAB308] text-[9px] font-black tracking-[0.3em] uppercase mt-1 opacity-80">Digital Access Key</p>
      </div>

      {/* Schedule Header + Toggle */}
      <div className="flex items-center justify-between mb-6 px-1">
        <h2 className="text-sm font-black uppercase italic tracking-widest text-zinc-400">Weekly Schedule</h2>
        <div className="flex bg-zinc-900 rounded-xl p-1 border border-white/5">
          <button 
            onClick={() => setViewMode("list")}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${viewMode === "list" ? "bg-[#EAB308] text-black" : "text-zinc-500"}`}
          >
            <List size={14} /> List
          </button>
          <button 
            onClick={() => setViewMode("calendar")}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${viewMode === "calendar" ? "bg-[#EAB308] text-black" : "text-zinc-500"}`}
          >
            <CalendarDays size={14} /> Cal
          </button>
        </div>
      </div>

      {/* Content Area */}
      {viewMode === "list" ? (
        <div className="space-y-3">
          {classes.map((cls) => (
            <div key={cls.id} className="bg-zinc-900/50 border border-white/5 p-4 rounded-2xl flex justify-between items-center group hover:border-[#EAB308]/30 transition-all">
              <div>
                <p className="text-[#EAB308] font-black italic text-[10px] uppercase mb-0.5">{cls.time}</p>
                <h3 className="text-white font-bold uppercase text-sm tracking-tight">{cls.name}</h3>
                <p className="text-zinc-600 text-[9px] font-bold uppercase tracking-widest mt-1">{cls.instructor} • {cls.location}</p>
              </div>
              <button className="bg-zinc-800 text-white px-4 py-2 rounded-xl font-black uppercase text-[9px] tracking-widest hover:bg-[#EAB308] hover:text-black transition-all">
                Book
              </button>
            </div>
          ))
        ) : (
          <div className="bg-zinc-900/30 border border-dashed border-white/10 p-12 rounded-[2rem] text-center">
            <CalendarDays size={40} className="mx-auto text-zinc-800 mb-3" />
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em]">Calendar Syncing...</p>
            <p className="text-[9px] text-zinc-700 mt-1 uppercase italic font-bold">Standard View Recommended</p>
          </div>
        )}

      {/* Bottom Nav */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-3 flex justify-around items-center shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <button className="p-3 text-[#EAB308] bg-[#EAB308]/10 rounded-2xl transition-all shadow-inner"><QrCode size={22} /></button>
        <button className="p-3 text-zinc-500 hover:text-white transition-colors"><Dumbbell size={22} /></button>
        <button className="p-3 text-zinc-500 hover:text-white transition-colors"><User size={22} /></button>
      </nav>
    </div>
  )
}