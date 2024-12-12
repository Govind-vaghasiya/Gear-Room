import React from 'react';
import { Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '../ui/Button';
import { AssetDocument } from '../../lib/services/assets/types';

interface AssetListProps {
  assets: AssetDocument[];
  onEdit: (asset: AssetDocument) => void;
  onDelete: (id: string) => void;
  onView: (asset: AssetDocument) => void;
}

export function AssetList({ assets, onEdit, onDelete, onView }: AssetListProps) {
  return (
    <div className="overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="w-1/6 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              QR Code
            </th>
            <th scope="col" className="w-1/3 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Equipment Name
            </th>
            <th scope="col" className="w-1/6 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th scope="col" className="w-1/6 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="w-1/6 px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Maintenance
            </th>
            <th scope="col" className="w-24 px-3 py-3 relative">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {assets.map((asset) => (
            <tr key={asset.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => onView(asset)}>
              <td className="px-3 py-4 text-sm font-medium text-gray-900 truncate">
                {asset.qrCode}
              </td>
              <td className="px-3 py-4 text-sm text-gray-900 truncate">
                {asset.name}
              </td>
              <td className="px-3 py-4 text-sm text-gray-500 truncate">
                {asset.category}
              </td>
              <td className="px-3 py-4">
                <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
                  asset.status === 'available' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {asset.status}
                </span>
              </td>
              <td className="px-3 py-4">
                <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
                  asset.maintenanceStatus === 'good'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {asset.maintenanceStatus}
                </span>
              </td>
              <td className="px-3 py-4 text-right">
                <div className="flex justify-end space-x-1">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      onView(asset);
                    }}
                    variant="secondary"
                    size="sm"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(asset);
                    }}
                    variant="secondary"
                    size="sm"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(asset.id!);
                    }}
                    variant="secondary"
                    size="sm"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}