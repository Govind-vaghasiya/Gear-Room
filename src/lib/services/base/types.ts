import { DocumentData } from 'firebase/firestore';

export interface BaseDocument extends DocumentData {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ServiceResponse<T> {
  data?: T;
  error?: Error;
  success: boolean;
}