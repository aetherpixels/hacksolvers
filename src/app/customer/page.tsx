"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { mockServices } from '@/lib/data';
import { useAppContext } from '@/components/Providers';
import { Mic, Search, ClipboardList, ArrowRight, Star, ShieldCheck, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CustomerDashboard() {
  const { language, currentUser, bookings, setBookings } = useAppContext();
  const [search, setSearch] = useState('');
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const router = useRouter();

  if (!currentUser) return null;

  const filteredServices = mockServices.filter(s => 
    s.title.toLowerCase().includes(search.toLowerCase()) || 
    s.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-12 pb-12">
      {/* Emergency Booking Banner */}
      <div className="bg-gradient-to-r from-rose-600 to-red-600 rounded-2xl p-6 text-white shadow-xl shadow-red-600/20 flex flex-col md:flex-row items-center justify-between gap-4 mt-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-full animate-pulse">
            <Zap size={28} />
          </div>
          <div>
            <h2 className="text-xl font-extrabold tracking-wide">EMERGENCY SERVICES REQUIRED?</h2>
            <p className="text-red-100 font-medium text-sm mt-1">Get immediate assistance. Verified workers dispatched in minutes.</p>
          </div>
        </div>
        <button 
          onClick={() => setShowEmergencyModal(true)}
          className="bg-white text-red-600 font-extrabold px-6 py-3 rounded-xl hover:scale-105 transition-transform shadow-lg whitespace-nowrap"
        >
          Request Emergency Booking
        </button>
      </div>

      <div className="relative bg-gradient-to-br from-indigo-700 to-violet-800 rounded-3xl p-8 sm:p-12 lg:p-16 text-white shadow-2xl shadow-indigo-900/20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-sm font-semibold mb-6">
            100% Cooperative Owned
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
            {language === 'en' ? 'Find Trusted Local Experts' : 'विश्वसनीय स्थानीय विशेषज्ञ खोजें'}
          </h1>
          <p className="text-indigo-100 text-lg sm:text-xl font-medium mb-10 opacity-90">
            Book verified professionals for your home needs. Support fair wages and zero corporate commissions.
          </p>

          <div className="relative max-w-xl group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={24} />
            </div>
            <input 
              type="text" 
              placeholder={language === 'en' ? "What do you need help with today?" : "आज आपको किस चीज़ में मदद चाहिए?"} 
              className="w-full pl-12 pr-16 py-4 rounded-2xl border-2 border-transparent bg-white text-gray-900 focus:outline-none focus:border-indigo-500 shadow-xl text-lg transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button 
              className="absolute inset-y-2 right-2 px-3 flex items-center bg-gray-100 hover:bg-indigo-100 text-gray-600 hover:text-indigo-600 rounded-xl transition-colors"
              title="Voice Search (Mock)"
              onClick={() => alert("Voice search activated! Speak now...")}
            >
              <Mic size={20} />
            </button>
          </div>
        </div>
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center gap-4 px-2">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Popular Services</h2>
          <p className="text-gray-500 font-medium mt-1">Select a category to view available cooperative members</p>
        </div>
        <Link href="/customer/tracking" className="flex items-center gap-2 text-gray-700 bg-white border-2 border-gray-200 hover:border-indigo-600 hover:text-indigo-600 px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm hover:shadow-md">
          <ClipboardList size={20} />
          {language === 'en' ? 'My Bookings' : 'मेरी बुकिंग'}
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-2">
        {filteredServices.map(service => (
          <Link key={service.id} href={`/customer/book/${service.id}`} className="block group">
            <div className="bg-white rounded-3xl p-6 border-2 border-gray-100 shadow-sm hover:shadow-xl hover:border-indigo-400/30 transition-all duration-300 relative overflow-hidden flex flex-col h-full hover:-translate-y-1">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 group-hover:scale-150 transition-all duration-500 text-indigo-600">
                <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2z"/></svg>
              </div>
              
              <div className="bg-indigo-50 w-16 h-16 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300 shadow-inner mb-6 relative z-10">
                <ShieldCheck size={32} />
              </div>
              
              <div className="mt-auto relative z-10">
                <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">{service.category}</p>
                <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{service.title}</h3>
                <div className="flex items-center gap-1 mb-4 text-yellow-500">
                  <Star size={16} fill="currentColor" />
                  <span className="text-sm font-bold text-gray-700">4.9 <span className="text-gray-400 font-normal">(120+ reviews)</span></span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <p className="text-sm font-extrabold text-gray-900">{service.priceRange}</p>
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Emergency Modal */}
      {showEmergencyModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 w-full max-w-lg border-2 border-red-100 animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 mb-2 text-red-600">
              <Zap size={24} />
              <h2 className="text-2xl font-extrabold text-gray-900">What&apos;s the emergency?</h2>
            </div>
            <p className="text-gray-500 font-medium mb-6">Select the required service. We will dispatch the nearest verified worker immediately.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {mockServices.map(s => (
                <button 
                  key={s.id}
                  onClick={() => {
                    const emergencyBooking = {
                      id: `b${Date.now()}`,
                      customerId: currentUser.id,
                      serviceId: s.id,
                      status: 'Accepted' as const,
                      address: 'Your Current GPS Location',
                      date: 'Today',
                      timeSlot: 'Immediately (Emergency)'
                    };
                    setBookings([emergencyBooking, ...bookings]);
                    router.push('/customer/tracking');
                  }}
                  className="flex flex-col items-center justify-center p-4 bg-red-50 hover:bg-red-500 hover:text-white text-red-700 border border-red-100 rounded-2xl transition-all shadow-sm font-bold group"
                >
                  {s.title}
                </button>
              ))}
            </div>
            
            <button 
              onClick={() => setShowEmergencyModal(false)}
              className="mt-6 w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold rounded-xl transition-colors"
            >
              Cancel Request
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
