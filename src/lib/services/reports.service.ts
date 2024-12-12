import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { COLLECTIONS } from '../constants/collections';
import { Asset, Checkout, Production } from '../../types';

class ReportsService {
  async getInventoryStatus() {
    const assetsRef = collection(db, COLLECTIONS.ASSETS);
    const snapshot = await getDocs(assetsRef);
    const assets = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Asset[];

    const summary = {
      total: assets.length,
      available: assets.filter(a => a.status === 'available').length,
      checkedOut: assets.filter(a => a.status === 'checked-out').length,
      needsMaintenance: assets.filter(a => a.maintenanceStatus === 'needs-maintenance').length
    };

    const items = assets.map(asset => ({
      id: asset.id!,
      name: asset.name,
      status: asset.status,
      maintenanceStatus: asset.maintenanceStatus || 'good',
      category: asset.category
    }));

    return {
      summary,
      items
    };
  }

  async getCheckoutHistory() {
    const checkoutsRef = collection(db, COLLECTIONS.CHECKOUTS);
    const assetsRef = collection(db, COLLECTIONS.ASSETS);
    
    const [checkoutsSnapshot, assetsSnapshot] = await Promise.all([
      getDocs(checkoutsRef),
      getDocs(assetsRef)
    ]);

    const assets = new Map(
      assetsSnapshot.docs.map(doc => [doc.id, { id: doc.id, ...doc.data() }])
    );

    const checkouts = checkoutsSnapshot.docs.map(doc => {
      const checkout = { id: doc.id, ...doc.data() } as Checkout;
      const asset = assets.get(checkout.assetId);
      return {
        ...checkout,
        assetName: asset?.name || 'Unknown Asset'
      };
    });

    return checkouts;
  }

  async getProductionSummary() {
    const productionsRef = collection(db, COLLECTIONS.PRODUCTIONS);
    const snapshot = await getDocs(productionsRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Production[];
  }

  async getAssetUtilization() {
    const checkoutsRef = collection(db, COLLECTIONS.CHECKOUTS);
    const assetsRef = collection(db, COLLECTIONS.ASSETS);
    
    const [checkoutsSnapshot, assetsSnapshot] = await Promise.all([
      getDocs(checkoutsRef),
      getDocs(assetsRef)
    ]);

    const assets = new Map(
      assetsSnapshot.docs.map(doc => [doc.id, { id: doc.id, ...doc.data() }])
    );

    const utilization: Record<string, {
      assetName: string;
      totalCheckouts: number;
      totalDays: number;
    }> = {};

    checkoutsSnapshot.docs.forEach(doc => {
      const checkout = { id: doc.id, ...doc.data() } as Checkout;
      const asset = assets.get(checkout.assetId);
      
      if (!utilization[checkout.assetId]) {
        utilization[checkout.assetId] = {
          assetName: asset?.name || 'Unknown Asset',
          totalCheckouts: 0,
          totalDays: 0
        };
      }
      
      utilization[checkout.assetId].totalCheckouts++;
      
      if (checkout.returnDate) {
        const days = Math.ceil(
          (new Date(checkout.returnDate).getTime() - new Date(checkout.checkoutDate).getTime()) 
          / (1000 * 60 * 60 * 24)
        );
        utilization[checkout.assetId].totalDays += days;
      }
    });

    return utilization;
  }
}

export const reportsService = new ReportsService();