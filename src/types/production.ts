export interface Production {
  id?: string;
  name: string;
  dopName: string;
  shootingDate: string;
  showName: string;
  status: 'active' | 'completed' | 'cancelled';
}