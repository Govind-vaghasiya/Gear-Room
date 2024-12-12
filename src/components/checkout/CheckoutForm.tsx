import React from 'react';
import { QRScanner } from '../QRScanner';
import { Button } from '../ui/Button';
import { Production } from '../../types';

interface CheckoutFormProps {
  selectedProduction: string;
  productions: Production[];
  onProductionChange: (id: string) => void;
  showScanner: boolean;
  onToggleScanner: () => void;
  onScan: (data: string | null) => void;
  onError: (error: Error) => void;
  manualCode: string;
  onManualCodeChange: (code: string) => void;
  onManualSubmit: (e: React.FormEvent) => void;
  isCheckIn?: boolean;
}

export function CheckoutForm({
  selectedProduction,
  productions,
  onProductionChange,
  showScanner,
  onToggleScanner,
  onScan,
  onError,
  manualCode,
  onManualCodeChange,
  onManualSubmit,
  isCheckIn = false
}: CheckoutFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Select Production
        </label>
        <select
          value={selectedProduction}
          onChange={(e) => onProductionChange(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select a production...</option>
          {productions.map((production) => (
            <option key={production.id} value={production.id}>
              {production.name} - {production.showName}
            </option>
          ))}
        </select>
      </div>

      {selectedProduction && (
        <>
          <div className="space-y-4">
            <div className="flex justify-center">
              <Button
                onClick={onToggleScanner}
                variant="primary"
              >
                {showScanner ? 'Hide Scanner' : `Scan QR Code to ${isCheckIn ? 'Check In' : 'Check Out'}`}
              </Button>
            </div>

            {showScanner && (
              <div className="max-w-sm mx-auto">
                <QRScanner onScan={onScan} onError={onError} />
              </div>
            )}

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Or</span>
              </div>
            </div>

            <form onSubmit={onManualSubmit}>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={manualCode}
                  onChange={(e) => onManualCodeChange(e.target.value)}
                  placeholder="Enter QR code manually"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <Button type="submit" variant="primary">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}