import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { toast } from 'react-hot-toast';
import { useProductions } from '../hooks/useProductions';
import { useAssets } from '../hooks/useAssets';
import { useUsers } from '../hooks/useUsers';
import { useCheckoutHistory } from '../hooks/useCheckoutHistory';
import { CheckoutForm } from '../components/checkout/CheckoutForm';
import { CheckoutHistory } from '../components/checkout/CheckoutHistory';
import { useCheckoutForm } from '../hooks/useCheckoutForm';
import { ProductionReport } from '../components/reports/ProductionReport';
import { exportEquipmentList } from '../lib/utils/export/equipment-list';

const CheckIn: React.FC = () => {
  const { productions } = useProductions();
  const { assets } = useAssets();
  const { users } = useUsers();
  const [showReport, setShowReport] = useState(false);
  
  const {
    selectedProduction,
    setSelectedProduction,
    showScanner,
    setShowScanner,
    manualCode,
    setManualCode,
    handleScan,
    handleManualSubmit
  } = useCheckoutForm(true);

  const { checkouts } = useCheckoutHistory(selectedProduction);
  const selectedProductionData = productions.find(p => p.id === selectedProduction);

  const handlePrint = () => {
    if (!selectedProductionData) return;
    exportEquipmentList(selectedProductionData, checkouts, assets, true);
  };

  return (
    <div className="space-y-6">
      <Card>
        <Card.Header>
          <h2 className="text-lg font-medium">Check In Items</h2>
        </Card.Header>
        <Card.Content>
          <CheckoutForm
            selectedProduction={selectedProduction}
            productions={productions}
            onProductionChange={setSelectedProduction}
            showScanner={showScanner}
            onToggleScanner={() => setShowScanner(!showScanner)}
            onScan={handleScan}
            onError={(error) => {
              console.error(error);
              toast.error('Error scanning QR code');
            }}
            manualCode={manualCode}
            onManualCodeChange={setManualCode}
            onManualSubmit={handleManualSubmit}
            isCheckIn={true}
          />
        </Card.Content>
      </Card>

      {selectedProduction && (
        <>
          <div id="production-report">
            <ProductionReport
              production={selectedProductionData!}
              checkouts={checkouts}
              assets={assets}
            />
          </div>
          <CheckoutHistory
            checkouts={checkouts}
            assets={assets}
            users={users}
            production={selectedProductionData}
            onPrint={handlePrint}
            isCheckIn={true}
          />
        </>
      )}
    </div>
  );
};

export default CheckIn;