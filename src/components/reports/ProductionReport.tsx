import React from 'react';
import { format } from 'date-fns';
import { Asset, Checkout, Production } from '../../types';

interface ProductionReportProps {
  production: Production;
  checkouts: Checkout[];
  assets: Asset[];
}

export function ProductionReport({ production, checkouts, assets }: ProductionReportProps) {
  const productionCheckouts = checkouts.filter(c => c.productionId === production.id);
  const checkedOutAssets = productionCheckouts.map(c => assets.find(a => a.id === c.assetId));

  return (
    <div className="space-y-6 p-6">
      <div className="text-center border-b pb-6">
        <h2 className="text-2xl font-bold text-gray-900">{production.name}</h2>
        <p className="text-gray-500">Production Report</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-medium">Production Details</h3>
          <dl className="mt-2 space-y-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">DOP</dt>
              <dd className="text-sm text-gray-900">{production.dopName}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Shooting Date</dt>
              <dd className="text-sm text-gray-900">
                {format(new Date(production.shootingDate), 'MMMM d, yyyy')}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Show Name</dt>
              <dd className="text-sm text-gray-900">{production.showName}</dd>
            </div>
          </dl>
        </div>

        <div>
          <h3 className="text-lg font-medium">Equipment Summary</h3>
          <dl className="mt-2 space-y-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Total Items</dt>
              <dd className="text-sm text-gray-900">{productionCheckouts.length}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Currently Checked Out</dt>
              <dd className="text-sm text-gray-900">
                {productionCheckouts.filter(c => c.status === 'checked-out').length}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Equipment List</h3>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Item Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Checkout Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {productionCheckouts.map((checkout, index) => {
              const asset = assets.find(a => a.id === checkout.assetId);
              return (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {asset?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {asset?.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      checkout.status === 'checked-out' 
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {checkout.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(checkout.checkoutDate), 'MMM d, yyyy')}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}