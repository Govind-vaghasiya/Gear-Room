import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from './db';
import { COLLECTIONS } from '../../constants/collections';

const dummyAssets = [
  {
    name: 'Sony FX6',
    category: 'Cameras',
    qrCode: 'CAM001',
    status: 'available',
    maintenanceStatus: 'good',
    nextMaintenanceDate: '2024-05-01',
    model: 'FX6',
    brand: 'Sony',
    serialNumber: 'FX6001',
    quantity: 1,
    teamKit: '',
    kit: '',
    description: 'Professional Cinema Camera',
    warrantyDate: '2025-03-15',
    purchasePrice: 5999.99,
    purchaseDate: '2024-03-15',
    photo: '',
    notes: '',
    createdAt: new Date().toISOString()
  },
  {
    name: 'Canon CN-E 50mm',
    category: 'Lenses',
    qrCode: 'LENS001',
    status: 'available',
    maintenanceStatus: 'good',
    nextMaintenanceDate: '2024-06-01',
    model: 'CN-E 50mm T1.3 L F',
    brand: 'Canon',
    serialNumber: 'CNE50001',
    quantity: 1,
    teamKit: '',
    kit: '',
    description: 'Cinema Prime Lens',
    warrantyDate: '2025-03-15',
    purchasePrice: 3999.99,
    purchaseDate: '2024-03-15',
    photo: '',
    notes: '',
    createdAt: new Date().toISOString()
  },
  {
    name: 'Aputure 600d Pro',
    category: 'Lighting',
    qrCode: 'LIGHT001',
    status: 'available',
    maintenanceStatus: 'needs-maintenance',
    nextMaintenanceDate: '2024-04-01',
    model: '600d Pro',
    brand: 'Aputure',
    serialNumber: 'AP600001',
    quantity: 1,
    teamKit: '',
    kit: '',
    description: 'LED Light',
    warrantyDate: '2025-03-15',
    purchasePrice: 1899.99,
    purchaseDate: '2024-03-15',
    photo: '',
    notes: '',
    createdAt: new Date().toISOString()
  }
];

export async function seedDatabase() {
  try {
    // Check if data already exists
    const assetsQuery = query(collection(db, COLLECTIONS.ASSETS), where('qrCode', '==', 'CAM001'));
    const assetsSnapshot = await getDocs(assetsQuery);
    
    if (!assetsSnapshot.empty) {
      console.log('Database already seeded');
      return;
    }

    // Add dummy assets
    for (const asset of dummyAssets) {
      await addDoc(collection(db, COLLECTIONS.ASSETS), asset);
    }

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}