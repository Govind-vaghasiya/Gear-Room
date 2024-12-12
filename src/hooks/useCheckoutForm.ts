import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useCheckout } from './useCheckout';
import { useAssets } from './useAssets';
import { useUsers } from './useUsers';

export function useCheckoutForm(isCheckIn: boolean = false) {
  const { assets } = useAssets();
  const { users } = useUsers();
  const { checkoutItem, checkinItem } = useCheckout();
  const [selectedProduction, setSelectedProduction] = useState('');
  const [showScanner, setShowScanner] = useState(false);
  const [manualCode, setManualCode] = useState('');

  const handleScan = async (data: string | null) => {
    if (!data) return;

    try {
      const asset = assets.find(a => a.qrCode === data);
      if (!asset) {
        toast.error('Asset not found');
        return;
      }

      if (isCheckIn) {
        if (asset.status !== 'checked-out') {
          toast.error('This item is not checked out');
          return;
        }
        await checkinItem(asset.id!);
        toast.success(`${asset.name} checked in successfully`);
      } else {
        if (!selectedProduction) {
          toast.error('Please select a production first');
          return;
        }
        if (asset.status === 'checked-out') {
          toast.error('This item is already checked out');
          return;
        }
        // For demo, using first user. In production, this should be the logged-in user
        const userId = users[0]?.id;
        if (!userId) {
          toast.error('No user found');
          return;
        }
        await checkoutItem(asset.id!, userId, selectedProduction);
        toast.success(`${asset.name} checked out successfully`);
      }
      setShowScanner(false);
    } catch (error) {
      console.error(error);
      toast.error(`Error ${isCheckIn ? 'checking in' : 'checking out'} item`);
    }
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (manualCode) {
      await handleScan(manualCode);
      setManualCode('');
    }
  };

  return {
    selectedProduction,
    setSelectedProduction,
    showScanner,
    setShowScanner,
    manualCode,
    setManualCode,
    handleScan,
    handleManualSubmit
  };
}