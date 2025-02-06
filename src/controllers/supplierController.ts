import { Request, Response, NextFunction } from 'express';
import { supplierService } from '../services/supplierService';

export const supplierController = {
  async createSupplier(req: Request, res: Response, next: NextFunction) {
    try {
      const supplier = await supplierService.createSupplier(req.body);
      res.status(201).json({ data: supplier });
    } catch (error) {
      next(error);
    }
  },

  async getSuppliers(req: Request, res: Response, next: NextFunction) {
    try {
      const suppliers = await supplierService.getSuppliers();
      res.status(200).json({ data: suppliers });
    } catch (error) {
      next(error);
    }
  },

  async deleteSupplier(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const deleted = await supplierService.deleteSupplier(parseInt(id, 10));
      res.status(200).json({ data: deleted });
    } catch (error) {
      next(error);
    }
  },
};
