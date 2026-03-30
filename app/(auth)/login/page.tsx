"use client"
import { supabase } from '@/lib/supabase'
import { useState } from 'react'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)

  const handleGoogleLogin = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // Redirecționăm utilizatorul către procesul de onboarding după login
        redirectTo: `${window.location.origin}/onboarding`,
      },
    })
    if (error) alert(error.message)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#111] p-10 rounded-3xl border border-white/5 shadow-2xl text-center">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter text-blue-500 mb-2">Fitness Lab</h1>
        <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-12">Acces Portal Membri</p>
        
        <button 
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-200 text-black font-bold py-4 rounded-xl transition-all disabled:opacity-50"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <img src="https://authjs.dev/img/providers/google.svg" alt="Google" className="w-5 h-5" />
              Continuă cu Google
            </>
          )}
        </button>
        
        <p className="mt-8 text-[10px] text-slate-700 font-bold uppercase tracking-widest">
          Prin continuare, accepți Termenii și Condițiile Fitness Lab.
        </p>
      </div>
    </div>
  )
}