export interface IOrder {
  id?: number;
  supplierId: number;
  orderDate: Date;
  status: 'pending' | 'completed' | 'canceled';
}
