import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  DocumentReference,
  QueryConstraint 
} from 'firebase/firestore';
import { db } from '../firebase/db';
import { BaseDocument, ServiceResponse } from './types';
import { DocumentNotFoundError, ServiceError } from './errors';

export abstract class BaseService<T extends BaseDocument> {
  constructor(protected collectionName: string) {}

  protected async executeOperation<R>(
    operation: () => Promise<R>
  ): Promise<ServiceResponse<R>> {
    try {
      const data = await operation();
      return { data, success: true };
    } catch (error) {
      console.error(`Error in ${this.collectionName}:`, error);
      return {
        error: error instanceof Error ? error : new ServiceError('Unknown error occurred'),
        success: false
      };
    }
  }

  protected async getAll(constraints: QueryConstraint[] = []): Promise<ServiceResponse<T[]>> {
    return this.executeOperation(async () => {
      const querySnapshot = await getDocs(collection(db, this.collectionName));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as T[];
    });
  }

  protected async getById(id: string): Promise<ServiceResponse<T>> {
    return this.executeOperation(async () => {
      const docRef = doc(db, this.collectionName, id);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        throw new DocumentNotFoundError(id, this.collectionName);
      }
      
      return {
        id: docSnap.id,
        ...docSnap.data()
      } as T;
    });
  }

  protected async create(data: Omit<T, 'id'>): Promise<ServiceResponse<T>> {
    return this.executeOperation(async () => {
      const docRef = await addDoc(collection(db, this.collectionName), {
        ...data,
        createdAt: new Date().toISOString()
      });

      return {
        id: docRef.id,
        ...data,
        createdAt: new Date().toISOString()
      } as T;
    });
  }

  protected async update(id: string, data: Partial<Omit<T, 'id'>>): Promise<ServiceResponse<void>> {
    return this.executeOperation(async () => {
      const docRef = doc(db, this.collectionName, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: new Date().toISOString()
      });
    });
  }

  protected async delete(id: string): Promise<ServiceResponse<void>> {
    return this.executeOperation(async () => {
      const docRef = doc(db, this.collectionName, id);
      await deleteDoc(docRef);
    });
  }
}