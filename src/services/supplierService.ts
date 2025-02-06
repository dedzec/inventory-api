import { CreateSupplierDTO } from '../dtos/createSupplier.dto';
import { Supplier } from '../models/supplier';
import { supplierRepository } from '../repositories/supplierRepository';

export const supplierService = {
  async createSupplier(data: CreateSupplierDTO): Promise<Supplier> {
    const supplier = new Supplier(data.name, data.contactInfo);
    return await supplierRepository.create(supplier);
  },

  async getSuppliers(): Promise<Supplier[]> {
    return await supplierRepository.findAll();
  },

  async deleteSupplier(id: number): Promise<boolean> {
    return await supplierRepository.delete(id);
  },
};
