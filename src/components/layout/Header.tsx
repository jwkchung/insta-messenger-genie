
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageSquare, BarChart2, Home, Settings, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/messages', label: 'Messages', icon: MessageSquare },
    { path: '/analytics', label: 'Analytics', icon: BarChart2 },
    { path: '/customgpt', label: 'Custom GPTs', icon: Sparkles },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <header className="glass-panel-sm sticky top-0 z-10 px-6 py-4 flex items-center justify-between mb-6">
      <div className="flex items-center">
        <span className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
          InstaMessenger
        </span>
        <div className="text-chip bg-blue-100 text-primary ml-2">Beta</div>
      </div>
      
      <nav className="hidden md:flex items-center space-x-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center px-3 py-2 rounded-lg transition-all duration-200",
                isActive
                  ? "bg-secondary text-primary font-medium"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              )}
            >
              <Icon className="w-4 h-4 mr-2" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      
      <nav className="flex md:hidden">
        <div className="flex space-x-1 bg-secondary/80 backdrop-blur-sm rounded-full p-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200",
                  isActive
                    ? "bg-primary text-white shadow-sm"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
                aria-label={item.label}
              >
                <Icon className="w-5 h-5" />
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
};

export default Header;
