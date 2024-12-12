import React from 'react';
import { Card } from './ui/Card';
import { Package, AlertTriangle, CheckCircle, DollarSign } from 'lucide-react';
import { Asset } from '../types';

interface InventoryStatsProps {
  assets: Asset[];
}

export function InventoryStats({ assets }: InventoryStatsProps) {
  const totalAssets = assets.length;
  const availableAssets = assets.filter(a => a.status === 'available').length;
  const needsMaintenance = assets.filter(a => a.maintenanceStatus === 'needs-maintenance').length;
  const utilizationRate = (((totalAssets - availableAssets) / totalAssets) * 100).toFixed(1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <Card.Content className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Assets</p>
              <p className="text-2xl font-semibold mt-1">{totalAssets}</p>
            </div>
            <div className="p-3 bg-indigo-100 rounded-full">
              <Package className="h-6 w-6 text-indigo-600" />
            </div>
          </div>
        </Card.Content>
      </Card>

      <Card>
        <Card.Content className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Available</p>
              <p className="text-2xl font-semibold mt-1">{availableAssets}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card.Content>
      </Card>

      <Card>
        <Card.Content className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Needs Maintenance</p>
              <p className="text-2xl font-semibold mt-1">{needsMaintenance}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </Card.Content>
      </Card>

      <Card>
        <Card.Content className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Utilization Rate</p>
              <p className="text-2xl font-semibold mt-1">{utilizationRate}%</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}