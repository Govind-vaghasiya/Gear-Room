import React from 'react';
import { DollarSign } from 'lucide-react';
import { Asset } from '../../../types';
import { Card } from '../../ui/Card';
import { format } from 'date-fns';

interface PurchaseInfoProps {
  asset: Asset;
}

export function PurchaseInfo({ asset }: PurchaseInfoProps) {
  return (
    <Card>
      <Card.Header>
        <div className="flex items-center space-x-2">
          <DollarSign className="w-5 h-5 text-gray-400" />
          <h3 className="text-lg font-medium">Purchase Information</h3>
        </div>
      </Card.Header>
      <Card.Content>
        <dl className="space-y-2">
          <div>
            <dt className="text-sm font-medium text-gray-500">Purchase Date</dt>
            <dd className="text-sm text-gray-900">
              {asset.purchaseDate ? format(new Date(asset.purchaseDate), 'MMMM d, yyyy') : 'N/A'}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Purchase Price</dt>
            <dd className="text-sm text-gray-900">
              ${asset.purchasePrice.toFixed(2)}
            </dd>
          </div>
        </dl>
      </Card.Content>
    </Card>
  );
}