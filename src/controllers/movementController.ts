import { Request, Response, NextFunction } from 'express';
import { movementService } from '../services/movementService';

export const movementController = {
  async createMovement(req: Request, res: Response, next: NextFunction) {
    try {
      const movement = await movementService.createMovement(req.body);
      res.status(201).json({ data: movement });
    } catch (error) {
      next(error);
    }
  },

  async getMovements(req: Request, res: Response, next: NextFunction) {
    try {
      const movements = await movementService.getMovements();
      res.status(200).json({ data: movements });
    } catch (error) {
      next(error);
    }
  }
};
