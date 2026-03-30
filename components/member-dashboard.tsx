"use client"
import { useState } from "react"
import { CalendarDays, List, QrCode, User, Dumbbell, LogOut } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"
import { supabase } from "@/lib/supabase"

export function MemberDashboard({ userData }: { userData: any, onNavigate: any }) {
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list")
  const classes = [
    { id: 1, name: "Body Pump", time: "09:00 AM" },
    { id: 2, name: "HIIT Blast", time: "06:30 PM" }
  ]

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-24">
      <header className="flex justify-between mb-8">
        <h1 className="text-xl font-black italic text-primary uppercase">THE LAB PASS</h1>
        <button onClick={() => supabase.auth.signOut().then(() => window.location.href="/")}><LogOut size={20}/></button>
      </header>

      <div className="bg-zinc-900 border border-white/10 rounded-[2rem] p-8 text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="bg-white p-3 rounded-2xl">
            <QRCodeSVG value={userData.email} size={150} />
          </div>
        </div>
        <h2 className="text-xl font-black uppercase italic">{userData.fullName}</h2>
      </div>

      <div className="flex justify-between mb-4">
        <h3 className="text-xs font-black uppercase text-zinc-500">Schedule</h3>
        <div className="flex gap-2 bg-zinc-900 p-1 rounded-lg">
          <button onClick={() => setViewMode("list")} className={`p-1 ${viewMode==="list"?"text-primary":"text-zinc-600"}`}><List size={16}/></button>
          <button onClick={() => setViewMode("calendar")} className={`p-1 ${viewMode==="calendar"?"text-primary":"text-zinc-600"}`}><CalendarDays size={16}/></button>
        </div>
      </div>

      {viewMode === "list" ? (
        <div className="space-y-3">
          {classes.map(c => (
            <div key={c.id} className="bg-zinc-950 border border-white/5 p-4 rounded-2xl flex justify-between items-center">
              <div>
                <p className="text-primary font-black text-[10px]">{c.time}</p>
                <p className="font-bold uppercase text-sm">{c.name}</p>
              </div>
              <button className="bg-white text-black px-4 py-1 rounded-lg font-black text-[10px]">BOOK</button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-10 border border-dashed border-zinc-800 rounded-2xl text-zinc-600 text-xs uppercase font-bold">Calendar View Coming Soon</div>
      )}

      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-zinc-900/90 border border-white/10 rounded-full p-4 flex justify-around shadow-2xl">
        <QrCode className="text-primary" />
        <Dumbbell className="text-zinc-600" />
        <User className="text-zinc-600" />
      </nav>
    </div>
  )
}