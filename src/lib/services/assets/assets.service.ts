import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/db';
import { BaseService } from '../base/service';
import { COLLECTIONS } from '../../constants/collections';
import { AssetDocument, CreateAssetData, UpdateAssetData } from './types';
import { validateCreateAsset, validateUpdateAsset } from './validation';
import { ServiceResponse } from '../base/types';

class AssetsService extends BaseService<AssetDocument> {
  constructor() {
    super(COLLECTIONS.ASSETS);
  }

  async create(data: CreateAssetData): Promise<ServiceResponse<AssetDocument>> {
    return this.executeOperation(async () => {
      validateCreateAsset(data);
      const existingAsset = await this.getByQrCode(data.qrCode);
      
      if (existingAsset.data) {
        throw new Error('Asset with this QR code already exists');
      }

      return super.create(data);
    });
  }

  async update(id: string, data: UpdateAssetData): Promise<ServiceResponse<void>> {
    return this.executeOperation(async () => {
      validateUpdateAsset(data);
      return super.update(id, data);
    });
  }

  async getByQrCode(qrCode: string): Promise<ServiceResponse<AssetDocument | null>> {
    return this.executeOperation(async () => {
      const q = query(
        collection(db, this.collectionName),
        where("qrCode", "==", qrCode)
      );
      
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        return null;
      }
      
      const doc = snapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data()
      } as AssetDocument;
    });
  }
}

export const assetsService = new AssetsService();