import { Router } from 'express';
import { body } from 'express-validator';
import { movementController } from '../controllers/movementController';
import { verifyToken } from '../middlewares/authMiddleware';
import { validationMiddleware } from '../middlewares/validationMiddleware';

const router = Router();

// Criar movimentação de estoque
router.post(
  '/',
  verifyToken,
  [
    body('productId').isNumeric().withMessage('O productId deve ser um número válido'),
    body('type')
      .isIn(['in', 'out', 'adjustment'])
      .withMessage('O tipo deve ser "addition", "removal", "transfer" ou "adjustment"'),
    body('quantity')
      .isNumeric()
      .custom(value => value > 0)
      .withMessage('A quantidade deve ser um número positivo'),
    body('reason').optional().isString().withMessage('O motivo deve ser uma string'),
  ],
  validationMiddleware,
  movementController.createMovement
);

// Listar todas as movimentações de estoque
router.get('/', verifyToken, movementController.getMovements);

export default router;
