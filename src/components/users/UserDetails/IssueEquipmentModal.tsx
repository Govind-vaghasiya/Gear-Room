import React, { useState } from 'react';
import { Asset, EquipmentUser } from '../../../types';
import { Modal } from '../../ui/Modal';
import { Button } from '../../ui/Button';
import { useCheckout } from '../../../hooks/useCheckout';
import { toast } from 'react-hot-toast';

interface IssueEquipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: EquipmentUser;
  assets: Asset[];
}

export function IssueEquipmentModal({ isOpen, onClose, user, assets }: IssueEquipmentModalProps) {
  const [qrCode, setQrCode] = useState('');
  const { checkoutItem } = useCheckout();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const asset = assets.find(a => a.qrCode === qrCode);
      if (!asset) {
        toast.error('Asset not found');
        return;
      }

      if (asset.status === 'checked-out') {
        toast.error('This item is already checked out');
        return;
      }

      await checkoutItem(asset.id!, user.id!, 'direct-issue');
      toast.success(`${asset.name} issued to ${user.name}`);
      setQrCode('');
      onClose();
    } catch (error) {
      console.error('Error issuing equipment:', error);
      toast.error('Failed to issue equipment');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Issue Equipment"
    >
      <div className="space-y-4">
        <p className="text-sm text-gray-500">
          Enter the QR code of the equipment to issue to {user.name}
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={qrCode}
            onChange={(e) => setQrCode(e.target.value)}
            placeholder="Enter QR Code"
            className="w-full"
            required
          />
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Issue Equipment
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}