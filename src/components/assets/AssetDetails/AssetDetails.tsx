import React from 'react';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';
import { AssetInfo } from './AssetInfo';
import { MaintenanceInfo } from './MaintenanceInfo';
import { WarrantyInfo } from './WarrantyInfo';
import { PurchaseInfo } from './PurchaseInfo';
import { Asset } from '../../../types';
import { ArrowLeft } from 'lucide-react';

interface AssetDetailsProps {
  asset: Asset;
  onBack: () => void;
}

export function AssetDetails({ asset, onBack }: AssetDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button onClick={onBack} variant="secondary">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Assets
        </Button>
      </div>

      <Card>
        <Card.Header>
          <h2 className="text-2xl font-bold">{asset.name}</h2>
        </Card.Header>
        <Card.Content>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AssetInfo asset={asset} />
            <MaintenanceInfo asset={asset} />
          </div>
        </Card.Content>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WarrantyInfo asset={asset} />
        <PurchaseInfo asset={asset} />
      </div>
    </div>
  );
}