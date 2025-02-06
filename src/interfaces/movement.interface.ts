export interface IMovement {
  id?: number;
  productId: number;
  type: 'in' | 'out' | 'adjustment';
  quantity: number;
  reason?: string;
  movementDate: Date;
}
