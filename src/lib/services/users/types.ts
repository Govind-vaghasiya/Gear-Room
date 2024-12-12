import { BaseDocument } from '../base/types';

export interface UserDocument extends BaseDocument {
  name: string;
  email: string;
  phone: string;
  department: string;
  role: string;
  accessLevel: 'basic' | 'advanced' | 'admin';
  assignedAssets: string[];
  checkoutHistory: {
    assetId: string;
    checkoutDate: string;
    returnDate?: string;
  }[];
}

export type CreateUserData = Omit<UserDocument, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateUserData = Partial<CreateUserData>;