import { format } from 'date-fns';

export function exportToCsv(data: any, filename: string, reportType: string) {
  const csvContent = generateCsvContent(data, reportType);
  downloadCsv(csvContent, filename);
}

function generateCsvContent(data: any, reportType: string): string {
  switch (reportType) {
    case 'inventory':
      return generateInventoryCsv(data);
    case 'checkouts':
      return generateCheckoutsCsv(data);
    case 'productions':
      return generateProductionsCsv(data);
    case 'assets':
      return generateAssetUtilizationCsv(data);
    default:
      throw new Error('Invalid report type');
  }
}

function generateInventoryCsv(data: any): string {
  const header = ['Item Name', 'Category', 'Status', 'Maintenance Status'];
  const summaryRow = ['SUMMARY', '', '', ''];
  const summaryData = [
    ['Total Items', data.summary.total, '', ''],
    ['Available', data.summary.available, '', ''],
    ['Checked Out', data.summary.checkedOut, '', ''],
    ['Needs Maintenance', data.summary.needsMaintenance, '', '']
  ];
  
  const itemRows = data.items.map((item: any) => [
    item.name,
    item.category,
    item.status,
    item.maintenanceStatus
  ]);

  return [
    header.join(','),
    summaryRow.join(','),
    ...summaryData.map(row => row.join(',')),
    '',
    'DETAILED INVENTORY',
    header.join(','),
    ...itemRows.map(row => row.join(','))
  ].join('\n');
}

function generateCheckoutsCsv(data: any): string {
  const header = ['Item Name', 'User', 'Checkout Date', 'Return Date', 'Status'];
  const rows = data.map((item: any) => [
    item.assetName,
    item.userId,
    format(new Date(item.checkoutDate), 'MMM d, yyyy'),
    item.returnDate ? format(new Date(item.returnDate), 'MMM d, yyyy') : '-',
    item.status
  ]);
  
  return [header.join(','), ...rows.map(row => row.join(','))].join('\n');
}

function generateProductionsCsv(data: any): string {
  const header = ['Production Name', 'DOP Name', 'Shooting Date', 'Show Name', 'Status'];
  const rows = data.map((item: any) => [
    item.name,
    item.dopName,
    format(new Date(item.shootingDate), 'MMM d, yyyy'),
    item.showName,
    item.status
  ]);
  
  return [header.join(','), ...rows.map(row => row.join(','))].join('\n');
}

function generateAssetUtilizationCsv(data: any): string {
  const header = ['Item Name', 'Total Checkouts', 'Total Days Used', 'Average Days/Checkout'];
  const rows = Object.entries(data).map(([_, stats]: [string, any]) => [
    stats.assetName,
    stats.totalCheckouts,
    stats.totalDays,
    (stats.totalDays / stats.totalCheckouts).toFixed(1)
  ]);
  
  return [header.join(','), ...rows.map(row => row.join(','))].join('\n');
}

function downloadCsv(csvContent: string, filename: string) {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}