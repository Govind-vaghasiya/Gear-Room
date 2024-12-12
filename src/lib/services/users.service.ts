import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { BaseService } from './base.service';
import { COLLECTIONS } from '../constants/collections';
import { EquipmentUser } from '../../types';

class UsersService extends BaseService<EquipmentUser> {
  constructor() {
    super(COLLECTIONS.USERS);
  }

  async getAll(): Promise<EquipmentUser[]> {
    return super.getAll();
  }

  async create(user: Omit<EquipmentUser, 'id'>): Promise<EquipmentUser> {
    return super.create(user);
  }

  async update(id: string, user: Partial<Omit<EquipmentUser, 'id'>>): Promise<void> {
    return super.update(id, user);
  }

  async delete(id: string): Promise<void> {
    return super.delete(id);
  }

  async getByEmail(email: string): Promise<EquipmentUser | null> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where("email", "==", email)
      );
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) {
        return null;
      }
      
      const doc = snapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data()
      } as EquipmentUser;
    } catch (error) {
      console.error('Error getting user by email:', error);
      throw error;
    }
  }
}

export const usersService = new UsersService();