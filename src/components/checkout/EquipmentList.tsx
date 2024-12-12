import React from 'react';
import { format } from 'date-fns';
import { Asset, Checkout } from '../../types';

interface EquipmentListProps {
  checkouts: Checkout[];
  assets: Asset[];
  isCheckIn?: boolean;
}

export function EquipmentList({ checkouts, assets, isCheckIn = false }: EquipmentListProps) {
  const formatDate = (date: string | undefined | null) => {
    if (!date) return '-';
    try {
      return format(new Date(date), 'MMM d, yyyy HH:mm');
    } catch (error) {
      console.error('Invalid date:', date);
      return '-';
    }
  };

  return (
    <div className="print-content">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              QR Code
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Asset
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {isCheckIn ? 'Check In' : 'Check Out'} Date & Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {checkouts.map((checkout) => {
            const asset = assets.find(a => a.id === checkout.assetId);
            if (!asset) return null;
            
            const date = isCheckIn ? checkout.returnDate : checkout.checkoutDate;
            
            return (
              <tr key={checkout.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {asset.qrCode}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {asset.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {asset.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    checkout.status === 'checked-out' 
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {checkout.status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}