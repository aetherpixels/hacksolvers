"use client";
import React, { createContext, useState, useContext, useEffect } from 'react';
import { User, mockUsers, mockBookings, Booking } from '@/lib/data';
import { useRouter, usePathname } from 'next/navigation';

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (u: User | null) => void;
  language: 'en' | 'hi' | 'ta' | 'te' | 'mr';
  setLanguage: (l: 'en' | 'hi' | 'ta' | 'te' | 'mr') => void;
  bookings: Booking[];
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [language, setLanguage] = useState<'en' | 'hi' | 'ta' | 'te' | 'mr'>('en');
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!currentUser && pathname !== '/login') {
      router.push('/login');
    }
  }, [currentUser, pathname, router]);

  return (
    <AppContext.Provider value={{ currentUser, setCurrentUser, language, setLanguage, bookings, setBookings, users, setUsers }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
}
