import { Request, Response, NextFunction } from 'express';
import { orderService } from '../services/orderService';

export const orderController = {
  async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await orderService.createOrder(req.body);
      res.status(201).json({ data: order });
    } catch (error) {
      next(error);
    }
  },

  async getOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await orderService.getOrders();
      res.status(200).json({ data: orders });
    } catch (error) {
      next(error);
    }
  },

  async updateOrderStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updated = await orderService.updateOrderStatus(parseInt(id, 10), status);
      res.status(200).json({ data: updated });
    } catch (error) {
      next(error);
    }
  }
};
