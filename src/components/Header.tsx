import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from './ui/Button';

export function Header() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [logo, setLogo] = useState<string | null>(localStorage.getItem('companyLogo'));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        localStorage.setItem('companyLogo', base64String);
        setLogo(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
      <div className="flex items-center space-x-4">
        {logo ? (
          <div className="relative group">
            <img
              src={logo}
              alt="Company Logo"
              className="h-12 w-auto object-contain"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <label className="cursor-pointer text-white text-sm">
                Change Logo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        ) : (
          <label className="cursor-pointer">
            <div className="h-12 w-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
              <span className="text-sm text-gray-500">Upload Logo</span>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
            />
          </label>
        )}
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2 text-gray-600">
          <Clock size={20} />
          <span className="text-lg font-medium">
            {format(currentTime, 'MMMM d, yyyy h:mm:ss a')}
          </span>
        </div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
          Inventory Manager
        </h1>
      </div>
    </div>
  );
}