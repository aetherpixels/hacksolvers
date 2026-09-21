"use client";
import React from 'react';
import { useAppContext } from '@/components/Providers';
import Link from 'next/link';
import { IndianRupee, TrendingUp, ShieldAlert, HeartHandshake } from 'lucide-react';

export default function EarningsDashboard() {
  const { currentUser } = useAppContext();

  if (!currentUser) return null;

  // Mock Earnings Data
  const grossEarnings = currentUser.weeklyEarnings || 0;
  const coopReserve = grossEarnings * 0.05; // 5%
  const socialSecurity = grossEarnings * 0.02; // 2%
  const netEarnings = grossEarnings - coopReserve - socialSecurity;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Earnings Dashboard</h1>
        <Link href="/worker" className="text-blue-600 hover:underline">← Back to Jobs</Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border p-6 sm:p-8">
        <div className="text-center mb-8">
          <p className="text-gray-500 font-medium mb-1">Weekly Net Earnings</p>
          <div className="flex items-center justify-center text-4xl font-bold text-green-600">
            <IndianRupee size={36} /> {netEarnings.toFixed(2)}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><TrendingUp size={20} /></div>
              <div>
                <p className="font-semibold text-gray-900">Gross Earnings</p>
                <p className="text-xs text-gray-500">Total from completed jobs</p>
              </div>
            </div>
            <span className="font-bold text-gray-900 flex items-center"><IndianRupee size={16}/> {grossEarnings.toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-center p-4 bg-red-50 rounded-xl border border-red-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 text-red-600 rounded-lg"><HeartHandshake size={20} /></div>
              <div>
                <p className="font-semibold text-gray-900">Cooperative Reserve (5%)</p>
                <p className="text-xs text-red-500">For platform maintenance & growth</p>
              </div>
            </div>
            <span className="font-bold text-red-600 flex items-center">- <IndianRupee size={16}/> {coopReserve.toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-center p-4 bg-orange-50 rounded-xl border border-orange-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 text-orange-600 rounded-lg"><ShieldAlert size={20} /></div>
              <div>
                <p className="font-semibold text-gray-900">Social Security Fund (2%)</p>
                <p className="text-xs text-orange-600">Health insurance & emergencies</p>
              </div>
            </div>
            <span className="font-bold text-orange-600 flex items-center">- <IndianRupee size={16}/> {socialSecurity.toFixed(2)}</span>
          </div>

          <div className="flex justify-between items-center p-4 bg-emerald-50 rounded-xl border border-emerald-100 mt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><TrendingUp size={20} /></div>
              <div>
                <p className="font-semibold text-gray-900">Cooperative Dividend Tracker</p>
                <p className="text-xs text-emerald-600">Your projected share of annual profits</p>
              </div>
            </div>
            <div className="text-right">
              <span className="font-bold text-emerald-600 flex items-center justify-end">+ <IndianRupee size={16}/> {(grossEarnings * 0.08).toFixed(2)}</span>
              <p className="text-xs text-emerald-600/80 font-medium">Estimated (8% bonus)</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-blue-50 text-blue-800 rounded-xl text-sm flex gap-3">
          <HeartHandshake className="shrink-0" />
          <p>Unlike private aggregators charging 20-30%, your cooperative only deducts what is necessary for operations and your welfare.</p>
        </div>
      </div>
    </div>
  );
}
