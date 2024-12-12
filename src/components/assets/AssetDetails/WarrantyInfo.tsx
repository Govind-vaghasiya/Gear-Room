import React from 'react';
import { Shield } from 'lucide-react';
import { Asset } from '../../../types';
import { Card } from '../../ui/Card';
import { format } from 'date-fns';

interface WarrantyInfoProps {
  asset: Asset;
}

export function WarrantyInfo({ asset }: WarrantyInfoProps) {
  return (
    <Card>
      <Card.Header>
        <div className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-gray-400" />
          <h3 className="text-lg font-medium">Warranty Information</h3>
        </div>
      </Card.Header>
      <Card.Content>
        <dl className="space-y-2">
          <div>
            <dt className="text-sm font-medium text-gray-500">Warranty Date</dt>
            <dd className="text-sm text-gray-900">
              {asset.warrantyDate ? format(new Date(asset.warrantyDate), 'MMMM d, yyyy') : 'N/A'}
            </dd>
          </div>
        </dl>
      </Card.Content>
    </Card>
  );
}