import { pool } from '../config/database';
import { Order } from '../models/order';

export const orderRepository = {
  async create(order: Order): Promise<Order> {
    const [result] = await pool.query(
      'INSERT INTO orders (supplier_id, order_date, status) VALUES (?, ?, ?)',
      [order.supplierId, order.orderDate, order.status]
    );
    const insertId = (result as any).insertId;
    return { ...order, id: insertId };
  },

  async findAll(): Promise<Order[]> {
    const [rows] = await pool.query('SELECT * FROM orders');
    return rows as Order[];
  },

  async updateStatus(id: number, status: 'pending' | 'completed' | 'canceled'): Promise<boolean> {
    const [result] = await pool.query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
    return (result as any).affectedRows > 0;
  }
};
