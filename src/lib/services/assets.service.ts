import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { BaseService } from './base.service';
import { COLLECTIONS } from '../constants/collections';
import { Asset } from '../../types';

class AssetsService extends BaseService<Asset> {
  constructor() {
    super(COLLECTIONS.ASSETS);
  }

  async getAll() {
    return super.getAll();
  }

  async create(asset: Omit<Asset, 'id'>) {
    return super.create(asset);
  }

  async update(id: string, asset: Partial<Asset>) {
    return super.update(id, asset);
  }

  async delete(id: string) {
    return super.delete(id);
  }

  async getByQrCode(qrCode: string) {
    const q = query(
      collection(db, this.collectionName),
      where("qrCode", "==", qrCode)
    );
    const snapshot = await getDocs(q);
    return snapshot.empty ? null : { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as Asset;
  }
}

export const assetsService = new AssetsService();