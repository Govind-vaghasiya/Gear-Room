export interface Asset {
  id?: string;
  qrCode: string;
  status: 'available' | 'checked-out';
  name: string;
  model: string;
  category: string;
  subCategory: string;
  brand: string;
  serialNumber: string;
  quantity: number;
  teamKit: string;
  kit: string;
  description: string;
  warrantyDate: string;
  purchasePrice: number;
  purchaseDate: string;
  photo: string;
  notes: string;
  maintenanceStatus?: 'good' | 'needs-maintenance';
  nextMaintenanceDate?: string;
  currentProduction?: string;
  lastUserId?: string;
}