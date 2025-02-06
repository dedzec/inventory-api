import { IMovement } from '../interfaces/movement.interface';

export class Movement implements IMovement {
  id?: number;
  productId: number;
  type: 'in' | 'out' | 'adjustment' ;
  quantity: number;
  reason?: string;
  movementDate: Date;

  constructor(productId: number, type: 'in' | 'out' | 'adjustment', quantity: number, movementDate: Date, reason?: string, id?: number) {
    this.productId = productId;
    this.type = type;
    this.quantity = quantity;
    this.movementDate = movementDate;

    this.reason = reason;
    this.id = id;
  }
}
