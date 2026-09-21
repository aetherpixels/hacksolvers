"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/components/Providers';
import { mockUsers } from '@/lib/data';
import Link from 'next/link';
import { ShieldCheck, HandCoins, Users, Phone, Lock, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { setCurrentUser } = useAppContext();
  const [roleTabs, setRoleTabs] = useState<'customer' | 'worker' | 'admin'>('customer');
  const [phone, setPhone] = useState('9876543210');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');

  const handleTabChange = (role: 'customer' | 'worker' | 'admin') => {
    setRoleTabs(role);
    if (role === 'customer') setPhone('9876543210');
    if (role === 'worker') setPhone('9876543211');
    if (role === 'admin') setPhone('9000000000');
    setError('');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = mockUsers.find(u => u.phone === phone);
    if (user) {
      setCurrentUser(user);
      if (user.role === 'customer') router.push('/customer');
      else if (user.role === 'worker') router.push('/worker');
      else if (user.role === 'admin') router.push('/admin');
    } else {
      setError('Account not found. Please check the credentials.');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-76px)] -m-4 sm:-m-6 lg:-m-8 font-sans overflow-hidden bg-slate-50">
      
      {/* Left Thematic Panel */}
      <div className="hidden lg:flex w-1/2 bg-[#2563EB] text-white p-12 xl:p-20 flex-col justify-center relative">
        {/* Subtle background pattern / glowing radial blur */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-white/20 rounded-full blur-3xl mix-blend-overlay"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-indigo-900/40 rounded-full blur-3xl mix-blend-overlay"></div>
        
        <div className="relative z-10 mb-12">
          <h1 className="text-4xl xl:text-5xl font-extrabold mb-6 leading-tight tracking-tight">
            Empowering Workers.<br/>
            Serving <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-200 drop-shadow-sm">Communities.</span>
          </h1>
          <p className="text-blue-100 text-lg max-w-md leading-relaxed font-medium">
            Join the digital marketplace owned by Labour Cooperative Societies. Fair wages for workers, reliable services for you.
          </p>
        </div>

        <div className="space-y-6 relative z-10">
          <div className="flex items-start gap-5 p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/15 transition-all duration-300">
            <div className="p-3 bg-white/10 rounded-lg">
              <ShieldCheck size={28} className="text-blue-100"/>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1 tracking-wide">Verified Professionals</h3>
              <p className="text-blue-100 text-sm">Every worker is eKYC & skill-certified.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-5 p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/15 transition-all duration-300">
            <div className="p-3 bg-white/10 rounded-lg">
              <HandCoins size={28} className="text-blue-100"/>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1 tracking-wide">Zero Hidden Commissions</h3>
              <p className="text-blue-100 text-sm">Workers keep what they earn. No corporate greed.</p>
            </div>
          </div>

          <div className="flex items-start gap-5 p-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white/15 transition-all duration-300">
            <div className="p-3 bg-white/10 rounded-lg">
              <Users size={28} className="text-blue-100"/>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1 tracking-wide">Cooperative Owned</h3>
              <p className="text-blue-100 text-sm">Governed democratically by the workforce.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Login Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-[#F8FAFC] relative z-10">
        <div className="w-full max-w-md">
          
          <div className="text-center lg:text-left mb-8">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome Back</h2>
            <p className="text-slate-500 mt-2 font-medium">Sign in to your cooperative account</p>
          </div>

          {/* Segmented Control Role Tabs */}
          <div className="flex p-1 bg-slate-200/60 rounded-xl mb-8 gap-1">
            {(['customer', 'worker', 'admin'] as const).map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => handleTabChange(role)}
                className={`flex-1 py-2.5 text-sm font-bold rounded-lg capitalize transition-all duration-150 ${
                  roleTabs === role 
                    ? 'bg-[#1D4ED8] text-white shadow-[0_4px_0_0_#1e3a8a] translate-y-[-2px]' 
                    : 'bg-white text-slate-500 hover:text-slate-700 shadow-[0_4px_0_0_#cbd5e1] hover:shadow-[0_4px_0_0_#94a3b8] hover:translate-y-[-2px] active:translate-y-[2px] active:shadow-[0_0px_0_0_#94a3b8]'
                }`}
              >
                {role}
              </button>
            ))}
          </div>

          {/* Form Card */}
          <form onSubmit={handleLogin} className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 space-y-6">
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Phone Number</label>
                <div className="relative flex items-center">
                  <Phone className="absolute left-4 text-slate-300" size={20} />
                  <input 
                    type="text" 
                    className="w-full pl-12 pr-4 py-3 bg-[#666666] border border-[#666666] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/50 focus:border-[#2563EB] text-white placeholder-slate-300 font-medium transition-colors duration-200 disabled:bg-[#CBD5E1] disabled:text-slate-500"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Password</label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-4 text-slate-300" size={20} />
                  <input 
                    type="password" 
                    className="w-full pl-12 pr-4 py-3 bg-[#666666] border border-[#666666] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/50 focus:border-[#2563EB] text-white placeholder-slate-300 font-medium transition-colors duration-200 disabled:bg-[#CBD5E1] disabled:text-slate-500"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-xl">
                <p className="text-red-600 text-sm font-semibold">{error}</p>
              </div>
            )}
            
            <button 
              type="submit" 
              className="w-full bg-[#2563EB] text-white font-bold py-4 rounded-full flex justify-center items-center gap-2 transition-all duration-150 shadow-[0_6px_0_0_#1d4ed8] hover:shadow-[0_6px_0_0_#1e40af] active:shadow-[0_0px_0_0_#1e40af] active:translate-y-[6px]"
            >
              Secure Login <ArrowRight size={20} />
            </button>
          </form>
          
          <p className="text-center text-sm text-slate-500 mt-8 font-medium">
            New to the platform? <Link href="#" className="text-blue-600 font-bold hover:underline transition-all duration-200">Join the Cooperative</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
