"use client"
import { useEffect, useState, useRef } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'
import { supabase } from '@/lib/supabase'

export default function AdminScanner() {
  const [result, setResult] = useState<{ status: 'SUCCESS' | 'ERROR', name: string, photo: string, msg?: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const scannerRef = useRef<Html5QrcodeScanner | null>(null)

  const stopScanner = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.clear()
        scannerRef.current = null
      } catch (e) {
        console.error("Error stopping scanner:", e)
      }
    }
  }

  const handleScan = async (email: string) => {
    if (loading || result) return
    setLoading(true)
    await stopScanner()

    const cleanEmail = email.trim().toLowerCase()

    try {
      // Interogăm Supabase
      const { data: member, error } = await supabase
        .from('members')
        .select('name, status, photo_url')
        .eq('email', cleanEmail)
        .maybeSingle() // Folosim maybeSingle în loc de single pentru a evita erorile de tip "406"

      if (error) throw new Error(`Eroare DB: ${error.message}`)
      
      if (!member) {
        throw new Error(`Email-ul "${cleanEmail}" nu a fost găsit în baza de date FitnessLab.`)
      }

      if (member.status !== 'active') {
        throw new Error(`Acces Refuzat: Abonamentul tău este ${member.status?.toUpperCase() || 'INACTIV'}`)
      }

      setResult({
        status: 'SUCCESS',
        name: member.name || "Membru FitnessLab",
        photo: member.photo_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fitness'
      })

    } catch (err: any) {
      setResult({
        status: 'ERROR',
        name: "ACCES RESPINS",
        photo: "",
        msg: err.message
      })
    } finally {
      setLoading(false)
    }
  }

  const resetScanner = () => {
    setResult(null)
    window.location.reload() // Metoda sigură pentru a reporni camera pe mobil
  }

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", { 
      fps: 10, 
      qrbox: 250,
      supportedScanTypes: [0] 
    }, false)
    scannerRef.current = scanner
    scanner.render(handleScan, () => {})
    
    return () => {
      stopScanner()
    }
  }, [])

  // ECRAN REZULTAT (PAGINA NOUĂ)
  if (result) {
    return (
      <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center p-6 text-white ${result.status === 'SUCCESS' ? 'bg-emerald-600' : 'bg-rose-600'}`}>
        <div className="text-9xl mb-6 animate-bounce">
          {result.status === 'SUCCESS' ? '✅' : '❌'}
        </div>

        {result.status === 'SUCCESS' && result.photo && (
          <div className="w-48 h-48 rounded-full border-8 border-white/30 overflow-hidden shadow-2xl mb-6 bg-black/20">
            <img src={result.photo} alt="Client" className="w-full h-full object-cover" />
          </div>
        )}

        <div className="text-center">
          <h2 className="text-5xl font-black italic tracking-tighter uppercase mb-2">
            {result.status === 'SUCCESS' ? 'ACCES PERMIS' : 'ACCES RESPINS'}
          </h2>
          <p className="text-2xl font-bold opacity-90 mb-12">
            {result.status === 'SUCCESS' ? result.name : result.msg}
          </p>
          
          <button 
            onClick={resetScanner}
            className="px-12 py-5 bg-white text-black font-black italic rounded-full text-xl uppercase hover:scale-105 transition-all shadow-xl active:scale-95"
          >
            SCANEAZĂ URMĂTORUL →
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#0a0a0a] p-6 pt-12">
      <h1 className="text-blue-500 font-black italic text-3xl mb-8 tracking-tighter">FITNESSLAB SCAN</h1>
      
      <div id="reader" className="w-full max-w-sm rounded-3xl overflow-hidden border-2 border-slate-800 shadow-2xl bg-black"></div>

      <div className="mt-12 text-slate-600 text-center uppercase tracking-widest text-[10px] font-bold">
        Sistem activ • Așteptare cod QR
      </div>

      {loading && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[110]">
          <div className="text-white font-black italic animate-pulse text-2xl tracking-tighter uppercase">
            Verificare Bază Date...
          </div>
        </div>
      )}
    </div>
  )
}