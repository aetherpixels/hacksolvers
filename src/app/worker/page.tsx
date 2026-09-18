"use client";
import React, { useState } from 'react';
import { useAppContext } from '@/components/Providers';
import { mockServices } from '@/lib/data';
import Link from 'next/link';
import { MapPin, CheckCircle, XCircle, Wallet, Users, Clock, AlertCircle, Star, Zap } from 'lucide-react';

export default function WorkerDashboard() {
  const { users, currentUser, bookings, setBookings, setUsers } = useAppContext();
  const [availableNow, setAvailableNow] = useState(false);
  const [cancelModalBookingId, setCancelModalBookingId] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState<string>('');

  if (!currentUser) return null;

  const availableJobs = bookings.filter(b => b.status === 'Pending');
  const myJobs = bookings.filter(b => b.workerId === currentUser.id && b.status !== 'Completed');

  const toggleStatus = () => {
    const newStatus = currentUser.status === 'online' ? 'offline' : 'online';
    setUsers(users.map(u => u.id === currentUser.id ? { ...u, status: newStatus } : u));
    currentUser.status = newStatus;
  };

  const handleCancel = () => {
    if (!cancelReason || !cancelModalBookingId) return;
    setBookings(bookings.map(b => b.id === cancelModalBookingId ? { ...b, status: 'Cancelled', cancelReason } : b));
    setCancelModalBookingId(null);
    setCancelReason('');
  };

  const handleAccept = (bookingId: string) => {
    setBookings(bookings.map(b => b.id === bookingId ? { ...b, status: 'Accepted', workerId: currentUser.id } : b));
  };

  const handleComplete = (bookingId: string) => {
    setBookings(bookings.map(b => b.id === bookingId ? { ...b, status: 'Completed' } : b));
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="space-y-8 max-w-7xl mx-auto py-8">
      <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mt-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-indigo-600"></div>
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Worker Command Center</h1>
          <p className="text-gray-500 font-medium mt-1">Welcome back, {currentUser.name}. You are making a difference today!</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/worker/earnings" className="group flex items-center gap-2 bg-gradient-to-r from-gray-900 to-gray-800 text-white px-5 py-2.5 rounded-xl font-bold hover:shadow-lg transition-all">
            <Wallet size={18} className="text-indigo-400 group-hover:scale-110 transition-transform" /> 
            Earnings
          </Link>
          
          <button 
            onClick={() => setAvailableNow(!availableNow)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold border-2 transition-all shadow-sm ${
              availableNow 
                ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100' 
                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
            }`}
          >
            <Zap size={18} className={availableNow ? 'text-rose-600' : 'text-gray-400'} />
            {availableNow ? 'Available for Emergencies' : 'Enable Emergency Gigs'}
          </button>

          <button 
            onClick={toggleStatus}
            className={`flex items-center gap-3 px-5 py-2.5 rounded-xl font-bold border-2 transition-all shadow-sm ${
              currentUser.status === 'online' 
                ? 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100' 
                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
            }`}
          >
            <span className="relative flex h-3 w-3">
              {currentUser.status === 'online' && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>}
              <span className={`relative inline-flex rounded-full h-3 w-3 ${currentUser.status === 'online' ? 'bg-indigo-600' : 'bg-gray-400'}`}></span>
            </span>
            {currentUser.status === 'online' ? 'Receiving Jobs' : 'Go Online'}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {myJobs.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-indigo-600 mb-2">
                <AlertCircle size={20} />
                <h3 className="text-xl font-bold">Your Active Tasks</h3>
              </div>
              <div className="grid gap-4">
                {myJobs.map(job => {
                  const service = mockServices.find(s => s.id === job.serviceId);
                  return (
                    <div key={job.id} className="bg-gradient-to-r from-indigo-50 to-white border border-indigo-200 rounded-2xl p-6 shadow-md relative overflow-hidden">
                      <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">IN PROGRESS</div>
                      <h4 className="text-xl font-bold text-gray-900 mb-1">{service?.title || 'Emergency Request'}</h4>
                      <div className="space-y-2 mt-4 text-sm font-medium text-gray-600">
                        <p className="flex items-center gap-2"><MapPin size={16} className="text-indigo-500"/> {job.address}</p>
                        <p className="flex items-center gap-2"><Clock size={16} className="text-indigo-500"/> {job.date} | {job.timeSlot}</p>
                      </div>
                      <div className="mt-6 flex flex-col sm:flex-row gap-3">
                        <button onClick={() => handleComplete(job.id)} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-indigo-500/30">
                          <CheckCircle size={18} /> Mark as Completed
                        </button>
                        <button 
                          onClick={() => setCancelModalBookingId(job.id)}
                          className="flex-1 bg-white border-2 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 px-6 py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
                        >
                          <XCircle size={18} /> Cancel Task
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Users className="text-indigo-600" /> Job Board
              </h2>
            </div>

            <div className="grid gap-5">
              {availableJobs.length === 0 ? (
                <div className="bg-white border-2 border-dashed border-gray-200 p-12 rounded-3xl text-center">
                  <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                    <AlertCircle size={24} />
                  </div>
                  <p className="text-lg font-bold text-gray-900">No new jobs in your area</p>
                </div>
              ) : (
                availableJobs.map(job => {
                  const service = mockServices.find(s => s.id === job.serviceId);
                  return (
                    <div key={job.id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-indigo-400/30 transition-all group">
                      <div className="flex flex-col md:flex-row justify-between gap-6">
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-xl font-bold text-gray-900">{service?.title || 'Emergency Request'}</h4>
                            <span className="bg-indigo-100 text-indigo-700 font-bold px-3 py-1 rounded-full text-sm border border-indigo-200">
                              {service?.priceRange || 'Standard Rate'}
                            </span>
                          </div>
                          
                          <div className="grid sm:grid-cols-2 gap-3 mt-4">
                            <p className="text-sm font-medium text-gray-600 flex items-start gap-2 bg-gray-50 p-3 rounded-lg border border-gray-100">
                              <MapPin size={16} className="text-gray-400 shrink-0 mt-0.5"/> {job.address}
                            </p>
                            <p className="text-sm font-medium text-gray-600 flex items-start gap-2 bg-gray-50 p-3 rounded-lg border border-gray-100">
                              <Clock size={16} className="text-gray-400 shrink-0 mt-0.5"/> 
                              <span>{job.date}<br/>{job.timeSlot}</span>
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex md:flex-col gap-3 md:w-32 justify-end">
                          <button onClick={() => handleAccept(job.id)} className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 transition-all">
                            <CheckCircle size={18} /> Accept
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-900 to-indigo-800 rounded-3xl p-6 text-white shadow-xl">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Star className="text-yellow-400"/> Rating & Trust</h3>
            <div className="flex items-end gap-3 mb-4">
              <span className="text-5xl font-black">4.8</span>
              <span className="text-indigo-200 font-medium mb-1">/ 5.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Modal */}
      {cancelModalBookingId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 w-full max-w-md border-2 border-red-100 animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 mb-4 text-red-600">
              <AlertCircle size={28} />
              <h2 className="text-2xl font-extrabold text-gray-900">Cancel Task</h2>
            </div>
            <p className="text-gray-500 font-medium mb-6">Are you sure you want to cancel this assigned task? Providing a valid reason helps maintain your platform rating.</p>
            
            <textarea
              className="w-full border-2 border-gray-200 rounded-2xl p-4 mb-6 focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/10 transition-all font-medium resize-none h-32"
              placeholder="E.g., Vehicle broke down, emergency at home..."
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
            ></textarea>
            
            <div className="flex gap-4">
              <button 
                onClick={() => {
                  setCancelModalBookingId(null);
                  setCancelReason('');
                }}
                className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold rounded-xl transition-colors"
              >
                Go Back
              </button>
              <button 
                onClick={handleCancel}
                disabled={!cancelReason.trim()}
                className="flex-1 py-3 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors shadow-lg shadow-red-500/30"
              >
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
