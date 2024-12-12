import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { BaseService } from '../base/service';
import { COLLECTIONS } from '../../constants/collections';
import { UserDocument, CreateUserData, UpdateUserData } from './types';
import { validateCreateUser, validateUpdateUser } from './validation';
import { ServiceResponse } from '../base/types';
import { DocumentNotFoundError } from '../base/errors';

class UsersService extends BaseService<UserDocument> {
  constructor() {
    super(COLLECTIONS.USERS);
  }

  async update(id: string, userData: UpdateUserData): Promise<ServiceResponse<void>> {
    return this.executeOperation(async () => {
      validateUpdateUser(userData);
      
      // First check if document exists
      const docRef = doc(db, this.collectionName, id);
      const docSnap = await docRef.get();
      
      if (!docSnap.exists()) {
        throw new DocumentNotFoundError(id, this.collectionName);
      }

      // Update the document
      await updateDoc(docRef, {
        ...userData,
        updatedAt: new Date().toISOString()
      });
    });
  }

  // Rest of the service implementation remains the same...
}

export const usersService = new UsersService();