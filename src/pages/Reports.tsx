import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useReports } from '../hooks/useReports';
import { InventoryReport } from '../components/reports/InventoryReport';
import { CheckoutHistoryReport } from '../components/reports/CheckoutHistoryReport';
import { ProductionSummaryReport } from '../components/reports/ProductionSummaryReport';
import { AssetUtilizationReport } from '../components/reports/AssetUtilizationReport';
import { Download, FileText } from 'lucide-react';
import { exportToPdf } from '../lib/utils/export/pdf';
import { exportToCsv } from '../lib/utils/export/csv';

const reportTypes = [
  { id: 'inventory', name: 'Inventory Status', component: InventoryReport },
  { id: 'checkouts', name: 'Check-out History', component: CheckoutHistoryReport },
  { id: 'productions', name: 'Production Summary', component: ProductionSummaryReport },
  { id: 'assets', name: 'Asset Utilization', component: AssetUtilizationReport },
];

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState('');
  const { loading, generateReport } = useReports();
  const [reportData, setReportData] = useState<any>(null);

  const handleGenerateReport = async () => {
    if (!selectedReport) return;
    
    try {
      const data = await generateReport(selectedReport);
      setReportData(data);
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  const handleExport = async (format: 'pdf' | 'csv') => {
    if (!reportData || !selectedReport) return;

    const report = reportTypes.find(r => r.id === selectedReport);
    if (!report) return;

    const filename = `${report.name.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}`;

    if (format === 'pdf') {
      exportToPdf(reportData, filename, selectedReport);
    } else {
      exportToCsv(reportData, filename, selectedReport);
    }
  };

  const ReportComponent = selectedReport ? 
    reportTypes.find(r => r.id === selectedReport)?.component : 
    null;

  return (
    <div className="space-y-6">
      <Card>
        <Card.Header>
          <h2 className="text-lg font-medium">Generate Reports</h2>
        </Card.Header>
        <Card.Content>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Report Type
              </label>
              <select
                value={selectedReport}
                onChange={(e) => {
                  setSelectedReport(e.target.value);
                  setReportData(null);
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Select a report type...</option>
                {reportTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedReport && (
              <div className="flex space-x-4">
                <Button onClick={handleGenerateReport} variant="primary" disabled={loading}>
                  {loading ? 'Generating...' : 'Generate Report'}
                </Button>
                {reportData && (
                  <>
                    <Button onClick={() => handleExport('pdf')} variant="secondary">
                      <FileText className="w-4 h-4 mr-2" />
                      Export PDF
                    </Button>
                    <Button onClick={() => handleExport('csv')} variant="secondary">
                      <Download className="w-4 h-4 mr-2" />
                      Export CSV
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>
        </Card.Content>
      </Card>

      {reportData && ReportComponent && (
        <Card>
          <Card.Content>
            <ReportComponent data={reportData} />
          </Card.Content>
        </Card>
      )}
    </div>
  );
}