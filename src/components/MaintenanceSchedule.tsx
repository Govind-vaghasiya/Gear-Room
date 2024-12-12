import React from 'react';
import { Card } from './ui/Card';
import { format } from 'date-fns';
import { Wrench, AlertTriangle, CheckCircle } from 'lucide-react';
import { Asset, MaintenanceRecord } from '../types';

interface MaintenanceScheduleProps {
  assets: Asset[];
  maintenanceRecords: MaintenanceRecord[];
}

export function MaintenanceSchedule({ assets, maintenanceRecords }: MaintenanceScheduleProps) {
  const upcomingMaintenance = assets
    .filter(asset => asset.nextMaintenanceDate)
    .sort((a, b) => {
      const dateA = new Date(a.nextMaintenanceDate!);
      const dateB = new Date(b.nextMaintenanceDate!);
      return dateA.getTime() - dateB.getTime();
    })
    .slice(0, 5);

  return (
    <Card>
      <Card.Header>
        <div className="flex items-center space-x-2">
          <Wrench className="h-5 w-5 text-indigo-500" />
          <h3 className="text-lg font-medium">Maintenance Schedule</h3>
        </div>
      </Card.Header>
      <Card.Content>
        <div className="space-y-4">
          {upcomingMaintenance.map((asset) => (
            <div
              key={asset.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                {asset.maintenanceStatus === 'needs-maintenance' ? (
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
                <div>
                  <p className="font-medium">{asset.name}</p>
                  <p className="text-sm text-gray-500">
                    Next maintenance: {format(new Date(asset.nextMaintenanceDate!), 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  asset.maintenanceStatus === 'needs-maintenance'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {asset.maintenanceStatus}
              </span>
            </div>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
}