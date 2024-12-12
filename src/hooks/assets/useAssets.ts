import { useState, useEffect } from 'react';
import { assetsService } from '../../lib/services/assets/assets.service';
import { AssetDocument, CreateAssetData, UpdateAssetData } from '../../lib/services/assets/types';
import { toast } from 'react-hot-toast';

export function useAssets() {
  const [assets, setAssets] = useState<AssetDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadAssets();
  }, []);

  async function loadAssets() {
    try {
      setLoading(true);
      const response = await assetsService.getAll();
      if (response.success && response.data) {
        setAssets(response.data);
      } else if (response.error) {
        throw response.error;
      }
    } catch (err) {
      const error = err as Error;
      setError(error);
      toast.error('Failed to load assets');
    } finally {
      setLoading(false);
    }
  }

  async function createAsset(assetData: CreateAssetData) {
    try {
      const response = await assetsService.create(assetData);
      if (response.success && response.data) {
        setAssets(prev => [...prev, response.data]);
        toast.success('Asset created successfully');
        return response.data;
      } else if (response.error) {
        throw response.error;
      }
    } catch (err) {
      const error = err as Error;
      toast.error(error.message || 'Failed to create asset');
      throw error;
    }
  }

  async function updateAsset(id: string, assetData: UpdateAssetData) {
    try {
      const response = await assetsService.update(id, assetData);
      if (response.success) {
        setAssets(prev => prev.map(asset => 
          asset.id === id ? { ...asset, ...assetData } : asset
        ));
        toast.success('Asset updated successfully');
      } else if (response.error) {
        throw response.error;
      }
    } catch (err) {
      const error = err as Error;
      toast.error(error.message || 'Failed to update asset');
      throw error;
    }
  }

  async function deleteAsset(id: string) {
    try {
      const response = await assetsService.delete(id);
      if (response.success) {
        setAssets(prev => prev.filter(asset => asset.id !== id));
        toast.success('Asset deleted successfully');
      } else if (response.error) {
        throw response.error;
      }
    } catch (err) {
      const error = err as Error;
      toast.error(error.message || 'Failed to delete asset');
      throw error;
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