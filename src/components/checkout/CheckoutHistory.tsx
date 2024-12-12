import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Asset, Checkout, Production, EquipmentUser } from '../../types';
import { EquipmentList } from './EquipmentList';
import { Printer } from 'lucide-react';

interface CheckoutHistoryProps {
  checkouts: Checkout[];
  assets: Asset[];
  users: EquipmentUser[];
  production: Production | undefined;
  onPrint: () => void;
  isCheckIn?: boolean;
}

export function CheckoutHistory({
  checkouts,
  assets,
  users,
  production,
  onPrint,
  isCheckIn = false
}: CheckoutHistoryProps) {
  if (!production) return null;

  return (
    <Card>
      <Card.Header>
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium">Equipment List</h2>
          <Button onClick={onPrint} variant="secondary">
            <Printer className="w-4 h-4 mr-2" />
            Print List
          </Button>
        </div>
      </Card.Header>
      <Card.Content>
        <div className="print-content">
          <h2 className="text-xl font-bold mb-4">{production.name} - Equipment List</h2>
          <EquipmentList 
            checkouts={checkouts} 
            assets={assets}
            isCheckIn={isCheckIn}
          />
        </div>
      </Card.Content>
    </Card>
  );
}