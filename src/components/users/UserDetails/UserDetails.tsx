import React, { useState } from 'react';
import { Asset, Checkout, EquipmentUser } from '../../../types';
import { UserInfo } from './UserInfo';
import { UserEquipmentHistory } from './UserEquipmentHistory';
import { IssueEquipmentModal } from './IssueEquipmentModal';
import { Button } from '../../ui/Button';
import { ArrowLeft, Package } from 'lucide-react';

interface UserDetailsProps {
  user: EquipmentUser;
  checkouts: Checkout[];
  assets: Asset[];
  onBack: () => void;
}

export function UserDetails({ user, checkouts, assets, onBack }: UserDetailsProps) {
  const [showIssueModal, setShowIssueModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button onClick={onBack} variant="secondary">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Users
        </Button>
        <Button
          onClick={() => setShowIssueModal(true)}
          variant="primary"
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          <Package className="w-4 h-4 mr-2" />
          Issue Equipment
        </Button>
      </div>

      <UserInfo user={user} />
      <UserEquipmentHistory 
        user={user}
        checkouts={checkouts}
        assets={assets}
      />

      <IssueEquipmentModal
        isOpen={showIssueModal}
        onClose={() => setShowIssueModal(false)}
        user={user}
        assets={assets}
      />
    </div>
  );
}