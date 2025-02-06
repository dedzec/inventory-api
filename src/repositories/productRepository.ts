import { pool } from '../config/database';
import { Product } from '../models/product';

export const productRepository = {
  async create(product: Product): Promise<Product> {
    const [result] = await pool.query(
      'INSERT INTO products (name, description, quantity, price, category_id) VALUES (?, ?, ?, ?, ?)',
      [product.name, product.description, product.quantity, product.price, product.category_id]
    );
    const insertId = (result as any).insertId;
    return { ...product, id: insertId };
  },

  async findAll(): Promise<Product[]> {
    const [rows] = await pool.query('SELECT * FROM products');
    return rows as Product[];
  },

  async updateQuantity(id: number, quantity: number): Promise<boolean> {
    const [result] = await pool.query(
      'UPDATE products SET quantity = ? WHERE id = ?',
      [quantity, id]
    );
    return (result as any).affectedRows > 0;
  }
};
