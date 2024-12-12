import React from 'react';
import { Card } from '../ui/Card';

interface AssetUtilizationReportProps {
  data: Record<string, {
    assetName: string;
    totalCheckouts: number;
    totalDays: number;
  }>;
}

export function AssetUtilizationReport({ data }: AssetUtilizationReportProps) {
  return (
    <div className="space-y-6">
      <Card>
        <Card.Header>
          <h3 className="text-lg font-medium">Asset Utilization</h3>
        </Card.Header>
        <Card.Content>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Item Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Checkouts
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Days Used
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Average Days Per Checkout
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.entries(data).map(([assetId, stats]) => (
                  <tr key={assetId}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {stats.assetName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {stats.totalCheckouts}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {stats.totalDays}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {(stats.totalDays / stats.totalCheckouts).toFixed(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}