import { pool } from '../config/database';
import { Movement } from '../models/movement';

export const movementRepository = {
  async create(movement: Movement): Promise<Movement> {
    const [result] = await pool.query(
      'INSERT INTO movements (product_id, type, quantity, movement_date) VALUES (?, ?, ?, ?)',
      [movement.productId, movement.type, movement.quantity, movement.movementDate]
    );
    const insertId = (result as any).insertId;
    return { ...movement, id: insertId };
  },

  async findAll(): Promise<Movement[]> {
    const [rows] = await pool.query('SELECT * FROM movements');
    return rows as Movement[];
  }
};
