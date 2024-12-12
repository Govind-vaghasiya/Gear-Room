import React, { useState } from 'react';
import { cn } from '../lib/utils';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className={cn(
          "flex-1 p-6 transition-all duration-200",
          isSidebarOpen ? "ml-64" : "ml-20"
        )}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;