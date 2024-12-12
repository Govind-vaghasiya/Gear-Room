import { LayoutDashboard, Package, LogIn, LogOut, FileText, Box, Users } from 'lucide-react';

export const sidebarConfig = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Package, label: 'Productions', path: '/productions' },
  { icon: LogOut, label: 'Check Out', path: '/check-out' },
  { icon: LogIn, label: 'Check In', path: '/check-in' },
  { icon: FileText, label: 'Reports', path: '/reports' },
  { icon: Box, label: 'Assets', path: '/assets' },
  { icon: Users, label: 'Users', path: '/users' },
];