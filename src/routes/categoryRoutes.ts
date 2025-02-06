import { Router } from 'express';
import { body } from 'express-validator';
import { categoryController } from '../controllers/categoryController';
import { validationMiddleware } from '../middlewares/validationMiddleware';

const router = Router();

// Rota para criar categoria
router.post(
  '/',
  [
    body('name').isString().notEmpty(),
    body('description').optional().isString(),
  ],
  validationMiddleware,
  categoryController.createCategory,
);

// Rota para listar categorias
router.get('/', categoryController.getCategories);

// Rota para atualizar uma categoria
router.put(
  '/:id',
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
