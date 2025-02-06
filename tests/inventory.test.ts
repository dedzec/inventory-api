import request from 'supertest';
import app from '../src/app';
import { userRepository } from '../src/repositories/userRepository'; // Importa repositório de usuários
import bcrypt from 'bcrypt';

let token: string;

describe('Inventory API', () => {
  beforeAll(async () => {
    console.log('🔄 Iniciando testes...');

    // Verifica se o usuário já existe no banco
    const existingUser = await userRepository.findByUsername('admin');

    if (!existingUser) {
      console.log('🛠 Criando usuário admin para os testes...');

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync('admin123', salt);

      await userRepository.create({
        username: 'admin',
        passwordHash: hashedPassword,
        role: 'admin',
      });
    } else {
      console.log('✅ Usuário admin já existe, pulando criação...');
    }

    // Fazer login para obter token
    const authResponse = await request(app).post('/api/auth/login').send({
      username: 'admin',
      password: 'admin123',
    });

    console.log('🔑 Resposta do login:', authResponse.body);

    expect(authResponse.status).toBe(200);
    token = authResponse.body.token;

    expect(token).toBeDefined();
  });

  // afterAll(async () => {
  //   console.log('🧹 Limpando dados de testes...');
  //   await userRepository.deleteByUsername('admin');
  // });

  it('deve criar um novo produto', async () => {
    const newCategory = { name: 'Periféricos', description: 'Acessórios de computador' };
    const categoryResponse = await request(app)
      .post('/api/categories')
      .set('Authorization', `Bearer ${token}`)
      .send(newCategory);

    expect(categoryResponse.status).toBe(201);
    const categoryId = categoryResponse.body.data.id;

    const newProduct = {
      name: 'Mouse Razer',
      quantity: 10,
      price: 99.99,
      description: 'Mouse gamer de alta precisão',
      categoryId: categoryId,
    };

    const response = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send(newProduct);

    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty('id');
  });

  it('deve listar todas as categorias', async () => {
    const response = await request(app)
      .get('/api/categories')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it('deve criar um fornecedor (admin)', async () => {
    const newSupplier = {
      name: 'Fornecedor XPTO',
      contact: 'contato@fornecedorxpto.com',
    };

    const response = await request(app)
      .post('/api/suppliers')
      .set('Authorization', `Bearer ${token}`)
      .send(newSupplier);

    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty('id');
  });

  it('deve criar um novo pedido', async () => {
    const newOrder = {
      type: 'purchase',
      supplierId: 1,
      items: [{ productId: 1, quantity: 5 }],
    };

    const response = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send(newOrder);

    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty('id');
  });

  it('deve registrar uma movimentação de estoque', async () => {
    const newMovement = {
      productId: 1,
      type: 'in',
      quantity: 20,
      reason: 'Reabastecimento de estoque',
    };

    const response = await request(app)
      .post('/api/movements')
      .set('Authorization', `Bearer ${token}`)
      .send(newMovement);

    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty('id');
  });

  it('deve listar todas as movimentações de estoque', async () => {
    const response = await request(app)
      .get('/api/movements')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});
