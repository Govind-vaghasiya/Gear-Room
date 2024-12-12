import React from 'react';
import { Search } from 'lucide-react';

interface UserFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filters: {
    department: string;
    accessLevel: string;
  };
  onFilterChange: (filters: { department: string; accessLevel: string }) => void;
}

export function UserFilters({
  searchTerm,
  onSearchChange,
  filters,
  onFilterChange,
}: UserFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search users..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      <div className="flex gap-4">
        <select
          value={filters.department}
          onChange={(e) =>
            onFilterChange({ ...filters, department: e.target.value })
          }
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">All Departments</option>
          <option value="Production">Production</option>
          <option value="Camera">Camera</option>
          <option value="Lighting">Lighting</option>
          <option value="Sound">Sound</option>
        </select>
        <select
          value={filters.accessLevel}
          onChange={(e) =>
            onFilterChange({ ...filters, accessLevel: e.target.value })
          }
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">All Access Levels</option>
          <option value="basic">Basic</option>
          <option value="advanced">Advanced</option>
          <option value="admin">Admin</option>
        </select>
      </div>
    </div>
  );
}