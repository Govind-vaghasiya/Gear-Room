import { ValidationError } from '../base/errors';
import { CreateUserData, UpdateUserData } from './types';

export function validateCreateUser(data: CreateUserData): void {
  if (!data.email || !data.email.includes('@')) {
    throw new ValidationError('Invalid email address');
  }
  if (!data.name || data.name.trim().length < 2) {
    throw new ValidationError('Name must be at least 2 characters long');
  }
  if (!data.phone) {
    throw new ValidationError('Phone number is required');
  }
}

export function validateUpdateUser(data: UpdateUserData): void {
  if (data.email && !data.email.includes('@')) {
    throw new ValidationError('Invalid email address');
  }
  if (data.name && data.name.trim().length < 2) {
    throw new ValidationError('Name must be at least 2 characters long');
  }
}