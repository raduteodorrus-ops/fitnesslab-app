"use client"
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const [member, setMember] = useState<any>(null)
  const [tab, setTab] = useState('pass')
  const [location, setLocation] = useState('Lupeni')
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const loadData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return router.push('/login')
      
      const { data } = await supabase.from('members').select('*').eq('email', user.email).single()
      if (data?.status !== 'active') return router.push('/pay')
      
      setMember(data)
      setLoading(false)
    }
    loadData()
  }, [router])

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-yellow-500 font-black italic uppercase tracking-widest animate-pulse">Loading Lab...</div>

  return (
    <div className="min-h-screen bg-black text-white pb-24 font-sans selection:bg-yellow-500">
      {/* HEADER */}
      <div className="p-6 flex justify-between items-center border-b border-white/5 bg-black/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="text-lg font-black italic uppercase tracking-tighter">
          Fitness<span className="text-yellow-500">Lab</span>
        </div>
        <button onClick={() => supabase.auth.signOut().then(() => router.push('/'))} className="text-zinc-500 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">Logout</button>
      </div>

      <div className="p-6 max-w-md mx-auto mt-4">
        {/* TAB NAVIGATION */}
        <div className="flex bg-zinc-900/80 p-1.5 rounded-2xl mb-8 border border-white/5">
          <button onClick={() => setTab('pass')} className={`flex-1 py-3.5 rounded-xl font-black italic uppercase text-xs tracking-wide transition-all ${tab === 'pass' ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20' : 'text-zinc-500 hover:text-white'}`}>Digital Pass</button>
          <button onClick={() => setTab('classes')} className={`flex-1 py-3.5 rounded-xl font-black italic uppercase text-xs tracking-wide transition-all ${tab === 'classes' ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20' : 'text-zinc-500 hover:text-white'}`}>Classes</button>
        </div>

        {tab === 'pass' ? (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            {/* GLOWING QR CARD */}
            <div className="relative bg-zinc-950 border border-white/10 p-8 md:p-10 rounded-[2.5rem] text-center shadow-2xl overflow-hidden group">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-yellow-500/20 blur-[50px] -z-10"></div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-green-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  Active Member
                </div>
                
                <div className="bg-white p-4 md:p-5 rounded-[2rem] inline-block shadow-[0_0_50px_rgba(234,179,8,0.1)] mb-8">
                  <img src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${member?.email}`} alt="QR Code" className="w-48 h-48 md:w-56 md:h-56" />
                </div>

                {/* USER INFO BAR */}
                <div className="flex items-center gap-4 bg-zinc-900/80 p-4 rounded-2xl border border-white/5 text-left">
                  <div className="w-14 h-14 rounded-xl overflow-hidden border border-white/10 shrink-0">
                    <img 
                      src={member?.photo_url} 
                      onError={(e) => (e.currentTarget.src = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y")}
                      className="w-full h-full object-cover" 
                      alt="Profile" 
                    />
                  </div>
                  <div className="truncate">
                    <h2 className="text-sm font-black italic uppercase tracking-tight text-white truncate">{member?.name}</h2>
                    <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mt-1">Pass Valid 24/7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500">
             {/* LOCATION PICKER */}
            <div className="flex gap-2 overflow-x-auto pb-6 scrollbar-hide">
              {['Lupeni', 'Vulcan', 'Petroșani'].map(loc => (
                <button key={loc} onClick={() => setLocation(loc)} className={`px-5 py-2.5 rounded-full font-black uppercase text-[10px] tracking-widest whitespace-nowrap transition-colors ${location === loc ? 'bg-yellow-500 text-black' : 'bg-zinc-900 text-zinc-400 border border-white/5 hover:bg-zinc-800'}`}>
                  {loc}
                </button>
              ))}
            </div>

            {/* CLASS SCHEDULE */}
            <div className="space-y-3">
              {[
                { time: '17:00', name: 'CrossFit WOD', spots: 'FULL' },
                { time: '18:30', name: 'Pilates Reformer', spots: '3 locuri' },
                { time: '20:00', name: 'Boxing Elite', spots: '10 locuri' }
              ].map((c, i) => (
                <div key={i} className="bg-zinc-950 border border-white/5 p-5 rounded-[1.5rem] flex justify-between items-center hover:border-yellow-500/30 transition-colors">
                  <div>
                    <p className="text-yellow-500 font-black italic text-xs mb-1">{c.time}</p>
                    <h4 className="font-black italic uppercase tracking-tight text-sm">{c.name}</h4>
                    <p className="text-zinc-600 text-[9px] font-bold uppercase tracking-widest mt-1">Sala {location}</p>
                  </div>
                  <button disabled={c.spots === 'FULL'} className={`px-5 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-wider transition-colors ${c.spots === 'FULL' ? 'bg-zinc-900 text-zinc-600' : 'bg-white text-black hover:bg-yellow-500 hover:text-black shadow-lg shadow-white/10'}`}>
                    {c.spots === 'FULL' ? 'Full' : 'Book'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}