import { Router } from 'express';
import { authController } from '../controllers/authController';
import { body } from 'express-validator';
import { validationMiddleware } from '../middlewares/validationMiddleware';

const router = Router();

router.post(
  '/login',
  [
    body('username').isString().notEmpty(),
    body('password').isString().notEmpty(),
  ],
  validationMiddleware,
  authController.login
);

export default router;
