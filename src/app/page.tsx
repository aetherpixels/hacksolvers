"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/components/Providers';

export default function Home() {
  const router = useRouter();
  const { currentUser } = useAppContext();

  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
    } else if (currentUser.role === 'customer') {
      router.push('/customer');
    } else if (currentUser.role === 'worker') {
      router.push('/worker');
    } else if (currentUser.role === 'admin') {
      router.push('/admin');
    }
  }, [currentUser, router]);

  return (
    <div className="flex items-center justify-center h-[70vh]">
      <p className="text-gray-500 animate-pulse text-lg font-medium">Redirecting...</p>
    </div>
  );
}
