import { CreateMovementDTO } from '../dtos/createMovement.dto';
import { Movement } from '../models/movement';
import { movementRepository } from '../repositories/movementRepository';

export const movementService = {
  async createMovement(data: CreateMovementDTO): Promise<Movement> {
    const movement = new Movement(data.productId, data.type, data.quantity, new Date());
    return await movementRepository.create(movement);
  },

  async getMovements(): Promise<Movement[]> {
    return await movementRepository.findAll();
  }
};
