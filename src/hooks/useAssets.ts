import { useState, useEffect } from 'react';
import { assetsService } from '../lib/services/assets.service';
import { Asset } from '../types';
import { toast } from 'react-hot-toast';

export function useAssets() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadAssets();
  }, []);

  async function loadAssets() {
    try {
      const data = await assetsService.getAll();
      setAssets(data);
    } catch (err) {
      setError(err as Error);
      toast.error('Failed to load assets');
    } finally {
      setLoading(false);
    }
  }

  async function createAsset(asset: Omit<Asset, 'id'>) {
    try {
      const newAsset = await assetsService.create(asset);
      setAssets(prev => [...prev, newAsset]);
      toast.success('Asset created successfully');
      return newAsset;
    } catch (err) {
      toast.error('Failed to create asset');
      throw err;
    }
  }

  async function updateAsset(id: string, asset: Partial<Asset>) {
    try {
      await assetsService.update(id, asset);
      setAssets(prev => prev.map(a => a.id === id ? { ...a, ...asset } : a));
      toast.success('Asset updated successfully');
    } catch (err) {
      toast.error('Failed to update asset');
      throw err;
    }
  }

  async function deleteAsset(id: string) {
    try {
      await assetsService.delete(id);
      setAssets(prev => prev.filter(a => a.id !== id));
      toast.success('Asset deleted successfully');
    } catch (err) {
      toast.error('Failed to delete asset');
      throw err;
    }
  }

  return {
    assets,
    loading,
    error,
    createAsset,
    updateAsset,
    deleteAsset,
    refresh: loadAssets
  };
}