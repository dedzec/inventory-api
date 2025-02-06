import { pool } from '../config/database';
import { Supplier } from '../models/supplier';

export const supplierRepository = {
  async create(supplier: Supplier): Promise<Supplier> {
    const [result] = await pool.query(
      'INSERT INTO suppliers (name, contact_info) VALUES (?, ?)',
      [supplier.name, supplier.contactInfo]
    );
    const insertId = (result as any).insertId;
    return { ...supplier, id: insertId };
  },

  async findAll(): Promise<Supplier[]> {
    const [rows] = await pool.query('SELECT * FROM suppliers');
    return rows as Supplier[];
  },

  async delete(id: number): Promise<boolean> {
    const [result] = await pool.query('DELETE FROM suppliers WHERE id = ?', [id]);
    return (result as any).affectedRows > 0;
  }
};
