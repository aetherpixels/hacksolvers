import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/components/Providers";
import { Navbar } from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CoopGig - Cooperative Gig Services",
  description: "A digital service marketplace owned by Labour Cooperative Societies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 min-h-screen flex flex-col`}>
        <AppProvider>
          <Navbar />
          <main className="flex-1 max-w-md w-full mx-auto sm:max-w-2xl md:max-w-4xl lg:max-w-7xl p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </AppProvider>
      </body>
    </html>
  );
}
