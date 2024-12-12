import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { COLLECTIONS } from '../lib/constants/collections';
import { Checkout } from '../types';

export function useCheckoutHistory(productionId: string) {
  const [checkouts, setCheckouts] = useState<Checkout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!productionId) {
      setCheckouts([]);
      setLoading(false);
      return;
    }

    async function loadCheckouts() {
      try {
        const q = query(
          collection(db, COLLECTIONS.CHECKOUTS),
          where('productionId', '==', productionId)
        );
        
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ 
          id: doc.id, 
          ...doc.data() 
        })) as Checkout[];
        
        // Sort in memory
        const sortedData = data.sort((a, b) => 
          new Date(b.checkoutDate).getTime() - new Date(a.checkoutDate).getTime()
        );
        
        setCheckouts(sortedData);
      } catch (err) {
        console.error('Error loading checkouts:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    loadCheckouts();
  }, [productionId]);

  return { checkouts, loading, error };
}