import React from 'react';
import { Wrench } from 'lucide-react';
import { Asset } from '../../../types';
import { format } from 'date-fns';

interface MaintenanceInfoProps {
  asset: Asset;
}

export function MaintenanceInfo({ asset }: MaintenanceInfoProps) {
  return (
    <div className="flex items-start space-x-4">
      <Wrench className="w-6 h-6 text-gray-400" />
      <div>
        <h3 className="text-lg font-medium">Maintenance Status</h3>
        <dl className="mt-2 space-y-2">
          <div>
            <dt className="text-sm font-medium text-gray-500">Current Status</dt>
            <dd className="mt-1">
              <span className={`px-2 py-1 text-sm font-medium rounded-full ${
                asset.maintenanceStatus === 'good'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {asset.maintenanceStatus}
              </span>
            </dd>
          </div>
          {asset.nextMaintenanceDate && (
            <div>
              <dt className="text-sm font-medium text-gray-500">Next Maintenance</dt>
              <dd className="text-sm text-gray-900">
                {format(new Date(asset.nextMaintenanceDate), 'MMMM d, yyyy')}
              </dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
}