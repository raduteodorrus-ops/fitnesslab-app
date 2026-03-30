"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays, List, QrCode, User, Dumbbell } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"

interface UserData {
  fullName: string
  email: string
  profileImage?: string
}

export function MemberDashboard({ userData, onNavigate }: { userData: UserData, onNavigate: (s: any) => void }) {
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const classes = [
    { id: 1, name: "Body Pump", time: "09:00 AM", instructor: "Alex", day: new Date() },
    { id: 2, name: "HIIT Blast", time: "06:30 PM", instructor: "Andreea", day: new Date() },
    { id: 3, name: "Yoga Flow", time: "08:00 AM", instructor: "Maria", day: new Date(new Date().setDate(new Date().getDate() + 1)) },
  ]

  return (
    <div className="min-h-screen bg-black p-4 pb-24">
      {/* Header cu Profile */}
      <header className="flex items-center justify-between mb-8 pt-4">
        <div>
          <h1 className="text-2xl font-black italic text-white uppercase tracking-tighter">
            THE LAB <span className="text-primary">PASS</span>
          </h1>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Ready to grind, {userData.fullName.split(' ')[0]}?</p>
        </div>
        <div className="h-12 w-12 rounded-full border-2 border-primary overflow-hidden">
          {userData.profileImage ? (
            <img src={userData.profileImage} alt="Profile" className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full bg-zinc-800 flex items-center justify-center text-primary font-bold">
              {userData.fullName[0]}
            </div>
          )}
        </div>
      </header>

      {/* QR Code Section (Digital Pass) */}
      <Card className="bg-zinc-900 border-zinc-800 mb-8 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-2 bg-primary text-black text-[10px] font-black uppercase italic px-3">Active Member</div>
        <CardContent className="pt-8 flex flex-col items-center">
          <div className="bg-white p-3 rounded-xl mb-4">
            <QRCodeSVG value={`user:${userData.email}`} size={180} bgColor="#ffffff" fgColor="#000000" />
          </div>
          <p className="text-zinc-400 text-[10px] uppercase font-bold tracking-widest mb-4">Scan at the entrance</p>
        </CardContent>
      </Card>

      {/* Schedule Section cu Toggle */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-black italic uppercase text-white">Weekly Schedule</h2>
        <div className="flex bg-zinc-900 p-1 rounded-lg border border-zinc-800">
          <Button 
            variant={viewMode === "list" ? "default" : "ghost"} 
            size="sm" 
            className="h-8 px-3 rounded-md"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4 mr-1" /> List
          </Button>
          <Button 
            variant={viewMode === "calendar" ? "default" : "ghost"} 
            size="sm" 
            className="h-8 px-3 rounded-md"
            onClick={() => setViewMode("calendar")}
          >
            <CalendarDays className="h-4 w-4 mr-1" /> Calendar
          </Button>
        </div>
      </div>

      {viewMode === "list" ? (
        <div className="space-y-3">
          {classes.map((cls) => (
            <div key={cls.id} className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex justify-between items-center">
              <div>
                <p className="text-primary font-black italic text-sm uppercase">{cls.name}</p>
                <p className="text-zinc-400 text-xs font-bold uppercase">{cls.time} • {cls.instructor}</p>
              </div>
              <Button size="sm" className="bg-zinc-800 hover:bg-primary hover:text-black font-black italic uppercase text-[10px] h-8">Book</Button>
            </div>
          ))}
        </div>
      ) : (
        <Card className="bg-zinc-900 border-zinc-800 p-0 overflow-hidden">
          <Calendar 
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="text-white bg-transparent"
          />
          {selectedDate && (
            <div className="p-4 border-t border-zinc-800 bg-zinc-950">
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-2">Activities for {selectedDate.toLocaleDateString()}</p>
              <p className="text-xs text-primary font-black italic uppercase">No special events scheduled for this day.</p>
            </div>
          )}
        </Card>
      )}

      {/* Bottom Nav */}
      <nav className="fixed bottom-6 left-4 right-4 bg-zinc-900/90 backdrop-blur-md border border-zinc-800 rounded-2xl p-2 flex justify-around items-center shadow-2xl">
        <Button variant="ghost" size="icon" className="text-primary"><QrCode /></Button>
        <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-primary"><Dumbbell /></Button>
        <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-primary"><User /></Button>
      </nav>
    </div>
  )
}