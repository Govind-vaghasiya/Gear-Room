import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { AssetForm } from '../components/AssetForm';
import { AssetList } from '../components/assets/AssetList';
import { AssetFilters } from '../components/assets/AssetFilters';
import { AssetDetails } from '../components/assets/AssetDetails';
import { Plus, Download, Upload } from 'lucide-react';
import { useAssets } from '../hooks/assets/useAssets';
import { exportAssetsToCSV, parseAssetCSV } from '../lib/utils/csv';
import { toast } from 'react-hot-toast';
import { AssetDocument } from '../lib/services/assets/types';

export default function Assets() {
  const { assets, loading, error, createAsset, updateAsset, deleteAsset } = useAssets();
  const [showModal, setShowModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<AssetDocument | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const assets = await parseAssetCSV(file);
      for (const asset of assets) {
        await createAsset(asset);
      }
      toast.success('Assets imported successfully');
    } catch (error) {
      console.error('Error importing assets:', error);
      toast.error('Failed to import assets');
    }
  };

  const filteredAssets = React.useMemo(() => {
    return assets.filter(asset => {
      const matchesSearch = 
        asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.qrCode.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = !categoryFilter || asset.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [assets, searchTerm, categoryFilter]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        Error loading assets. Please try again later.
      </div>
    );
  }

  if (showDetails && selectedAsset) {
    return (
      <AssetDetails
        asset={selectedAsset}
        onBack={() => {
          setShowDetails(false);
          setSelectedAsset(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <Card.Header>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <h2 className="text-lg font-medium">Equipment Assets</h2>
            <div className="flex space-x-2">
              <Button onClick={() => exportAssetsToCSV(assets)} variant="secondary">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <label className="cursor-pointer">
                <Button variant="secondary" as="div">
                  <Upload className="w-4 h-4 mr-2" />
                  Import
                </Button>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              <Button onClick={() => setShowModal(true)} variant="primary">
                <Plus className="w-4 h-4 mr-2" />
                Add Asset
              </Button>
            </div>
          </div>
        </Card.Header>
        <Card.Content>
          <AssetFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            categoryFilter={categoryFilter}
            onCategoryChange={setCategoryFilter}
          />
          <AssetList
            assets={filteredAssets}
            onEdit={(asset) => {
              setSelectedAsset(asset);
              setShowModal(true);
            }}
            onDelete={deleteAsset}
            onView={(asset) => {
              setSelectedAsset(asset);
              setShowDetails(true);
            }}
          />
        </Card.Content>
      </Card>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setSelectedAsset(null);
        }}
        title={selectedAsset ? 'Edit Asset' : 'Add New Asset'}
      >
        <AssetForm
          onSubmit={async (data) => {
            try {
              if (selectedAsset) {
                await updateAsset(selectedAsset.id!, data);
              } else {
                await createAsset(data);
              }
              setShowModal(false);
              setSelectedAsset(null);
            } catch (error) {
              console.error('Error saving asset:', error);
              toast.error('Failed to save asset');
            }
          }}
          initialData={selectedAsset || undefined}
          onCancel={() => {
            setShowModal(false);
            setSelectedAsset(null);
          }}
        />
      </Modal>
    </div>
  );
}