import { CreateOrderDTO } from '../dtos/createOrder.dto';
import { Order } from '../models/order';
import { orderRepository } from '../repositories/orderRepository';

export const orderService = {
  async createOrder(data: CreateOrderDTO): Promise<Order> {
    const order = new Order(data.supplierId, new Date(), data.status || 'pending');
    return await orderRepository.create(order);
  },

  async getOrders(): Promise<Order[]> {
    return await orderRepository.findAll();
  },

  async updateOrderStatus(id: number, status: 'pending' | 'completed' | 'canceled'): Promise<boolean> {
    return await orderRepository.updateStatus(id, status);
  }
};
