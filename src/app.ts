import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import productRoutes from './routes/productRoutes';
import categoryRoutes from './routes/categoryRoutes';
import supplierRoutes from './routes/supplierRoutes';
import orderRoutes from './routes/orderRoutes';
import movementRoutes from './routes/movementRoutes';
import authRoutes from './routes/authRoutes';
import { errorHandler } from './middlewares/errorHandler';
import setupSwagger from './swagger';

const app = express();

// Middleware para segurança e controle de acesso
app.use(helmet());
app.use(cors());

// Permite o parsing de JSON nas requisições
app.use(express.json());

// Rota de autenticação (login) - não exige autenticação
app.use('/api/auth', authRoutes);

// Rotas protegidas: exigem autenticação via JWT
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/movements', movementRoutes);

// Rota de fornecedores: exige autenticação E nível de acesso 'admin'
app.use('/api/suppliers', supplierRoutes);

// Configuração do Swagger para documentação (acessível em /docs)
setupSwagger(app);

// Middleware de tratamento de erros
app.use(errorHandler);

export default app;
