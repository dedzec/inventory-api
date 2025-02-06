import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { RegisterDTO, LoginDTO } from '../dtos/auth.dto';
import { User } from '../models/user';
import { userRepository } from '../repositories/userRepository';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key';
const JWT_EXPIRES_IN = '1h';

export const authService = {
  async register(data: RegisterDTO): Promise<{ id: number; username: string; role: string }> {
    const existingUser = await userRepository.findByUsername(data.username);
    if (existingUser) {
      throw new Error('Usuário já existe');
    }

    const passwordHash = await bcrypt.hash(data.password, 10);
    const newUser = await userRepository.create(new User(data.username, passwordHash, data.role || 'operator'));

    return { id: newUser.id!, username: newUser.username, role: newUser.role };
  },

  async login(data: LoginDTO): Promise<{ token: string }> {
    const user = await userRepository.findByUsername(data.username);
    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    const passwordMatch = bcrypt.compareSync(data.password, user.passwordHash);
    if (!passwordMatch) {
      throw new Error('Credenciais inválidas');
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return { token };
  }
};
