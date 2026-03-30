"use client"
import { useRouter } from 'next/navigation'

export default function Payment() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-black text-white p-6 pt-20">
      <div className="max-w-md mx-auto">
        <button onClick={() => router.back()} className="text-zinc-600 mb-8 font-black uppercase text-[10px] tracking-widest">← Înapoi</button>
        
        <h2 className="text-3xl font-black italic uppercase mb-2">Alege <span className="text-yellow-500">Planul</span></h2>
        <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-10">Valabil în Lupeni, Vulcan & Petroșani</p>

        {/* METODE RAPIDE */}
        <div className="grid grid-cols-2 gap-4 mb-8">
            <button onClick={() => router.push('/profile')} className="bg-[#000] border border-white/10 p-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-all">
                <span className="font-bold uppercase text-[10px]">Apple Pay</span>
            </button>
            <button onClick={() => router.push('/profile')} className="bg-[#000] border border-white/10 p-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-all">
                <span className="font-bold uppercase text-[10px]">Google Pay</span>
            </button>
        </div>

        <div className="bg-zinc-900/50 p-8 rounded-[2.5rem] border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
                <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-[8px] font-black uppercase">Popular</span>
            </div>
            <h4 className="font-black italic text-xl mb-1 uppercase tracking-tighter">Abonament Full</h4>
            <p className="text-4xl font-black italic mb-6 uppercase tracking-tighter">150 <span className="text-sm italic font-normal text-zinc-500">RON / lună</span></p>
            
            <ul className="text-zinc-400 text-xs space-y-3 mb-10 uppercase font-bold tracking-tight">
                <li className="flex gap-2">✅ Acces 24/7 oricare locație</li>
                <li className="flex gap-2">✅ Clase de grup incluse</li>
                <li className="flex gap-2">✅ Plan nutriție demo</li>
            </ul>

            <button onClick={() => router.push('/profile')} className="w-full bg-yellow-500 text-black py-4 rounded-xl font-black uppercase tracking-widest">
                Plătește cu cardul
            </button>
        </div>
      </div>
    </div>
  )
}