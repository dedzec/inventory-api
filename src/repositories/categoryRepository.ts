import { pool } from '../config/database';
import { Category } from '../models/category';

export const categoryRepository = {
  async create(category: Category): Promise<Category> {
    const [result] = await pool.query(
      'INSERT INTO categories (name, description) VALUES (?, ?)',
      [category.name, category.description]
    );
    const insertId = (result as any).insertId;
    return { ...category, id: insertId };
  },

  async findAll(): Promise<Category[]> {
    const [rows] = await pool.query('SELECT * FROM categories');
    return rows as Category[];
  },

  async update(category: Category): Promise<boolean> {
    if (!category.id) throw new Error('Category id is required');
    const [result] = await pool.query(
      'UPDATE categories SET name = ?, description = ? WHERE id = ?',
      [category.name, category.description, category.id]
    );
    return (result as any).affectedRows > 0;
  },

  async delete(id: number): Promise<boolean> {
    const [result] = await pool.query(
      'DELETE FROM categories WHERE id = ?',
      [id]
    );
    return (result as any).affectedRows > 0;
  },
};
