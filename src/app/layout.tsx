import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/lib/AppContext';
import { Navbar } from '@/components/layout/Navbar';
import { DemoTourBar } from '@/components/layout/DemoTourBar';
import { ToastContainer } from '@/components/shared/Toast';

export const metadata: Metadata = {
  title: 'EquiPath | Skills First. Opportunities for Everyone.',
  description: 'AI-Powered Skills-First Hiring Platform for Skilled Trade Workers. No formal resume required.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white">
        <AppProvider>
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
          <DemoTourBar />
          <ToastContainer />
        </AppProvider>
      </body>
    </html>
  );
}
