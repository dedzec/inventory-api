import { Router } from 'express';
import { body } from 'express-validator';
import { productController } from '../controllers/productController';
import { validationMiddleware } from '../middlewares/validationMiddleware';
import { verifyToken } from '../middlewares/authMiddleware'

const router = Router();

// Rota para criar produto
router.post(
  '/',
  verifyToken,
  [
    body('name').isString().notEmpty(),
    body('quantity').isNumeric(),
    body('price').isNumeric(),
  ],
  validationMiddleware,
  productController.createProduct
);

// Rota para listar produtos
router.get('/', verifyToken, productController.getProducts);

// Rota para atualizar a quantidade de um produto
router.put(
  '/:id/stock',
  verifyToken,
  [body('quantity').isNumeric()],
  validationMiddleware,
  productController.updateProductStock
);

export default router;
