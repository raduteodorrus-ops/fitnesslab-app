"use client"
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Onboarding() {
  const [step, setStep] = useState(1) // 1: Upload, 2: Hype
  const [name, setName] = useState('')
  const router = useRouter()

  const handleFinish = () => router.push('/pay')

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-8">
      {step === 1 ? (
        <div className="w-full max-w-sm animate-in fade-in zoom-in duration-500">
          <h2 className="text-3xl font-black italic uppercase mb-2">Bun venit în <span className="text-yellow-500">Lab</span></h2>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-10">Hai să-ți setăm profilul</p>
          
          <div className="space-y-6">
            <input 
              onChange={(e) => setName(e.target.value)}
              placeholder="NUME COMPLET" 
              className="w-full bg-zinc-900 border border-zinc-800 p-5 rounded-2xl outline-none focus:border-yellow-500 font-bold uppercase text-sm" 
            />
            <label className="block w-full py-10 border-2 border-dashed border-zinc-800 rounded-3xl text-center cursor-pointer hover:border-yellow-500 transition-all">
              <input type="file" className="hidden" onChange={() => setStep(2)} />
              <span className="text-4xl block mb-2">📸</span>
              <span className="text-[10px] font-black uppercase text-zinc-600 tracking-widest">Apasă pentru poza de profil</span>
            </label>
          </div>
        </div>
      ) : (
        <div className="text-center animate-in fade-in slide-in-from-bottom-10 duration-700">
          <div className="w-24 h-24 bg-yellow-500 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl animate-bounce">🔥</div>
          <h2 className="text-4xl font-black italic uppercase mb-4 text-white">Ești gata, {name.split(' ')[0]}!</h2>
          <p className="text-zinc-400 max-w-xs mx-auto mb-10 font-medium">Te pregătim pentru cea mai bună versiune a ta în <span className="text-white">Fitness Lab Lupeni</span>.</p>
          <button onClick={handleFinish} className="w-full bg-white text-black py-5 rounded-2xl font-black uppercase italic tracking-widest text-xl shadow-[0_0_40px_rgba(255,255,255,0.1)]">
            Vezi Abonamentele →
          </button>
        </div>
      )}
    </div>
  )
}