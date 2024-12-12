import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../ui/Button';

interface CategorySelectProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
  categories?: string[];
  allowCustom?: boolean;
}

export function CategorySelect({
  value,
  onChange,
  label,
  placeholder = 'Select category...',
  categories = [],
  allowCustom = true
}: CategorySelectProps) {
  const [isCustom, setIsCustom] = useState(false);
  const [customValue, setCustomValue] = useState('');

  const handleCustomSubmit = () => {
    if (customValue.trim()) {
      onChange(customValue.trim());
      setCustomValue('');
      setIsCustom(false);
    }
  };

  if (isCustom) {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="flex space-x-2">
          <input
            type="text"
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
            className="flex-1"
            placeholder="Enter custom category"
          />
          <Button onClick={handleCustomSubmit} variant="primary" size="sm">
            Add
          </Button>
          <Button onClick={() => setIsCustom(false)} variant="secondary" size="sm">
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="flex space-x-2">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1"
        >
          <option value="">{placeholder}</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
          {value && !categories.includes(value) && (
            <option value={value}>{value}</option>
          )}
        </select>
        {allowCustom && (
          <Button onClick={() => setIsCustom(true)} variant="secondary" size="sm">
            <Plus className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}