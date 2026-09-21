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
      <body className={`${inter.className} bg-slate-50 min-h-screen flex flex-col text-slate-900`}>
        <AppProvider>
          <Navbar />
          <main className="flex-1 w-full">
            {children}
          </main>
        </AppProvider>
      </body>
    </html>
  );
}
