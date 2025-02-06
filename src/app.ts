import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import inventoryRoutes from './routes/inventoryRoutes';
import categoryRoutes from './routes/categoryRoutes';
import { errorHandler } from './middlewares/errorHandler';
import setupSwagger from './swagger';

const app = express();

// Middleware para segurança e controle de acesso
app.use(helmet());
app.use(cors());

// Permite o parsing de JSON nas requisições
app.use(express.json());

// Registra as rotas da API
app.use('/api/products', inventoryRoutes);
app.use('/api/categories', categoryRoutes);

// Configuração do Swagger para documentação
setupSwagger(app);

// Middleware de tratamento de erros
app.use(errorHandler);

export default app;
