import { Router } from 'express';
import { body, param } from 'express-validator';
import { supplierController } from '../controllers/supplierController';
import { verifyToken } from '../middlewares/authMiddleware';
import { requireRole } from '../middlewares/roleMiddleware';
import { validationMiddleware } from '../middlewares/validationMiddleware';

const router = Router();

// Criar fornecedor (somente admin)
router.post(
  '/',
  verifyToken,
  requireRole('admin'),
  [
    body('name').isString().notEmpty().withMessage('O nome do fornecedor é obrigatório'),
    body('contact')
      .isString()
      .notEmpty()
      .withMessage('O contato do fornecedor é obrigatório')
      .isLength({ min: 5 })
      .withMessage('O contato deve ter pelo menos 5 caracteres'),
  ],
  validationMiddleware,
  supplierController.createSupplier
);

// Listar fornecedores (qualquer usuário autenticado pode acessar)
router.get('/', verifyToken, supplierController.getSuppliers);

// Remover fornecedor (somente admin)
router.delete(
  '/:id',
  verifyToken,
  requireRole('admin'),
  [
    param('id').isNumeric().withMessage('O ID do fornecedor deve ser um número válido'),
  ],
  validationMiddleware,
  supplierController.deleteSupplier
);

export default router;
