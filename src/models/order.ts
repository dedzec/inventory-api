import { IOrder } from '../interfaces/order.interface';

export class Order implements IOrder {
  id?: number;
  supplierId: number;
  orderDate: Date;
  status: 'pending' | 'completed' | 'canceled';

  constructor(supplierId: number, orderDate: Date, status: 'pending' | 'completed' | 'canceled', id?: number) {
    this.supplierId = supplierId;
    this.orderDate = orderDate;
    this.status = status;
    this.id = id;
  }
}
