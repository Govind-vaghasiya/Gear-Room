import React from 'react';
import { Package, Box, Tag } from 'lucide-react';
import { Asset } from '../../../types';

interface AssetInfoProps {
  asset: Asset;
}

export function AssetInfo({ asset }: AssetInfoProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-start space-x-4">
        <Package className="w-6 h-6 text-gray-400" />
        <div>
          <h3 className="text-lg font-medium">Basic Information</h3>
          <dl className="mt-2 space-y-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">QR Code</dt>
              <dd className="text-sm text-gray-900">{asset.qrCode}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Category</dt>
              <dd className="text-sm text-gray-900">{asset.category}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Model</dt>
              <dd className="text-sm text-gray-900">{asset.model}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Brand</dt>
              <dd className="text-sm text-gray-900">{asset.brand}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Serial Number</dt>
              <dd className="text-sm text-gray-900">{asset.serialNumber}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}