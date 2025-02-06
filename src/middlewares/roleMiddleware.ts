import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './authMiddleware';

export const requireRole = (requiredRole: 'admin' | 'operator') => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }
    if (req.user.role !== requiredRole) {
      return res.status(403).json({ error: 'Acesso negado' });
    }
    next();
  };
};
