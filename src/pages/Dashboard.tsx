import React from 'react';
import { InventoryStats } from '../components/InventoryStats';
import { MaintenanceSchedule } from '../components/MaintenanceSchedule';
import { Asset, MaintenanceRecord } from '../types';

// Mock data for demonstration
const mockAssets: Asset[] = [
  {
    id: '1',
    name: 'Camera A',
    category: 'Cameras',
    qrCode: 'CAM001',
    status: 'available',
    maintenanceStatus: 'good',
    nextMaintenanceDate: '2024-04-15',
  },
  {
    id: '2',
    name: 'Lens Kit B',
    category: 'Lenses',
    qrCode: 'LENS002',
    status: 'checked-out',
    maintenanceStatus: 'needs-maintenance',
    nextMaintenanceDate: '2024-03-30',
    currentProduction: 'Production X',
  },
  // Add more mock assets as needed
];

const mockMaintenanceRecords: MaintenanceRecord[] = [
  {
    id: '1',
    assetId: '1',
    date: '2024-03-15',
    type: 'routine',
    description: 'Regular maintenance check',
    cost: 150,
    technician: 'John Doe',
    status: 'completed',
  },
  // Add more mock maintenance records as needed
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
      </div>

      <InventoryStats assets={mockAssets} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MaintenanceSchedule
          assets={mockAssets}
          maintenanceRecords={mockMaintenanceRecords}
        />

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
            <div className="mt-6 flow-root">
              <ul className="-my-5 divide-y divide-gray-200">
                {mockAssets.slice(0, 5).map((asset) => (
                  <li key={asset.id} className="py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-500">
                          <span className="text-sm font-medium leading-none text-white">
                            {asset.name[0]}
                          </span>
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900">
                          {asset.name}
                        </p>
                        <p className="truncate text-sm text-gray-500">
                          Status: {asset.status}
                        </p>
                      </div>
                      <div>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            asset.status === 'available'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {asset.status}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}