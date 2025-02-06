import { Request, Response, NextFunction } from 'express';
import { inventoryService } from '../services/inventoryService';

export const inventoryController = {
  // Cria um novo produto
  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await inventoryService.createProduct(req.body);
      res.status(201).json({ data: product });
    } catch (error) {
      next(error);
    }
  },

  // Lista todos os produtos
  async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await inventoryService.getProducts();
      res.status(200).json({ data: products });
    } catch (error) {
      next(error);
    }
  },

  // Atualiza a quantidade em estoque de um produto
  async updateProductStock(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { quantity } = req.body;
      const updated = await inventoryService.updateProductStock(parseInt(id, 10), quantity);
      res.status(200).json({ data: updated });
    } catch (error) {
      next(error);
    }
  }
};
