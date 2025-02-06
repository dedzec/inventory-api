export interface CreateOrderDTO {
  supplierId: number;
  status?: 'pending' | 'completed' | 'canceled';
}
