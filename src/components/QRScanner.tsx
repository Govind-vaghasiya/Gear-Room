import React from 'react';
import QrReader from 'react-qr-scanner';

interface QRScannerProps {
  onScan: (data: string | null) => void;
  onError: (error: Error) => void;
}

export function QRScanner({ onScan, onError }: QRScannerProps) {
  return (
    <div className="w-full max-w-sm mx-auto">
      <QrReader
        delay={300}
        onError={onError}
        onScan={(data) => onScan(data?.text || null)}
        className="w-full aspect-square"
        constraints={{
          video: { facingMode: 'environment' }
        }}
      />
    </div>
  );
}