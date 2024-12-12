import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';

export function exportToPdf(data: any, filename: string, reportType: string) {
  const doc = new jsPDF();
  const title = getReportTitle(reportType);
  
  addHeader(doc, title);
  addContent(doc, data, reportType);
  doc.save(`${filename}.pdf`);
}

function addHeader(doc: jsPDF, title: string) {
  doc.setFontSize(18);
  doc.text(title, 14, 20);
  doc.setFontSize(12);
  doc.text(`Generated on: ${format(new Date(), 'MMMM d, yyyy')}`, 14, 30);
}

function addContent(doc: jsPDF, data: any, reportType: string) {
  switch (reportType) {
    case 'inventory':
      addInventoryReport(doc, data);
      break;
    case 'checkouts':
      addCheckoutHistoryReport(doc, data);
      break;
    case 'productions':
      addProductionSummaryReport(doc, data);
      break;
    case 'assets':
      addAssetUtilizationReport(doc, data);
      break;
  }
}

function addInventoryReport(doc: jsPDF, data: any) {
  const summaryData = [
    ['Total', 'Available', 'Checked Out', 'Needs Maintenance'],
    [data.summary.total, data.summary.available, data.summary.checkedOut, data.summary.needsMaintenance]
  ];

  autoTable(doc, {
    startY: 40,
    head: [summaryData[0]],
    body: [summaryData[1]],
    margin: { top: 40 }
  });

  const itemsData = data.items.map((item: any) => [
    item.name,
    item.category,
    item.status,
    item.maintenanceStatus
  ]);

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: [['Item Name', 'Category', 'Status', 'Maintenance Status']],
    body: itemsData,
    margin: { top: 10 }
  });
}

function addCheckoutHistoryReport(doc: jsPDF, data: any) {
  const tableData = data.map((item: any) => [
    item.assetName,
    item.userId,
    format(new Date(item.checkoutDate), 'MMM d, yyyy'),
    item.returnDate ? format(new Date(item.returnDate), 'MMM d, yyyy') : '-',
    item.status
  ]);

  autoTable(doc, {
    startY: 40,
    head: [['Item Name', 'User', 'Checkout Date', 'Return Date', 'Status']],
    body: tableData
  });
}

function addAssetUtilizationReport(doc: jsPDF, data: any) {
  const tableData = Object.entries(data).map(([_, stats]: [string, any]) => [
    stats.assetName,
    stats.totalCheckouts,
    stats.totalDays,
    (stats.totalDays / stats.totalCheckouts).toFixed(1)
  ]);

  autoTable(doc, {
    startY: 40,
    head: [['Item Name', 'Total Checkouts', 'Total Days Used', 'Average Days/Checkout']],
    body: tableData
  });
}

function addProductionSummaryReport(doc: jsPDF, data: any) {
  const tableData = data.map((item: any) => [
    item.name,
    item.dopName,
    format(new Date(item.shootingDate), 'MMM d, yyyy'),
    item.showName,
    item.status
  ]);

  autoTable(doc, {
    startY: 40,
    head: [['Production Name', 'DOP Name', 'Shooting Date', 'Show Name', 'Status']],
    body: tableData
  });
}

function getReportTitle(reportType: string): string {
  switch (reportType) {
    case 'inventory':
      return 'Inventory Status Report';
    case 'checkouts':
      return 'Check-out History Report';
    case 'productions':
      return 'Production Summary Report';
    case 'assets':
      return 'Asset Utilization Report';
    default:
      return 'Report';
  }
}