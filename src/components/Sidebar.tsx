import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, LogIn, LogOut, FileText, Box, Users, Menu } from 'lucide-react';
import { cn } from '../lib/utils';
import { sidebarConfig } from '../config/sidebar';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed left-0 top-[73px] h-[calc(100vh-73px)] bg-white border-r border-gray-100 transition-all duration-200",
        isOpen ? "w-64" : "w-20"
      )}
    >
      <div className="flex flex-col h-full">
        <button
          onClick={onToggle}
          className="p-4 hover:bg-gray-50 transition-colors"
        >
          <Menu size={24} className="text-gray-500" />
        </button>

        <nav className="flex-1 px-2 py-4 space-y-1">
          {sidebarConfig.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                  location.pathname === item.path
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <Icon size={20} className="mr-3" />
                {isOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}