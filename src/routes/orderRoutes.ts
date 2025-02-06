import { Router } from 'express';
import { body } from 'express-validator';
import { orderController } from '../controllers/orderController';
import { verifyToken } from '../middlewares/authMiddleware';
import { validationMiddleware } from '../middlewares/validationMiddleware';

const router = Router();

// Criar um novo pedido
router.post(
  '/',
  verifyToken,
  [
    body('type').isIn(['purchase', 'sale']).withMessage('Type deve ser "purchase" ou "sale"'),
    body('supplierId').optional().isNumeric(),
    body('customerId').optional().isNumeric(),
    body('items').isArray({ min: 1 }).withMessage('Items deve ser um array com pelo menos um item'),
    body('items.*.productId').isNumeric().withMessage('Cada item deve ter um productId válido'),
    body('items.*.quantity').isNumeric().withMessage('Cada item deve ter uma quantidade válida'),
  ],
  validationMiddleware,
  orderController.createOrder
);

// Listar pedidos
router.get('/', verifyToken, orderController.getOrders);

// Atualizar status do pedido
router.put(
  '/:id/status',
  verifyToken,
  [
    body('status').isIn(['pending', 'completed', 'canceled']).withMessage('Status inválido'),
  ],
  validationMiddleware,
  orderController.updateOrderStatus
);

export default router;
