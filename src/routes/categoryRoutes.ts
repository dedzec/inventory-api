import { Router } from 'express';
import { body } from 'express-validator';
import { categoryController } from '../controllers/categoryController';
import { validationMiddleware } from '../middlewares/validationMiddleware';
import { verifyToken } from '../middlewares/authMiddleware';

const router = Router();

// Rota para criar categoria
router.post(
  '/',
  verifyToken,
  [
    body('name').isString().notEmpty(),
    body('description').optional().isString(),
  ],
  validationMiddleware,
  categoryController.createCategory,
);

// Rota para listar categorias
router.get('/', verifyToken, categoryController.getCategories);

// Rota para atualizar uma categoria
router.put(
  '/:id',
  verifyToken,
  [
    body('name').optional().isString(),
    body('description').optional().isString(),
  ],
  validationMiddleware,
  categoryController.updateCategory,
);

// Rota para deletar uma categoria
router.delete('/:id', categoryController.deleteCategory);

export default router;
