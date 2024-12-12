import React from 'react';
import { format } from 'date-fns';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { AssetDocument } from '../../lib/services/assets/types';
import { ArrowLeft, Package, Wrench, DollarSign, Calendar, Box, Tag, FileText } from 'lucide-react';

interface AssetDetailsProps {
  asset: AssetDocument;
  onBack: () => void;
}

export function AssetDetails({ asset, onBack }: AssetDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button onClick={onBack} variant="secondary">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Equipment List
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <Card.Header>
            <div className="flex items-center space-x-2">
              <Package className="w-5 h-5 text-gray-400" />
              <h3 className="text-lg font-medium">Basic Information</h3>
            </div>
          </Card.Header>
          <Card.Content>
            <dl className="grid grid-cols-1 gap-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Equipment Name</dt>
                <dd className="mt-1 text-sm text-gray-900">{asset.name}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">QR Code</dt>
                <dd className="mt-1 text-sm text-gray-900">{asset.qrCode}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="mt-1">
                  <span className={`px-2 py-1 text-sm font-medium rounded-full ${
                    asset.status === 'available'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {asset.status}
                  </span>
                </dd>
              </div>
            </dl>
          </Card.Content>
        </Card>

        {/* Technical Details */}
        <Card>
          <Card.Header>
            <div className="flex items-center space-x-2">
              <Tag className="w-5 h-5 text-gray-400" />
              <h3 className="text-lg font-medium">Technical Details</h3>
            </div>
          </Card.Header>
          <Card.Content>
            <dl className="grid grid-cols-1 gap-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Category</dt>
                <dd className="mt-1 text-sm text-gray-900">{asset.category}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Sub Category</dt>
                <dd className="mt-1 text-sm text-gray-900">{asset.subCategory || '-'}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Model</dt>
                <dd className="mt-1 text-sm text-gray-900">{asset.model}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Brand</dt>
                <dd className="mt-1 text-sm text-gray-900">{asset.brand}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Serial Number</dt>
                <dd className="mt-1 text-sm text-gray-900">{asset.serialNumber}</dd>
              </div>
            </dl>
          </Card.Content>
        </Card>

        {/* Maintenance Information */}
        <Card>
          <Card.Header>
            <div className="flex items-center space-x-2">
              <Wrench className="w-5 h-5 text-gray-400" />
              <h3 className="text-lg font-medium">Maintenance Information</h3>
            </div>
          </Card.Header>
          <Card.Content>
            <dl className="grid grid-cols-1 gap-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Maintenance Status</dt>
                <dd className="mt-1">
                  <span className={`px-2 py-1 text-sm font-medium rounded-full ${
                    asset.maintenanceStatus === 'good'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {asset.maintenanceStatus}
                  </span>
                </dd>
              </div>
              {asset.nextMaintenanceDate && (
                <div>
                  <dt className="text-sm font-medium text-gray-500">Next Maintenance Date</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {format(new Date(asset.nextMaintenanceDate), 'MMMM d, yyyy')}
                  </dd>
                </div>
              )}
            </dl>
          </Card.Content>
        </Card>

        {/* Purchase Information */}
        <Card>
          <Card.Header>
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-gray-400" />
              <h3 className="text-lg font-medium">Purchase Information</h3>
            </div>
          </Card.Header>
          <Card.Content>
            <dl className="grid grid-cols-1 gap-4">
              <div>
                <dt className="text-sm font-medium text-gray-500">Purchase Date</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {asset.purchaseDate ? format(new Date(asset.purchaseDate), 'MMMM d, yyyy') : '-'}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Purchase Price</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  ${asset.purchasePrice.toFixed(2)}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Warranty Date</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {asset.warrantyDate ? format(new Date(asset.warrantyDate), 'MMMM d, yyyy') : '-'}
                </dd>
              </div>
            </dl>
          </Card.Content>
        </Card>

        {/* Additional Information */}
        <Card className="lg:col-span-2">
          <Card.Header>
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-gray-400" />
              <h3 className="text-lg font-medium">Additional Information</h3>
            </div>
          </Card.Header>
          <Card.Content>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <dt className="text-sm font-medium text-gray-500">Description</dt>
                <dd className="mt-1 text-sm text-gray-900">{asset.description || '-'}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Notes</dt>
                <dd className="mt-1 text-sm text-gray-900">{asset.notes || '-'}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Team Kit</dt>
                <dd className="mt-1 text-sm text-gray-900">{asset.teamKit || '-'}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Kit</dt>
                <dd className="mt-1 text-sm text-gray-900">{asset.kit || '-'}</dd>
              </div>
              {asset.photo && (
                <div className="col-span-2">
                  <dt className="text-sm font-medium text-gray-500">Photo</dt>
                  <dd className="mt-2">
                    <img
                      src={asset.photo}
                      alt={asset.name}
                      className="max-w-lg rounded-lg shadow-sm"
                    />
                  </dd>
                </div>
              )}
            </dl>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}