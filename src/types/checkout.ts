export interface Checkout {
  id?: string;
  assetId: string;
  userId: string;
  productionId: string;
  checkoutDate: string;
  returnDate?: string;
  status: 'checked-out' | 'returned';
}