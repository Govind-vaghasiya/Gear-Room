import { collection, query, where, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { COLLECTIONS } from '../constants/collections';
import { assetsService } from './assets.service';
import { Checkout } from '../../types/checkout';

class CheckoutService {
  async checkoutItem(assetId: string, userId: string, productionId: string) {
    try {
      // Create checkout record
      const checkoutData = {
        assetId,
        userId,
        productionId,
        checkoutDate: new Date().toISOString(),
        status: 'checked-out'
      };
      
      const docRef = await addDoc(collection(db, COLLECTIONS.CHECKOUTS), checkoutData);

      // Update asset status
      await assetsService.update(assetId, {
        status: 'checked-out',
        currentProduction: productionId,
        lastUserId: userId
      });

      return { id: docRef.id, ...checkoutData };
    } catch (error) {
      console.error('Error checking out item:', error);
      throw error;
    }
  }

  async getCheckoutsByProduction(productionId: string) {
    try {
      const q = query(
        collection(db, COLLECTIONS.CHECKOUTS),
        where('productionId', '==', productionId)
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Checkout[];
    } catch (error) {
      console.error('Error getting checkouts:', error);
      throw error;
    }
  }

  async checkinItem(assetId: string) {
    try {
      // Find active checkout
      const q = query(
        collection(db, COLLECTIONS.CHECKOUTS),
        where('assetId', '==', assetId),
        where('status', '==', 'checked-out')
      );
      
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const checkout = snapshot.docs[0];
        
        // Update checkout status
        await updateDoc(doc(db, COLLECTIONS.CHECKOUTS, checkout.id), {
          returnDate: new Date().toISOString(),
          status: 'returned'
        });

        // Update asset status
        await assetsService.update(assetId, {
          status: 'available',
          currentProduction: '',
          lastUserId: ''
        });

        return true;
      }
      return false;
    } catch (error) {
      console.error('Error checking in item:', error);
      throw error;
    }
  }
}

export const checkoutService = new CheckoutService();