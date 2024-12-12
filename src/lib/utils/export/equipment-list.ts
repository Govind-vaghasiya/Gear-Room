import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';
import { Asset, Checkout, Production } from '../../../types';

function formatDate(date: string | undefined | null): string {
  if (!date) return '-';
  try {
    return format(new Date(date), 'MMM d, yyyy HH:mm');
  } catch (error) {
    console.error('Invalid date:', date);
    return '-';
  }
}

function addHeader(doc: jsPDF, production: Production) {
  doc.setFontSize(18);
  doc.text(`${production.name} - Equipment List`, 14, 20);
  doc.setFontSize(12);
  doc.text(`Generated on: ${format(new Date(), 'MMMM d, yyyy')}`, 14, 30);
}

function addProductionDetails(doc: jsPDF, production: Production) {
  doc.setFontSize(12);
  doc.text('Production Details:', 14, 45);
  doc.setFontSize(10);
  doc.text(`DOP: ${production.dopName}`, 14, 55);
  doc.text(`Show: ${production.showName}`, 14, 62);
  doc.text(`Shooting Date: ${formatDate(production.shootingDate)}`, 14, 69);
}

function addEquipmentTable(doc: jsPDF, checkouts: Checkout[], assets: Asset[], isCheckIn: boolean) {
  const tableData = checkouts.map(checkout => {
    const asset = assets.find(a => a.id === checkout.assetId);
    const date = isCheckIn ? checkout.returnDate : checkout.checkoutDate;
    
    return [
      asset?.qrCode || '-',
      asset?.name || 'Unknown Asset',
      asset?.category || '-',
      formatDate(date),
      checkout.status
    ];
  });

  autoTable(doc, {
    startY: 80,
    head: [['QR Code', 'Equipment Name', 'Category', `${isCheckIn ? 'Check In' : 'Check Out'} Date & Time`, 'Status']],
    body: tableData,
    styles: {
      fontSize: 10
    },
    headStyles: {
      fillColor: [69, 78, 89]
    }
  });
}

function addFooter(doc: jsPDF) {
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.text(
      `Page ${i} of ${pageCount}`,
      doc.internal.pageSize.width / 2,
      doc.internal.pageSize.height - 10,
      { align: 'center' }
    );
  }
}

export function exportEquipmentList(
  production: Production,
  checkouts: Checkout[],
  assets: Asset[],
  isCheckIn: boolean = false
) {
  const doc = new jsPDF();
  
  addHeader(doc, production);
  addProductionDetails(doc, production);
  addEquipmentTable(doc, checkouts, assets, isCheckIn);
  addFooter(doc);

  doc.save(`${production.name}-equipment-list.pdf`);
}