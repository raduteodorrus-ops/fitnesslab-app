"use client"
import { useState } from "react"
import { QrCode, Dumbbell, User, LogOut, List, CalendarDays } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"
import { supabase } from "@/lib/supabase"

export function MemberDashboard({ userData, onNavigate }: { userData: any, onNavigate: (s: any) => void }) {
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list")

  const classes = [
    { id: 1, name: "Body Pump", time: "09:00 AM" },
    { id: 2, name: "HIIT Blast", time: "06:30 PM" }
  ]

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-24">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-black italic text-[#EAB308] uppercase tracking-tighter">THE LAB PASS</h1>
        <button onClick={() => supabase.auth.signOut()} className="text-zinc-500 hover:text-white transition-colors">
          <LogOut size={20}/>
        </button>
      </header>

      <div className="bg-zinc-900 border border-white/10 rounded-[2.5rem] p-8 text-center mb-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-2 bg-[#EAB308] text-black text-[10px] font-black uppercase italic px-4 rounded-bl-xl">Active</div>
        <div className="flex justify-center mb-4 bg-white p-4 rounded-3xl w-fit mx-auto shadow-inner">
          <QRCodeSVG value={userData?.email || "member"} size={160} />
        </div>
        <h2 className="text-2xl font-black uppercase italic tracking-tight">{userData?.fullName}</h2>
        <p className="text-[#EAB308] text-[10px] font-black uppercase tracking-[0.3em] mt-2 opacity-80">Digital Access Key</p>
      </div>

      <div className="flex justify-between items-center mb-4 px-2">
        <h3 className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.2em]">Your Schedule</h3>
        <div className="flex bg-zinc-900 rounded-xl p-1 border border-white/5">
          <button onClick={() => setViewMode("list")} className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-[#EAB308] text-black" : "text-zinc-600"}`}><List size={16}/></button>
          <button onClick={() => setViewMode("calendar")} className={`p-2 rounded-lg transition-all ${viewMode === "calendar" ? "bg-[#EAB308] text-black" : "text-zinc-600"}`}><CalendarDays size={16}/></button>
        </div>
      </div>

      {viewMode === "list" ? (
        <div className="space-y-3">
          {classes.map(c => (
            <div key={c.id} className="bg-zinc-900/50 border border-white/5 p-5 rounded-2xl flex justify-between items-center hover:border-[#EAB308]/30 transition-all">
              <div>
                <p className="text-[#EAB308] font-black text-[10px] uppercase mb-1">{c.time}</p>
                <p className="font-bold uppercase text-sm tracking-tight">{c.name}</p>
              </div>
              <button className="bg-zinc-800 text-white px-5 py-2 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-[#EAB308] hover:text-black transition-all">Book</button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-zinc-950 border border-dashed border-white/5 p-12 rounded-[2rem] text-center text-zinc-700 text-[10px] font-black uppercase tracking-[0.3em]">
          Syncing Calendar...
        </div>
      )}

      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[85%] bg-zinc-900/90 backdrop-blur-xl border border-white/10 rounded-full p-3 flex justify-around shadow-2xl">
        <button className="p-3 text-[#EAB308] bg-[#EAB308]/10 rounded-2xl shadow-inner"><QrCode size={24} /></button>
        <button className="p-3 text-zinc-600 hover:text-white transition-colors"><Dumbbell size={24} /></button>
        <button className="p-3 text-zinc-600 hover:text-white transition-colors"><User size={24} /></button>
      </nav>
    </div>
  )
}