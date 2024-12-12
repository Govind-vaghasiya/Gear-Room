import { ValidationError } from '../base/errors';
import { CreateAssetData, UpdateAssetData } from './types';

export function validateCreateAsset(data: CreateAssetData): void {
  if (!data.qrCode) {
    throw new ValidationError('QR Code is required');
  }
  if (!data.name) {
    throw new ValidationError('Name is required');
  }
  if (!data.category) {
    throw new ValidationError('Category is required');
  }
}

export function validateUpdateAsset(data: UpdateAssetData): void {
  if (data.qrCode === '') {
    throw new ValidationError('QR Code cannot be empty');
  }
  if (data.name === '') {
    throw new ValidationError('Name cannot be empty');
  }
}