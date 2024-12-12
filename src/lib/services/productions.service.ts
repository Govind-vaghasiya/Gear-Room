import { BaseService } from './base.service';
import { COLLECTIONS } from '../constants/collections';
import { Production } from '../../types/production';

class ProductionsService extends BaseService<Production> {
  constructor() {
    super(COLLECTIONS.PRODUCTIONS);
  }

  async getAll() {
    return super.getAll();
  }

  async create(production: Omit<Production, 'id'>) {
    return super.create(production);
  }

  async update(id: string, production: Partial<Production>) {
    return super.update(id, production);
  }

  async delete(id: string) {
    return super.delete(id);
  }
}

export const productionsService = new ProductionsService();