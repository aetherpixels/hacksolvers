"use client";
import React from 'react';
import Link from 'next/link';
import { useAppContext } from './Providers';
import { Globe, LogOut, LayoutDashboard } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

export function Navbar() {
  const { currentUser, setCurrentUser, language, setLanguage } = useAppContext();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    setCurrentUser(null);
    router.push('/login');
  };

  if (pathname === '/login') return null;

  return (
    <nav className="sticky top-0 z-50 bg-[#0F172A] border-b border-slate-800 shadow-lg transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-[#2563EB] text-white p-2 rounded-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-blue-500/30">
            <LayoutDashboard size={24} />
          </div>
          <span className="text-2xl font-extrabold text-white tracking-tight">
            {language === 'en' ? 'CoopGig' : 'सहकारीगिग'}
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <button 
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')} 
            className="flex items-center gap-1.5 text-slate-300 hover:text-blue-400 font-semibold text-sm bg-slate-800 px-4 py-2 rounded-full border border-slate-700 hover:border-blue-500/50 transition-all duration-150 shadow-[0_4px_0_0_#020617] hover:shadow-[0_4px_0_0_#1e3a8a] active:shadow-[0_0px_0_0_#1e3a8a] active:translate-y-[4px]"
          >
            <Globe size={16} />
            <span>{language === 'en' ? 'EN' : 'HI'}</span>
          </button>

          {currentUser && (
            <div className="flex items-center gap-4 pl-6 border-l border-slate-700">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-sm font-bold text-white leading-tight">{currentUser.name}</span>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">{currentUser.role}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-red-950 text-slate-300 hover:text-red-400 rounded-xl border border-slate-700 hover:border-red-500/50 font-semibold text-sm transition-all duration-150 shadow-[0_4px_0_0_#020617] hover:shadow-[0_4px_0_0_#450a0a] active:shadow-[0_0px_0_0_#450a0a] active:translate-y-[4px]"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
