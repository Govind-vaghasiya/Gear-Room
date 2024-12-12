import React, { useState } from 'react';
import { Button } from './ui/Button';
import { CategorySelect } from './assets/CategorySelect';
import { Asset } from '../types';

const CATEGORIES = [
  'Cameras',
  'Lenses',
  'Lighting',
  'Audio',
  'Accessories',
  'Support',
  'Power',
  'Storage'
];

const SUB_CATEGORIES = {
  'Cameras': ['Cinema Camera', 'DSLR', 'Mirrorless', 'Action Camera'],
  'Lenses': ['Prime', 'Zoom', 'Anamorphic', 'Macro'],
  'Lighting': ['LED', 'Tungsten', 'HMI', 'Fluorescent'],
  'Audio': ['Microphones', 'Recorders', 'Mixers', 'Wireless Systems'],
  'Accessories': ['Filters', 'Cables', 'Memory Cards', 'Batteries'],
  'Support': ['Tripods', 'Gimbals', 'Dollies', 'Sliders'],
  'Power': ['Batteries', 'Chargers', 'Power Supplies', 'Generators'],
  'Storage': ['Hard Drives', 'Memory Cards', 'Card Readers', 'Cases']
};

interface AssetFormProps {
  onSubmit: (data: Partial<Asset>) => void;
  initialData?: Asset;
  onCancel: () => void;
}

export function AssetForm({ onSubmit, initialData, onCancel }: AssetFormProps) {
  const [formData, setFormData] = useState({
    qrCode: initialData?.qrCode || '',
    status: initialData?.status || 'available',
    name: initialData?.name || '',
    model: initialData?.model || '',
    category: initialData?.category || '',
    subCategory: initialData?.subCategory || '',
    brand: initialData?.brand || '',
    serialNumber: initialData?.serialNumber || '',
    quantity: initialData?.quantity || 1,
    teamKit: initialData?.teamKit || '',
    kit: initialData?.kit || '',
    description: initialData?.description || '',
    warrantyDate: initialData?.warrantyDate || '',
    purchasePrice: initialData?.purchasePrice || 0,
    purchaseDate: initialData?.purchaseDate || '',
    photo: initialData?.photo || '',
    notes: initialData?.notes || '',
    maintenanceStatus: initialData?.maintenanceStatus || 'good',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="qrCode">QR Code</label>
          <input
            type="text"
            id="qrCode"
            value={formData.qrCode}
            onChange={(e) => setFormData({ ...formData, qrCode: e.target.value })}
            required
          />
        </div>

        <div>
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as Asset['status'] })}
            required
          >
            <option value="available">Available</option>
            <option value="checked-out">Checked Out</option>
          </select>
        </div>

        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <CategorySelect
          label="Category"
          value={formData.category}
          onChange={(value) => setFormData({ ...formData, category: value })}
          categories={CATEGORIES}
        />

        <CategorySelect
          label="Sub Category"
          value={formData.subCategory}
          onChange={(value) => setFormData({ ...formData, subCategory: value })}
          categories={formData.category ? SUB_CATEGORIES[formData.category as keyof typeof SUB_CATEGORIES] || [] : []}
        />

        <div>
          <label htmlFor="model">Model</label>
          <input
            type="text"
            id="model"
            value={formData.model}
            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
            required
          />
        </div>

        <div>
          <label htmlFor="brand">Brand</label>
          <input
            type="text"
            id="brand"
            value={formData.brand}
            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
            required
          />
        </div>

        <div>
          <label htmlFor="serialNumber">Serial Number</label>
          <input
            type="text"
            id="serialNumber"
            value={formData.serialNumber}
            onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
            required
          />
        </div>

        <div>
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
            min="1"
            required
          />
        </div>

        <div>
          <label htmlFor="teamKit">Team Kit</label>
          <input
            type="text"
            id="teamKit"
            value={formData.teamKit}
            onChange={(e) => setFormData({ ...formData, teamKit: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="kit">Kit</label>
          <input
            type="text"
            id="kit"
            value={formData.kit}
            onChange={(e) => setFormData({ ...formData, kit: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="warrantyDate">Warranty Date</label>
          <input
            type="date"
            id="warrantyDate"
            value={formData.warrantyDate}
            onChange={(e) => setFormData({ ...formData, warrantyDate: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="purchasePrice">Purchase Price</label>
          <input
            type="number"
            id="purchasePrice"
            value={formData.purchasePrice}
            onChange={(e) => setFormData({ ...formData, purchasePrice: parseFloat(e.target.value) })}
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label htmlFor="purchaseDate">Purchase Date</label>
          <input
            type="date"
            id="purchaseDate"
            value={formData.purchaseDate}
            onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="photo">Photo URL</label>
          <input
            type="url"
            id="photo"
            value={formData.photo}
            onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="maintenanceStatus">Maintenance Status</label>
          <select
            id="maintenanceStatus"
            value={formData.maintenanceStatus}
            onChange={(e) => setFormData({ ...formData, maintenanceStatus: e.target.value as Asset['maintenanceStatus'] })}
          >
            <option value="good">Good</option>
            <option value="needs-maintenance">Needs Maintenance</option>
          </select>
        </div>
      </div>

      <div className="col-span-2">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          className="w-full"
        />
      </div>

      <div className="col-span-2">
        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          rows={3}
          className="w-full"
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {initialData ? 'Update' : 'Create'} Asset
        </Button>
      </div>
    </form>
  );
}