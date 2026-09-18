export type Role = 'customer' | 'worker' | 'admin';

export interface User {
  id: string;
  name: string;
  role: Role;
  phone: string;
  isVerified?: boolean;
  walletBalance?: number;
  rating?: number;
  weeklyEarnings?: number; // for fairness algorithm
  status?: 'online' | 'offline'; // for worker
}

export interface Service {
  id: string;
  title: string;
  category: string;
  priceRange: string;
  icon: string;
}

export interface Booking {
  id: string;
  customerId: string;
  workerId?: string;
  serviceId: string;
  status: 'Pending' | 'Accepted' | 'Completed' | 'Flagged' | 'Cancelled';
  address: string;
  date: string;
  timeSlot: string;
  rating?: number;
  feedback?: string;
  cancelReason?: string;
}

export const mockUsers: User[] = [
  { id: 'u1', name: 'Ravi Kumar (Customer)', role: 'customer', phone: '9876543210' },
  { id: 'u2', name: 'Sita Devi (Worker)', role: 'worker', phone: '9876543211', isVerified: true, rating: 4.8, weeklyEarnings: 1500, status: 'online' },
  { id: 'u3', name: 'Rajesh Plumber (Worker)', role: 'worker', phone: '9876543212', isVerified: false, rating: 0, weeklyEarnings: 0, status: 'offline' },
  { id: 'u4', name: 'Admin Singh (Admin)', role: 'admin', phone: '9000000000' }
];

export const mockServices: Service[] = [
  { id: 's1', title: 'Plumbing Repair', category: 'Home Maintenance', priceRange: '₹300 - ₹1000', icon: 'wrench' },
  { id: 's2', title: 'Electrical Fixes', category: 'Home Maintenance', priceRange: '₹200 - ₹800', icon: 'zap' },
  { id: 's3', title: 'Deep Cleaning', category: 'Cleaning', priceRange: '₹1000 - ₹3000', icon: 'sparkles' },
  { id: 's4', title: 'Elder Care', category: 'Caregiving', priceRange: '₹500/day', icon: 'heart' },
];

export const mockBookings: Booking[] = [
  { id: 'b1', customerId: 'u1', serviceId: 's1', status: 'Pending', address: '123 MG Road, Delhi', date: '2026-10-01', timeSlot: '10:00 AM - 12:00 PM' },
  { id: 'b2', customerId: 'u1', workerId: 'u2', serviceId: 's3', status: 'Completed', address: '123 MG Road, Delhi', date: '2026-09-15', timeSlot: '02:00 PM - 05:00 PM', rating: 5 }
];
