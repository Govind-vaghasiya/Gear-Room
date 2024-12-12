export interface EquipmentUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  accessLevel: 'basic' | 'advanced' | 'admin';
  assignedAssets: string[];
  checkoutHistory: {
    assetId: string;
    checkoutDate: string;
    returnDate?: string;
  }[];
}