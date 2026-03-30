"use client"

interface OnboardingFlowProps {
  onNavigate: (screen: any) => void
  userData: any
  setUserData: (data: any) => void
}

export function OnboardingFlow({ onNavigate, userData, setUserData }: OnboardingFlowProps) {
  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center text-center">
      <h1 className="text-[#EAB308] font-black italic text-2xl uppercase mb-4">Setup Your Profile</h1>
      <p className="text-zinc-500 mb-10 font-bold uppercase tracking-widest text-[10px]">Step 1: Your Info</p>
      
      <div className="bg-zinc-900 border border-white/10 p-8 rounded-[2rem] w-full max-w-sm">
        <p className="text-white font-bold mb-2">Welcome, {userData?.fullName}!</p>
        <p className="text-zinc-500 text-xs mb-8">Let's get your membership started.</p>
        
        <button 
          onClick={() => onNavigate("payment")}
          className="bg-[#EAB308] text-black font-black py-4 px-8 rounded-2xl w-full uppercase tracking-tighter"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  )
}