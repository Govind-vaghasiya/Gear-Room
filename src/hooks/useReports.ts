import { useState } from 'react';
import { reportsService } from '../lib/services/reports.service';
import { toast } from 'react-hot-toast';

export function useReports() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  async function generateReport(type: string) {
    setLoading(true);
    try {
      let data;
      switch (type) {
        case 'inventory':
          data = await reportsService.getInventoryStatus();
          break;
        case 'checkouts':
          data = await reportsService.getCheckoutHistory();
          break;
        case 'productions':
          data = await reportsService.getProductionSummary();
          break;
        case 'assets':
          data = await reportsService.getAssetUtilization();
          break;
        default:
          throw new Error('Invalid report type');
      }
      return data;
    } catch (err) {
      setError(err as Error);
      toast.error('Failed to generate report');
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    error,
    generateReport
  };
}