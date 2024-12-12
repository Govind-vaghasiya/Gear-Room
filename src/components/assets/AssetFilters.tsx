import React from 'react';
import { Search } from 'lucide-react';

interface AssetFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  categoryFilter: string;
  onCategoryChange: (value: string) => void;
}

export function AssetFilters({
  searchTerm,
  onSearchChange,
  categoryFilter,
  onCategoryChange
}: AssetFiltersProps) {
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
            placeholder="Search assets..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      <div>
        <select
          value={categoryFilter}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">All Categories</option>
          <option value="Cameras">Cameras</option>
          <option value="Lenses">Lenses</option>
          <option value="Lighting">Lighting</option>
          <option value="Audio">Audio</option>
          <option value="Support">Support</option>
          <option value="Power">Power</option>
          <option value="Storage">Storage</option>
        </select>
      </div>
    </div>
  );
}