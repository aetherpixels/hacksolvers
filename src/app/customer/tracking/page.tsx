"use client";
import React from 'react';
import { useAppContext } from '@/components/Providers';
import { mockServices } from '@/lib/data';
import { Clock, CheckCircle, AlertCircle, Star, Navigation, MapPin, Search, QrCode, Smartphone, CreditCard, ShieldPlus } from 'lucide-react';
import Link from 'next/link';

export default function OrderTracking() {
  const { bookings, currentUser, language, setBookings } = useAppContext();
  const [cancelModalBookingId, setCancelModalBookingId] = React.useState<string | null>(null);
  const [cancelReason, setCancelReason] = React.useState<string>('');
  const [paymentMethod, setPaymentMethod] = React.useState<'card' | 'upi'>('upi');
  const [otpRequested, setOtpRequested] = React.useState(false);
  const [otpValue, setOtpValue] = React.useState('');
  const [insuranceOptIn, setInsuranceOptIn] = React.useState(true);

  if (!currentUser) return null;

  const myBookings = bookings.filter(b => b.customerId === currentUser.id);

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Pending': return <Clock className="text-yellow-500" />;
      case 'Accepted': return <Navigation className="text-indigo-500" />;
      case 'Completed': return <CheckCircle className="text-emerald-500" />;
      case 'Cancelled': return <AlertCircle className="text-red-500" />;
      default: return <AlertCircle className="text-red-500" />;
    }
  };

  const handleRate = (id: string, rating: number) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, rating } : b));
  };

  const handleCancel = () => {
    if (!cancelReason || !cancelModalBookingId) return;
    setBookings(bookings.map(b => b.id === cancelModalBookingId ? { ...b, status: 'Cancelled', cancelReason } : b));
    setCancelModalBookingId(null);
    setCancelReason('');
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="space-y-8 max-w-4xl mx-auto py-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            {language === 'en' ? 'My Bookings & Tracking' : 'मेरी बुकिंग'}
          </h1>
          <p className="text-gray-500 font-medium">Track your cooperative service providers in real-time.</p>
        </div>
        <Link href="/customer" className="text-indigo-600 font-bold hover:underline mb-1">← Back to Services</Link>
      </div>

      <div className="grid gap-6">
        {myBookings.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl text-center border-2 border-dashed border-gray-200">
            <p className="text-gray-500 text-lg font-bold">No bookings yet.</p>
          </div>
        ) : (
          myBookings.map(booking => {
            const service = mockServices.find(s => s.id === booking.serviceId);
            const isEmergency = booking.timeSlot.includes('Emergency');
            
            return (
              <div key={booking.id} className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-all space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-gray-900">{service?.title || 'Service Booking'}</h3>
                      {isEmergency && <span className="bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded text-xs uppercase tracking-wider border border-red-200">Emergency</span>}
                    </div>
                    <p className="text-gray-500 font-medium mt-1">{booking.date} | {booking.timeSlot}</p>
                    <p className="text-gray-600 font-bold mt-2 flex items-center gap-2"><MapPin size={16}/> {booking.address}</p>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border font-bold shadow-sm">
                      {getStatusIcon(booking.status)}
                      <span className="text-gray-900">{booking.status}</span>
                    </div>
                    {(booking.status === 'Pending' || booking.status === 'Accepted') && (
                      <button 
                        onClick={() => setCancelModalBookingId(booking.id)}
                        className="text-sm font-bold text-red-600 hover:text-red-700 hover:underline px-2"
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>

                {/* GPS Tracking Section for Active Bookings (Pending/Accepted) */}
                {(booking.status === 'Accepted' || booking.status === 'Pending') && (
                  <div className="mt-6 border-t border-gray-100 pt-6">
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Navigation size={20} className="text-indigo-600"/> Live GPS Tracking
                    </h4>
                    <div className="relative bg-gray-100 border border-indigo-100 rounded-2xl h-80 overflow-hidden flex items-center justify-center shadow-inner">
                      {/* Real interactive map iframe (OpenStreetMap) for high-fidelity demo */}
                      <iframe 
                        width="100%" 
                        height="100%" 
                        frameBorder="0" 
                        scrolling="no" 
                        src="https://www.openstreetmap.org/export/embed.html?bbox=77.10,28.50,77.30,28.70&layer=mapnik" 
                        className="absolute inset-0 opacity-60 pointer-events-none"
                      ></iframe>
                      <div className="absolute inset-0 bg-indigo-600/5 mix-blend-overlay pointer-events-none"></div>
                      
                      {booking.status === 'Pending' ? (
                        <div className="relative z-10 flex flex-col items-center">
                          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-2 shadow-xl border-4 border-indigo-100 relative">
                            <div className="absolute inset-0 rounded-full border-4 border-indigo-400 animate-ping opacity-50"></div>
                            <Search className="text-indigo-400" size={24} />
                          </div>
                          <div className="bg-gray-900 text-white px-5 py-2.5 rounded-xl font-bold shadow-2xl text-sm text-center border border-gray-700 backdrop-blur-md bg-gray-900/90">
                            Scanning Area<br/><span className="text-indigo-300">Searching for nearby workers...</span>
                          </div>
                        </div>
                      ) : (
                        <div className="relative z-10 flex flex-col items-center">
                          {/* Worker Marker */}
                          <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mb-2 shadow-xl border-4 border-white relative animate-bounce">
                            <div className="absolute -bottom-2 w-4 h-4 bg-indigo-600 rotate-45 -z-10"></div>
                            <Navigation className="text-white" size={28} />
                          </div>
                          <div className="bg-gray-900 text-white px-5 py-2.5 rounded-xl font-bold shadow-2xl text-sm text-center border border-gray-700 backdrop-blur-md bg-gray-900/90">
                            Worker En Route<br/><span className="text-indigo-300">5 mins away</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {booking.status === 'Completed' && !booking.rating && (
                  <div className="border-t border-gray-100 pt-6 mt-4">
                    <p className="text-sm font-bold text-gray-700 mb-3">Rate your cooperative experience:</p>
                    <div className="flex gap-2">
                      {[1,2,3,4,5].map(star => (
                        <button key={star} onClick={() => handleRate(booking.id, star)} className="text-gray-200 hover:text-yellow-400 hover:scale-125 transition-transform">
                          <Star fill="currentColor" size={32} />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {booking.rating && (
                  <div className="border-t border-gray-100 pt-6 mt-4 flex items-center gap-2 text-yellow-500">
                    <Star size={24} fill="currentColor" />
                    <span className="font-bold text-gray-900">You rated {booking.rating} stars</span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Cancel Modal */}
      {cancelModalBookingId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 w-full max-w-md border-2 border-red-100 animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 mb-4 text-red-600">
              <AlertCircle size={28} />
              <h2 className="text-2xl font-extrabold text-gray-900">Cancel Booking</h2>
            </div>
            <p className="text-gray-500 font-medium mb-6">Are you sure you want to cancel this booking? Please provide a reason for cancellation.</p>
            
            <textarea
              className="w-full border-2 border-gray-200 rounded-2xl p-4 mb-6 focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/10 transition-all font-medium resize-none h-32"
              placeholder="E.g., I no longer need this service right now..."
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

      {/* Payment Modal for Completed Jobs */}
      {myBookings.find(b => b.status === 'Completed' && !b.isPaid) && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md">
          {(() => {
            const unpaidBooking = myBookings.find(b => b.status === 'Completed' && !b.isPaid)!;
            const service = mockServices.find(s => s.id === unpaidBooking.serviceId);
            return (
              <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto border border-slate-200 animate-in zoom-in-95 duration-200">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <CheckCircle size={32} />
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-900 mb-1">Job Completed!</h2>
                  <p className="text-slate-500 font-medium">Your worker has finished the job. Please complete the payment.</p>
                </div>
                
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-600 font-bold">{service?.title}</span>
                    <span className="text-slate-900 font-black">{service?.priceRange}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-slate-500 pb-2">
                    <span>Cooperative Service Fee (5%)</span>
                    <span>Included</span>
                  </div>
                  
                  {/* Insurance / welfare integration feature */}
                  <label onClick={() => setInsuranceOptIn(!insuranceOptIn)} className="flex items-center justify-between py-2 border-t border-slate-200 mt-1 cursor-pointer group">
                    <div className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${insuranceOptIn ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300'}`}>
                        {insuranceOptIn && <CheckCircle size={14} />}
                      </div>
                      <span className="text-sm font-bold text-slate-700 flex items-center gap-1">
                        <ShieldPlus size={16} className="text-emerald-500"/> Trust & Safety Insurance
                      </span>
                    </div>
                    <span className="text-sm font-bold text-slate-600">+ ₹20</span>
                  </label>

                  <div className="flex justify-between items-center pt-2 border-t border-slate-200 mt-1">
                    <span className="text-slate-900 font-bold">Total Amount Due</span>
                    <span className="text-emerald-600 font-black text-lg">
                      {insuranceOptIn ? `₹${parseInt(service?.priceRange.split('-')[0].replace('₹', '').trim() || '0') + 20}` : service?.priceRange.split('-')[0].trim()}
                    </span>
                  </div>
                </div>

                {/* Payment Gateway Tabs (Next Phase Planned Features) */}
                <div className="flex gap-2 mb-6 p-1 bg-slate-100 rounded-xl">
                  <button onClick={() => setPaymentMethod('upi')} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${paymentMethod === 'upi' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}>
                    <QrCode size={16}/> UPI / QR
                  </button>
                  <button onClick={() => setPaymentMethod('card')} className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${paymentMethod === 'card' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}>
                    <CreditCard size={16}/> Card
                  </button>
                </div>

                <div className="space-y-4 mb-8 min-h-[160px]">
                  {paymentMethod === 'card' ? (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1">Card Number</label>
                        <input type="text" placeholder="XXXX XXXX XXXX XXXX" maxLength={19} className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-4 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-medium" />
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-1">Expiry Date</label>
                          <input type="text" placeholder="MM/YY" maxLength={5} autoComplete="off" className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-4 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-medium" />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-1">CVV</label>
                          <input type="password" placeholder="XXX" maxLength={3} className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-4 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-medium" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="animate-in fade-in slide-in-from-left-4 duration-300 flex flex-col items-center justify-center space-y-4">
                      {!otpRequested ? (
                        <>
                          <div className="w-32 h-32 bg-slate-100 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center relative overflow-hidden group cursor-pointer hover:border-blue-500" onClick={() => setOtpRequested(true)}>
                            <QrCode size={48} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                            <div className="absolute inset-0 bg-blue-600/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                              <span className="bg-white text-blue-600 text-xs font-bold px-2 py-1 rounded">Scan</span>
                            </div>
                          </div>
                          <p className="text-sm font-medium text-slate-500 text-center">Scan with any UPI app<br/>or <button onClick={() => setOtpRequested(true)} className="text-blue-600 font-bold hover:underline">enter Mobile Number</button></p>
                        </>
                      ) : (
                        <div className="w-full animate-in zoom-in-95 duration-200">
                          <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"><Smartphone size={16} className="text-blue-600"/> Enter OTP sent to your phone</label>
                          <input 
                            type="text" 
                            placeholder="6-digit OTP" 
                            maxLength={6} 
                            value={otpValue}
                            onChange={(e) => setOtpValue(e.target.value.replace(/[^0-9]/g, ''))}
                            className="w-full px-4 py-4 bg-white border-2 border-blue-200 text-center text-2xl tracking-[0.5em] rounded-xl focus:ring-4 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-black text-slate-900" 
                          />
                          <p className="text-xs text-slate-500 mt-2 text-center">Mock OTP: Enter any 6 digits to proceed</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                <button 
                  onClick={() => {
                    if (paymentMethod === 'upi' && otpRequested && otpValue.length < 6) return;
                    setBookings(bookings.map(b => b.id === unpaidBooking.id ? { ...b, isPaid: true } : b));
                  }}
                  disabled={paymentMethod === 'upi' && otpRequested && otpValue.length < 6}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:hover:bg-emerald-600 text-white font-extrabold rounded-xl transition-all duration-150 shadow-[0_4px_0_0_#047857] hover:shadow-[0_4px_0_0_#065f46] active:shadow-[0_0px_0_0_#065f46] active:translate-y-[4px] flex items-center justify-center gap-2"
                >
                  <CheckCircle size={20} /> {(paymentMethod === 'upi' && !otpRequested) ? 'Simulate Scan to Pay' : 'Complete Payment'}
                </button>
              </div>
            );
          })()}
        </div>
      )}
    </div>
    </div>
  );
}
