"use client";
import React from 'react';
import { useAppContext } from '@/components/Providers';
import { Users, BarChart3, ShieldAlert, Check, X, ShieldCheck, TrendingUp, AlertCircle } from 'lucide-react';

export default function AdminDashboard() {
  const { users, setUsers, bookings, currentUser } = useAppContext();

  if (!currentUser) return null;

  const pendingWorkers = users.filter(u => u.role === 'worker' && !u.isVerified);
  const activeWorkers = users.filter(u => u.role === 'worker' && u.isVerified).length;
  const totalBookings = bookings.length;
  const platformRevenue = 15000; 

  const handleVerify = (id: string, approve: boolean) => {
    if (approve) {
      setUsers(users.map(u => u.id === id ? { ...u, isVerified: true } : u));
    } else {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="space-y-8 max-w-7xl mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mt-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Co-op Admin Dashboard</h1>
          <p className="text-gray-500 font-medium mt-2">Manage workforce verification and platform analytics.</p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border shadow-sm text-sm font-bold text-gray-700">
          <ShieldCheck className="text-[#1aae55]" size={18} /> Admin Access Verified
        </div>
      </div>

      {/* KPI Cards (Statistics) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 bg-indigo-50 w-24 h-24 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative z-10 flex items-start justify-between">
            <div>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Active Workers</p>
              <p className="text-4xl font-black text-gray-900">{activeWorkers}</p>
              <p className="text-xs font-semibold text-emerald-500 flex items-center gap-1 mt-2"><TrendingUp size={14}/> +12% this month</p>
            </div>
            <div className="p-4 bg-indigo-100 text-indigo-600 rounded-2xl"><Users size={28} /></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-amber-200 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 bg-amber-50 w-24 h-24 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative z-10 flex items-start justify-between">
            <div>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Pending eKYC</p>
              <p className="text-4xl font-black text-gray-900">{pendingWorkers.length}</p>
              <p className="text-xs font-semibold text-amber-500 flex items-center gap-1 mt-2"><AlertCircle size={14}/> Action Required</p>
            </div>
            <div className="p-4 bg-amber-100 text-amber-600 rounded-2xl animate-pulse"><ShieldAlert size={28} /></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 bg-emerald-50 w-24 h-24 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative z-10 flex items-start justify-between">
            <div>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Total Bookings</p>
              <p className="text-4xl font-black text-gray-900">{totalBookings}</p>
              <p className="text-xs font-semibold text-emerald-500 flex items-center gap-1 mt-2"><TrendingUp size={14}/> +8% this week</p>
            </div>
            <div className="p-4 bg-emerald-100 text-emerald-600 rounded-2xl"><BarChart3 size={28} /></div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-3xl shadow-xl relative overflow-hidden group text-white">
          <div className="absolute -right-6 -top-6 bg-gray-700/50 w-24 h-24 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative z-10 flex items-start justify-between">
            <div>
              <p className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-1">Co-op Reserves</p>
              <p className="text-4xl font-black text-white">₹{platformRevenue}</p>
              <p className="text-xs font-semibold text-emerald-400 flex items-center gap-1 mt-2">Transparently managed</p>
            </div>
            <div className="p-4 bg-white/10 backdrop-blur rounded-2xl"><ShieldCheck size={28} className="text-emerald-400" /></div>
          </div>
        </div>
      </div>

      {/* Verification Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden mt-8">
        <div className="p-6 md:p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Worker Verification Queue</h2>
            <p className="text-sm text-gray-500 font-medium mt-1">Review pending eKYC and skill certifications.</p>
          </div>
          {pendingWorkers.length > 0 && (
            <span className="bg-amber-100 text-amber-700 font-bold px-3 py-1 rounded-full text-xs flex items-center gap-1">
              <AlertCircle size={14}/> {pendingWorkers.length} Pending
            </span>
          )}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 pl-6 md:pl-8 text-xs font-bold text-gray-500 uppercase tracking-wider border-b">Applicant Info</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b">Contact</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider border-b">Status</th>
                <th className="p-4 pr-6 md:pr-8 text-xs font-bold text-gray-500 uppercase tracking-wider border-b text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {pendingWorkers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-12 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 text-green-500 mb-4">
                      <Check size={32} />
                    </div>
                    <p className="text-lg font-bold text-gray-900">All caught up!</p>
                    <p className="text-gray-500 mt-1">There are no pending verification requests.</p>
                  </td>
                </tr>
              ) : (
                pendingWorkers.map(worker => (
                  <tr key={worker.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="p-4 pl-6 md:pl-8">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                          {worker.name.charAt(0)}
                        </div>
                        <span className="font-bold text-gray-900">{worker.name}</span>
                      </div>
                    </td>
                    <td className="p-4 font-medium text-gray-600">{worker.phone}</td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-bold border border-amber-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                        eKYC Pending
                      </span>
                    </td>
                    <td className="p-4 pr-6 md:pr-8">
                      <div className="flex gap-2 justify-end">
                        <button onClick={() => handleVerify(worker.id, true)} className="p-2.5 bg-green-50 text-green-600 rounded-xl hover:bg-green-500 hover:text-white transition-colors shadow-sm" title="Approve Verification">
                          <Check size={18} />
                        </button>
                        <button onClick={() => handleVerify(worker.id, false)} className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-500 hover:text-white transition-colors shadow-sm" title="Reject Application">
                          <X size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Graphical Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Bookings Stacked Bar Chart (CSS) */}
        <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all flex flex-col">
          <div className="flex justify-between items-start mb-8">
            <h3 className="text-lg font-bold text-gray-900">Weekly Booking Volume</h3>
            <div className="flex gap-4 text-xs font-bold text-gray-500">
              <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-indigo-500"></div> Completed</span>
              <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-amber-500"></div> Pending</span>
            </div>
          </div>
          
          <div className="flex items-end justify-between gap-2 sm:gap-4 h-48 w-full mt-auto">
            {[
              { completed: 40, pending: 15 },
              { completed: 60, pending: 25 },
              { completed: 45, pending: 10 },
              { completed: 70, pending: 20 },
              { completed: 55, pending: 30 },
              { completed: 85, pending: 15 },
              { completed: 75, pending: 10 }
            ].map((data, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-3 group h-full justify-end">
                <div className="w-full max-w-[3rem] relative flex flex-col justify-end h-full bg-gray-50 rounded-t-xl overflow-hidden group-hover:bg-gray-100 transition-colors">
                   {/* Stacked Orange Bar (Pending) */}
                   <div 
                     className="w-full bg-amber-500 transition-all duration-500" 
                     style={{ height: `${data.pending}%` }}
                   ></div>
                   {/* Stacked Indigo Bar (Completed) */}
                   <div 
                     className="w-full bg-indigo-500 transition-all duration-500" 
                     style={{ height: `${data.completed}%` }}
                   ></div>
                </div>
                <span className="text-xs font-bold text-gray-400 uppercase">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][idx]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Worker Composition Doughnut Chart (CSS) */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all flex flex-col items-center justify-center">
          <h3 className="text-lg font-bold text-gray-900 mb-8 w-full text-left">Worker Composition</h3>
          
          <div className="relative w-48 h-48 rounded-full shadow-inner flex items-center justify-center mb-6 transition-transform hover:scale-105 duration-500" 
               style={{ background: 'conic-gradient(#4f46e5 0% 75%, #f59e0b 75% 100%)' }}>
            <div className="absolute w-32 h-32 bg-white rounded-full flex flex-col items-center justify-center shadow-[inset_0_4px_10px_rgba(0,0,0,0.05)]">
              <span className="text-3xl font-black text-gray-900">75%</span>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider mt-1">Verified</span>
            </div>
          </div>

          <div className="w-full space-y-3 px-4">
            <div className="flex justify-between items-center text-sm p-3 bg-gray-50 rounded-xl border border-gray-100">
              <span className="flex items-center gap-2 font-bold text-gray-700">
                <div className="w-3.5 h-3.5 rounded-full bg-indigo-600 shadow-sm"></div> Fully Verified
              </span>
              <span className="font-black text-gray-900">75%</span>
            </div>
            <div className="flex justify-between items-center text-sm p-3 bg-gray-50 rounded-xl border border-gray-100">
              <span className="flex items-center gap-2 font-bold text-gray-700">
                <div className="w-3.5 h-3.5 rounded-full bg-amber-500 shadow-sm"></div> Pending eKYC
              </span>
              <span className="font-black text-gray-900">25%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
