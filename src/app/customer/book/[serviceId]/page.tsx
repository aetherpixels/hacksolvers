"use client";
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { mockServices, mockUsers } from '@/lib/data';
import { useAppContext } from '@/components/Providers';
import { MapPin, Calendar, Clock, CheckCircle2, ArrowLeft, Star, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function BookingPage() {
  const { serviceId } = useParams();
  const router = useRouter();
  const { currentUser, language, bookings, setBookings } = useAppContext();
  
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('Morning (09:00 AM - 12:00 PM)');

  if (!currentUser) return null;

  const service = mockServices.find(s => s.id === serviceId);

  // Mock nearby workers
  const nearbyWorkers = mockUsers.filter(u => u.role === 'worker' && u.status === 'online');

  const handleBook = () => {
    const newBooking = {
      id: `b${Date.now()}`,
      customerId: currentUser.id,
      serviceId: service?.id || '',
      status: 'Pending' as const,
      address,
      date,
      timeSlot
    };
    setBookings([newBooking, ...bookings]);
    setStep(3); // Success step
  };

  if (!service) return <div>Service not found</div>;

  return (
    <div className="max-w-3xl mx-auto py-8">
      <Link href="/customer" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#1aae55] font-semibold mb-6 transition-colors">
        <ArrowLeft size={20} /> Back to Services
      </Link>
      
      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gray-50 border-b border-gray-100 p-6 md:p-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-1">
              {language === 'en' ? `Book ${service.title}` : `${service.title} बुक करें`}
            </h1>
            <p className="text-sm font-bold text-[#1aae55] uppercase tracking-wider">{service.category}</p>
          </div>
          <div className="hidden sm:block text-right">
            <p className="text-sm text-gray-500 font-medium">Estimated Price</p>
            <p className="text-xl font-bold text-gray-900">{service.priceRange}</p>
          </div>
        </div>

        <div className="p-6 md:p-8">
          {/* Progress Bar */}
          <div className="flex items-center justify-between mb-10 relative">
            <div className="absolute left-0 top-1/2 w-full h-1 bg-gray-100 -z-10 -translate-y-1/2"></div>
            <div className={`absolute left-0 top-1/2 h-1 bg-[#1aae55] -z-10 -translate-y-1/2 transition-all duration-500 ${step === 1 ? 'w-0' : step === 2 ? 'w-1/2' : 'w-full'}`}></div>
            
            {[1, 2, 3].map(i => (
              <div key={i} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                step >= i ? 'bg-[#1aae55] text-white shadow-lg shadow-green-500/30' : 'bg-gray-200 text-gray-500'
              }`}>
                {step > i ? <CheckCircle2 size={20} /> : i}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Service Address</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 text-gray-400" size={22} />
                  <input 
                    type="text" 
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1aae55]/50 focus:border-[#1aae55] text-gray-900 font-medium transition-all shadow-sm" 
                    placeholder="Enter complete address (e.g. 123 MG Road)"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-4 text-gray-400" size={22} />
                    <input 
                      type="date" 
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1aae55]/50 focus:border-[#1aae55] text-gray-900 font-medium transition-all shadow-sm"
                      value={date}
                      onChange={e => setDate(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Time Slot</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-4 text-gray-400" size={22} />
                    <select 
                      className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1aae55]/50 focus:border-[#1aae55] appearance-none text-gray-900 font-medium transition-all shadow-sm cursor-pointer"
                      value={timeSlot}
                      onChange={e => setTimeSlot(e.target.value)}
                    >
                      <option>Morning (09:00 AM - 12:00 PM)</option>
                      <option>Afternoon (12:00 PM - 04:00 PM)</option>
                      <option>Evening (04:00 PM - 08:00 PM)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  disabled={!address || !date}
                  onClick={() => setStep(2)}
                  className="w-full bg-[#1aae55] text-white font-bold py-4 rounded-xl hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-green-500/30 text-lg"
                >
                  Find Available Workers
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 text-[#1aae55] mb-4">
                  <MapPin size={32} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Nearby Workers Found!</h2>
                <p className="text-gray-500 font-medium mt-2 max-w-md mx-auto">Our cooperative algorithm matched you with verified members nearby.</p>
              </div>
              
              <div className="space-y-4 max-w-lg mx-auto">
                {nearbyWorkers.map(w => (
                  <div key={w.id} className="flex items-center justify-between p-4 border border-green-100 rounded-2xl bg-green-50/50 hover:bg-green-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-700 font-black text-lg shadow-sm">
                        {w.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{w.name}</p>
                        <p className="text-xs font-bold text-[#1aae55] flex items-center gap-1 mt-0.5">
                          <ShieldCheck size={14} /> Co-op Verified
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg border border-gray-200 font-bold text-gray-700">
                      <Star size={14} className="text-yellow-500" fill="currentColor"/> {w.rating}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 pt-8 max-w-lg mx-auto">
                <button onClick={() => setStep(1)} className="w-1/3 py-4 border-2 border-gray-200 rounded-xl hover:bg-gray-50 font-bold text-gray-600 transition-colors">Back</button>
                <button onClick={handleBook} className="w-2/3 py-4 bg-[#1aae55] text-white rounded-xl hover:bg-green-600 font-bold shadow-lg shadow-green-500/30 transition-all text-lg">Confirm Booking</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-12 animate-in zoom-in-95 duration-500 space-y-6">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-50 text-[#1aae55]">
                <CheckCircle2 size={48} />
              </div>
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Booking Confirmed!</h2>
                <p className="text-gray-500 font-medium max-w-sm mx-auto">Your request has been broadcast to cooperative workers in your area.</p>
              </div>
              <div className="pt-4">
                <button 
                  onClick={() => router.push('/customer/tracking')}
                  className="inline-block bg-gray-900 text-white font-bold py-3.5 px-8 rounded-xl hover:bg-gray-800 transition-all shadow-lg"
                >
                  Track My Booking
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
