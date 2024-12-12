export interface MaintenanceRecord {
  id: string;
  assetId: string;
  date: string;
  type: 'routine' | 'repair';
  description: string;
  cost: number;
  technician: string;
  status: 'scheduled' | 'in-progress' | 'completed';
}