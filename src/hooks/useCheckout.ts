import { useState } from 'react';
import { checkoutService } from '../lib/services/checkout.service';
import { toast } from 'react-hot-toast';

export function useCheckout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  async function checkoutItem(assetId: string, userId: string, productionId: string) {
    setLoading(true);
    try {
      await checkoutService.checkoutItem(assetId, userId, productionId);
      toast.success('Item checked out successfully');
    } catch (err) {
      setError(err as Error);
      toast.error('Failed to check out item');
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function checkinItem(assetId: string) {
    setLoading(true);
    try {
      await checkoutService.checkinItem(assetId);
      toast.success('Item checked in successfully');
    } catch (err) {
      setError(err as Error);
      toast.error('Failed to check in item');
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    error,
    checkoutItem,
    checkinItem
  };
}