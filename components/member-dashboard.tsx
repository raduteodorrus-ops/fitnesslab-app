"use client"
import { QrCode, Dumbbell, User } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"

export function MemberDashboard({ userData }: { userData: any, onNavigate: any }) {
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-primary font-black italic mb-8">THE LAB PASS</h1>
      <div className="bg-zinc-900 p-8 rounded-[2rem] text-center border border-white/10">
        <div className="flex justify-center mb-4 bg-white p-3 rounded-xl w-fit mx-auto">
          <QRCodeSVG value={userData?.email || "error"} size={150} />
        </div>
        <h2 className="text-xl font-black uppercase italic">{userData?.fullName || "Member"}</h2>
      </div>
      <nav className="fixed bottom-6 left-0 right-0 flex justify-around p-4 bg-zinc-900 border-t border-white/5">
        <QrCode className="text-primary" />
        <Dumbbell className="text-zinc-700" />
        <User className="text-zinc-700" />
      </nav>
    </div>
  )
}