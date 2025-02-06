import { pool } from '../config/database';
import { User } from '../models/user';

export const userRepository = {
  async create(user: User): Promise<User> {
    const [result] = await pool.query(
      'INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)',
      [user.username, user.passwordHash, user.role]
    );
    const insertId = (result as any).insertId;
    return { ...user, id: insertId };
  },

  async findByUsername(username: string): Promise<User | null> {
    const [rows] = await pool.query('SELECT id, username, password_hash AS passwordHash, role FROM users WHERE username = ?', [username]);
    return (rows as User[])[0] || null;
  }
};
