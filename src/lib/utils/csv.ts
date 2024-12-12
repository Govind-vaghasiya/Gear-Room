import { parse, unparse } from 'papaparse';
import { Asset } from '../../types';
import { toast } from 'react-hot-toast';

export function exportAssetsToCSV(assets: Asset[]): void {
  try {
    const data = assets.map(asset => ({
      'Name': asset.name,
      'QR Code': asset.qrCode,
      'Status': asset.status,
      'Category': asset.category,
      'Model': asset.model,
      'Brand': asset.brand,
      'Serial Number': asset.serialNumber,
      'Purchase Date': asset.purchaseDate,
      'Purchase Price': asset.purchasePrice,
      'Maintenance Status': asset.maintenanceStatus,
      'Description': asset.description,
      'Notes': asset.notes
    }));

    const csv = unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `assets_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Assets exported successfully');
  } catch (error) {
    console.error('Error exporting assets:', error);
    toast.error('Failed to export assets');
  }
}

export function parseAssetCSV(file: File): Promise<Partial<Asset>[]> {
  return new Promise((resolve, reject) => {
    parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const assets = results.data.map((row: any) => ({
            name: row['Name'],
            qrCode: row['QR Code'],
            status: row['Status'] || 'available',
            category: row['Category'],
            model: row['Model'],
            brand: row['Brand'],
            serialNumber: row['Serial Number'],
            purchaseDate: row['Purchase Date'],
            purchasePrice: parseFloat(row['Purchase Price']) || 0,
            maintenanceStatus: row['Maintenance Status'] || 'good',
            description: row['Description'] || '',
            notes: row['Notes'] || '',
            quantity: 1,
            teamKit: '',
            kit: '',
            photo: '',
            warrantyDate: ''
          }));

          // Validate required fields
          const invalidAssets = assets.filter(asset => 
            !asset.name || !asset.qrCode || !asset.category
          );

          if (invalidAssets.length > 0) {
            throw new Error('Some assets are missing required fields (Name, QR Code, or Category)');
          }

          resolve(assets);
        } catch (error) {
          reject(error);
        }
      },
      error: (error) => {
        reject(new Error(`Failed to parse CSV: ${error.message}`));
      }
    });
  });
}