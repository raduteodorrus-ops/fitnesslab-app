"use client"

interface PaymentScreenProps {
  onNavigate: (screen: any) => void
  userData: any
}

export function PaymentScreen({ onNavigate, userData }: PaymentScreenProps) {
  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center text-center">
      <h1 className="text-[#EAB308] font-black italic text-2xl uppercase mb-8">Membership Payment</h1>
      <div className="bg-zinc-900 border border-white/10 p-8 rounded-[2rem] w-full max-w-sm">
        <p className="text-zinc-400 text-xs uppercase font-black mb-4">Total to pay: 150 RON</p>
        <button 
          onClick={() => onNavigate("dashboard")}
          className="bg-[#EAB308] text-black font-black py-4 px-8 rounded-2xl w-full uppercase tracking-tighter shadow-xl"
        >
          Complete Payment
        </button>
      </div>
    </div>
  )
}