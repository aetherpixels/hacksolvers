"use client";
import React, { useState } from 'react';
import { Search, MapPin, Star, ShieldCheck, Zap, ArrowRight, Mic, ClipboardList, Users, CheckCircle, Award } from 'lucide-react';
import Link from 'next/link';
import { useAppContext } from '@/components/Providers';
import { mockServices, mockUsers } from '@/lib/data';
import { useRouter } from 'next/navigation';

export default function CustomerDashboard() {
  const { currentUser, language, bookings, setBookings } = useAppContext();
  const [search, setSearch] = useState('');
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const router = useRouter();

  if (!currentUser) return null;

  const filteredServices = mockServices.filter(s => 
    s.title.toLowerCase().includes(search.toLowerCase()) || 
    s.category.toLowerCase().includes(search.toLowerCase())
  );

  // Helper for images
  const getServiceImage = (id: string) => {
    const images: Record<string, string> = {
      's1': 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=400&q=80',
      's2': 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80',
      's3': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80',
      's4': 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=400&q=80'
    };
    return images[id] || 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80';
  };

  return (
    <div className="bg-[#0b1120] min-h-screen text-slate-50 -mt-8 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16 pb-20">
        
        {/* HERO SECTION */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0f172a] to-[#020617] border border-slate-800 shadow-2xl mt-8">
          {/* Background glow */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
          
          <div className="flex flex-col lg:flex-row min-h-[500px]">
            {/* Left Content */}
            <div className="flex-1 p-8 sm:p-12 lg:p-16 relative z-10 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold mb-6 w-fit">
                <ShieldCheck size={16} /> Verified Cooperative Platform
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-[1.1] tracking-tight">
                Reliable Household &<br/>
                Community Services<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">by Cooperative Workers</span>
              </h1>
              
              <p className="text-slate-400 text-lg mb-10 max-w-xl">
                Connect with skilled, verified cooperative workers for your home, office or community needs. Support local talent. Build a stronger, self-reliant ecosystem.
              </p>

              {/* Search Bar */}
              <div className="relative max-w-2xl group z-50">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Search className="text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={24} />
                </div>
                <input 
                  type="text" 
                  placeholder="Search for services (e.g. plumber, electrician)..." 
                  className="w-full pl-14 pr-32 py-5 rounded-2xl bg-white text-slate-900 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 shadow-xl text-lg transition-all"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className="absolute inset-y-2 right-2 px-6 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all shadow-md">
                  Search
                </button>

                {/* Google-style Search Dropdown */}
                {search.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    {filteredServices.length > 0 ? (
                      <ul className="py-2">
                        {filteredServices.map((service) => (
                          <li key={service.id}>
                            <Link href={`/customer/book/${service.id}`} className="flex items-center gap-4 px-6 py-3 hover:bg-slate-50 transition-colors group/item">
                              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center group-hover/item:bg-emerald-100 group-hover/item:text-emerald-600 transition-colors">
                                <Search size={18} />
                              </div>
                              <div className="text-left">
                                <p className="text-slate-900 font-bold group-hover/item:text-emerald-700">{service.title}</p>
                                <p className="text-slate-500 text-sm font-medium">{service.category}</p>
                              </div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="p-6 text-center text-slate-500 font-medium">
                        No services found matching &quot;{search}&quot;
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-6 mt-8 text-sm font-medium text-slate-300">
                <div className="flex items-center gap-2"><ShieldCheck className="text-emerald-400" size={18}/> Verified Workers</div>
                <div className="flex items-center gap-2"><Award className="text-emerald-400" size={18}/> Fair Prices</div>
                <div className="flex items-center gap-2"><Users className="text-emerald-400" size={18}/> Community Support</div>
              </div>
            </div>

            {/* Right Content / Image Area */}
            <div className="hidden lg:flex flex-1 relative bg-slate-800/50 border-l border-slate-800 overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center opacity-40 mix-blend-luminosity hover:mix-blend-normal hover:opacity-80 transition-all duration-700"></div>
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#0f172a]"></div>
              
              {/* Floating Stat Widgets */}
              <div className="absolute right-8 top-1/2 -translate-y-1/2 space-y-4">
                <div className="bg-[#0f172a]/80 backdrop-blur-md border border-slate-700 p-4 rounded-2xl flex items-center gap-4 shadow-xl translate-x-4">
                  <div className="bg-emerald-500/20 text-emerald-400 p-3 rounded-xl"><Users size={24}/></div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Registered Workers</p>
                    <p className="text-2xl font-black text-white">1,200+</p>
                  </div>
                </div>
                <div className="bg-[#0f172a]/80 backdrop-blur-md border border-slate-700 p-4 rounded-2xl flex items-center gap-4 shadow-xl -translate-x-4">
                  <div className="bg-cyan-500/20 text-cyan-400 p-3 rounded-xl"><Star size={24}/></div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Happy Households</p>
                    <p className="text-2xl font-black text-white">3,500+</p>
                  </div>
                </div>
                <div className="bg-[#0f172a]/80 backdrop-blur-md border border-slate-700 p-4 rounded-2xl flex items-center gap-4 shadow-xl translate-x-2">
                  <div className="bg-emerald-500/20 text-emerald-400 p-3 rounded-xl"><CheckCircle size={24}/></div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Services Completed</p>
                    <p className="text-2xl font-black text-white">12,000+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* POPULAR SERVICES SECTION */}
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white">Popular Services</h2>
              <p className="text-slate-400 font-medium mt-2">Find trusted cooperative workers for all your needs</p>
            </div>
            <Link href="/customer/tracking" className="flex items-center gap-2 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm">
              <ClipboardList size={20} /> View Bookings
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockServices.map(service => (
              <Link key={service.id} href={`/customer/book/${service.id}`} className="block group">
                <div className="bg-[#0f172a] rounded-2xl border border-slate-800 overflow-hidden shadow-lg hover:shadow-emerald-900/20 hover:border-emerald-500/30 transition-all duration-300 h-full flex flex-col hover:-translate-y-1">
                  <div className="h-48 w-full relative">
                    <img src={getServiceImage(service.id)} alt={service.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] to-transparent"></div>
                    <div className="absolute -bottom-4 left-4 w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg border-2 border-[#0f172a] group-hover:-translate-y-2 transition-transform">
                      <Zap size={20} />
                    </div>
                  </div>
                  <div className="p-6 pt-8 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                    <p className="text-sm font-medium text-slate-400 mb-4">{service.category} • 120+ workers</p>
                    <div className="mt-auto flex justify-between items-center text-sm border-t border-slate-800 pt-4">
                      <span className="font-bold text-emerald-400">{service.priceRange}</span>
                      <ArrowRight className="text-slate-500 group-hover:text-emerald-400 transition-colors" size={18} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* HOW IT WORKS & FEATURED WORKERS */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* How It Works */}
          <div className="lg:col-span-1 bg-[#0f172a] rounded-3xl p-8 border border-slate-800">
            <h2 className="text-2xl font-bold text-white mb-2">How It Works</h2>
            <p className="text-slate-400 mb-8">Getting services is simple, safe and fast</p>
            
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[1.4rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
              <div className="relative flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 z-10 shadow-lg shadow-emerald-500/20 shrink-0">
                  <Search size={20}/>
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">1. Search</h4>
                  <p className="text-sm text-slate-400">Browse services by category</p>
                </div>
              </div>
              <div className="relative flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-slate-400 z-10 shrink-0">
                  <Users size={20}/>
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">2. Choose</h4>
                  <p className="text-sm text-slate-400">View worker profiles & ratings</p>
                </div>
              </div>
              <div className="relative flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-slate-400 z-10 shrink-0">
                  <ClipboardList size={20}/>
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">3. Book</h4>
                  <p className="text-sm text-slate-400">Schedule at your convenience</p>
                </div>
              </div>
              <div className="relative flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-slate-600 flex items-center justify-center text-slate-400 z-10 shrink-0">
                  <CheckCircle size={20}/>
                </div>
                <div>
                  <h4 className="font-bold text-white text-lg">4. Get It Done</h4>
                  <p className="text-sm text-slate-400">Service completed perfectly</p>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Workers */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-end mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">Featured Workers</h2>
                <p className="text-slate-400 mt-1">Trusted. Skilled. Cooperative.</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {mockUsers.filter(u => u.role === 'worker').slice(0, 2).map(worker => (
                <div key={worker.id} className="bg-[#0f172a] p-6 rounded-3xl border border-slate-800 flex items-center gap-4 hover:border-slate-700 transition-colors">
                  <div className="w-20 h-20 bg-slate-800 rounded-2xl overflow-hidden shrink-0 border border-slate-700">
                    <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(worker.name.replace(' (Worker)', ''))}&background=0284c7&color=fff&size=120`} alt={worker.name} className="w-full h-full object-cover"/>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">{worker.name.replace(' (Worker)', '')}</h4>
                    <p className="text-emerald-400 text-sm font-medium mb-1">Verified Professional</p>
                    <div className="flex items-center gap-3 text-sm text-slate-400">
                      <span className="flex items-center gap-1 text-yellow-500"><Star size={14} fill="currentColor"/> {worker.rating || 4.5}</span>
                      <span className="flex items-center gap-1"><MapPin size={14}/> Local Area</span>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="sm:col-span-2 bg-gradient-to-r from-emerald-600 to-teal-800 rounded-3xl p-8 flex flex-col sm:flex-row justify-between items-center gap-6 shadow-xl shadow-emerald-900/20">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Be a Worker. Be a Changemaker.</h3>
                  <p className="text-emerald-50 max-w-md">Join our cooperative and get more work opportunities, fair pay, and community support without middlemen cutting your earnings.</p>
                </div>
                <button className="whitespace-nowrap px-8 py-4 bg-white text-emerald-700 font-extrabold rounded-xl hover:scale-105 transition-transform shadow-lg">
                  Join Cooperative Now
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Emergency Floating Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button 
          onClick={() => setShowEmergencyModal(true)}
          className="bg-red-500 hover:bg-red-600 text-white font-extrabold px-6 py-4 rounded-2xl shadow-2xl shadow-red-500/30 flex items-center gap-3 hover:-translate-y-1 transition-all border border-red-400"
        >
          <Zap size={24} fill="currentColor" />
          Emergency Booking
        </button>
      </div>

      {/* Emergency Modal */}
      {showEmergencyModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-[#0f172a] rounded-3xl shadow-2xl p-6 sm:p-8 w-full max-w-lg border border-slate-700 animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 mb-2 text-red-500">
              <Zap size={24} fill="currentColor" />
              <h2 className="text-2xl font-extrabold text-white">What&apos;s the emergency?</h2>
            </div>
            <p className="text-slate-400 font-medium mb-6">Select the required service. We will dispatch the nearest verified worker immediately.</p>
            
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
                  className="flex flex-col items-center justify-center p-4 bg-slate-800/50 hover:bg-red-500 hover:text-white text-slate-300 border border-slate-700 hover:border-red-500 rounded-2xl transition-all shadow-sm font-bold group"
                >
                  {s.title}
                </button>
              ))}
            </div>
            
            <button 
              onClick={() => setShowEmergencyModal(false)}
              className="mt-6 w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl transition-colors"
            >
              Cancel Request
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
