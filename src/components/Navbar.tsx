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
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-100 shadow-[0_4px_30px_rgb(0,0,0,0.03)] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-gradient-to-tr from-indigo-600 to-violet-500 text-white p-2 rounded-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-indigo-500/30">
            <LayoutDashboard size={24} />
          </div>
          <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 tracking-tight">
            {language === 'en' ? 'CoopGig' : 'सहयोग-गिग'}
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <button 
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')} 
            className="flex items-center gap-1.5 text-gray-500 hover:text-indigo-600 transition-colors font-semibold text-sm bg-white/50 px-3 py-1.5 rounded-full border border-gray-200 hover:border-indigo-200"
          >
            <Globe size={16} />
            <span>{language === 'en' ? 'EN' : 'HI'}</span>
          </button>

          {currentUser && (
            <div className="flex items-center gap-4 pl-6 border-l border-gray-200">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-sm font-bold text-gray-900 leading-tight">{currentUser.name}</span>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">{currentUser.role}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-xl transition-all border border-gray-200 hover:border-red-200 font-semibold text-sm"
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
