import { Router } from 'express';
import { inventoryController } from '../controllers/inventoryController';
import { body } from 'express-validator';
import { validationMiddleware } from '../middlewares/validationMiddleware';

const router = Router();

// Rota para criar produto
router.post(
  '/',
  [
    body('name').isString().notEmpty(),
    body('quantity').isNumeric(),
    body('price').isNumeric(),
  ],
  validationMiddleware,
  inventoryController.createProduct
);

// Rota para listar produtos
router.get('/', inventoryController.getProducts);

// Rota para atualizar a quantidade de um produto
router.put(
  '/:id/stock',
  [body('quantity').isNumeric()],
  validationMiddleware,
  inventoryController.updateProductStock
);

export default router;
