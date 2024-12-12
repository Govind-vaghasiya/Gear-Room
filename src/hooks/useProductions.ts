import { useState, useEffect } from 'react';
import { productionsService } from '../lib/services/productions.service';
import { Production } from '../types/production';
import { toast } from 'react-hot-toast';

export function useProductions() {
  const [productions, setProductions] = useState<Production[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadProductions();
  }, []);

  async function loadProductions() {
    try {
      const data = await productionsService.getAll();
      setProductions(data);
    } catch (err) {
      setError(err as Error);
      toast.error('Failed to load productions');
    } finally {
      setLoading(false);
    }
  }

  async function createProduction(production: Omit<Production, 'id'>) {
    try {
      const newProduction = await productionsService.create(production);
      setProductions(prev => [...prev, newProduction]);
      toast.success('Production created successfully');
      return newProduction;
    } catch (err) {
      toast.error('Failed to create production');
      throw err;
    }
  }

  async function updateProduction(id: string, production: Partial<Production>) {
    try {
      await productionsService.update(id, production);
      setProductions(prev => prev.map(p => p.id === id ? { ...p, ...production } : p));
      toast.success('Production updated successfully');
    } catch (err) {
      toast.error('Failed to update production');
      throw err;
    }
  }

  async function deleteProduction(id: string) {
    try {
      await productionsService.delete(id);
      setProductions(prev => prev.filter(p => p.id !== id));
      toast.success('Production deleted successfully');
    } catch (err) {
      toast.error('Failed to delete production');
      throw err;
    }
  }

  return {
    productions,
    loading,
    error,
    createProduction,
    updateProduction,
    deleteProduction,
    refresh: loadProductions
  };
}