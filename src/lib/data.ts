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
  photoUrl?: string; // Poster photo for worker
  skills?: string[]; // E.g., ['Plumbing', 'Pipe Fitting']
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
  isPaid?: boolean;
}

export const mockUsers: User[] = [
  { id: 'u1', name: 'Ravi Kumar (Customer)', role: 'customer', phone: '9876543210' },
  { id: 'u2', name: 'Sita Devi (Worker)', role: 'worker', phone: '9876543211', isVerified: true, rating: 4.8, weeklyEarnings: 1500, status: 'online', photoUrl: '/worker_cleaner.jpg', skills: ['Deep Cleaning', 'Sanitization'] },
  { id: 'u3', name: 'Rajesh Plumber (Worker)', role: 'worker', phone: '9876543212', isVerified: true, rating: 4.9, weeklyEarnings: 2100, status: 'online', photoUrl: '/worker_plumber.jpg', skills: ['Plumbing Repair', 'Pipe Fitting'] },
  { id: 'u4', name: 'Admin Singh (Admin)', role: 'admin', phone: '9000000000' },
  { id: 'u5', name: 'Priya Sharma (Worker)', role: 'worker', phone: '9876543213', isVerified: true, rating: 5.0, weeklyEarnings: 1800, status: 'online', photoUrl: '/worker_electrician.jpg', skills: ['Electrical Fixes', 'Wiring'] }
];

export const mockServices: Service[] = [
  { id: 's1', title: 'Plumbing Repair', category: 'Home Maintenance', priceRange: '₹300 - ₹1000', icon: 'wrench' },
  { id: 's2', title: 'Electrical Fixes', category: 'Home Maintenance', priceRange: '₹200 - ₹800', icon: 'zap' },
  { id: 's3', title: 'Deep Cleaning', category: 'Cleaning', priceRange: '₹1000 - ₹3000', icon: 'sparkles' },
  { id: 's4', title: 'Elder Care', category: 'Caregiving', priceRange: '₹500/day', icon: 'heart' },
  { id: 's5', title: 'Carpentry & Woodwork', category: 'Home Maintenance', priceRange: '₹400 - ₹2000', icon: 'hammer' },
  { id: 's6', title: 'AC Service & Repair', category: 'Appliance Repair', priceRange: '₹500 - ₹1500', icon: 'wind' },
  { id: 's7', title: 'Painting & Waterproofing', category: 'Home Renovation', priceRange: '₹2000 - ₹15000', icon: 'brush' },
  { id: 's8', title: 'Pest Control Services', category: 'Cleaning & Hygiene', priceRange: '₹800 - ₹2500', icon: 'bug' }
];

export const mockBookings: Booking[] = [
  { id: 'b1', customerId: 'u1', serviceId: 's1', status: 'Pending', address: '123 MG Road, Delhi', date: '2026-10-01', timeSlot: '10:00 AM - 12:00 PM' },
  { id: 'b2', customerId: 'u1', workerId: 'u2', serviceId: 's3', status: 'Completed', address: '123 MG Road, Delhi', date: '2026-09-15', timeSlot: '02:00 PM - 05:00 PM', rating: 5 }
];
