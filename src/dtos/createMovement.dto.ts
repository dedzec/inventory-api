export interface CreateMovementDTO {
  productId: number;
  type: 'in' | 'out' | 'adjustment';
  quantity: number;
}
