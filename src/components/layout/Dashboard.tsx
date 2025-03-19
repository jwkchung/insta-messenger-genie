
import React from 'react';
import Header from './Header';
import { cn } from '@/lib/utils';

interface DashboardProps {
  children: React.ReactNode;
  className?: string;
}

const Dashboard: React.FC<DashboardProps> = ({ children, className }) => {
  return (
    <div className="min-h-full flex flex-col bg-gradient-to-br from-background to-secondary/50">
      <Header />
      <main className={cn("flex-1 container mx-auto px-4 pb-10", className)}>
        {children}
      </main>
    </div>
  );
};

export default Dashboard;
