import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from './index';
import { COLLECTIONS } from '../constants/collections';

const dummyAssets = [
  {
    name: 'Sony FX6',
    category: 'Cameras',
    qrCode: 'CAM001',
    status: 'available',
    maintenanceStatus: 'good',
    nextMaintenanceDate: '2024-05-01',
    createdAt: new Date().toISOString()
  },
  {
    name: 'Canon CN-E 50mm',
    category: 'Lenses',
    qrCode: 'LENS001',
    status: 'available',
    maintenanceStatus: 'good',
    nextMaintenanceDate: '2024-06-01',
    createdAt: new Date().toISOString()
  },
  {
    name: 'Aputure 600d Pro',
    category: 'Lighting',
    qrCode: 'LIGHT001',
    status: 'available',
    maintenanceStatus: 'needs-maintenance',
    nextMaintenanceDate: '2024-04-01',
    createdAt: new Date().toISOString()
  }
];

const dummyUsers = [
  {
    name: 'John Smith',
    email: 'john@example.com',
    phone: '123-456-7890',
    department: 'Camera',
    role: 'Camera Operator',
    accessLevel: 'advanced',
    assignedAssets: [],
    createdAt: new Date().toISOString()
  }
];

const dummyProductions = [
  {
    name: 'Summer Commercial',
    dopName: 'Michael Chen',
    shootingDate: '2024-04-01',
    showName: 'Beach Resort Ad',
    status: 'active',
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

    // Add dummy users
    for (const user of dummyUsers) {
      await addDoc(collection(db, COLLECTIONS.USERS), user);
    }

    // Add dummy productions
    for (const production of dummyProductions) {
      await addDoc(collection(db, COLLECTIONS.PRODUCTIONS), production);
    }

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}