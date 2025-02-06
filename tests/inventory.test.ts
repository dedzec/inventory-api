import request from 'supertest';
import app from '../src/app';

describe('Inventory API', () => {
  // Teste para produtos
  it('deve criar um novo produto', async () => {
    const newProduct = {
      name: 'Mouse Razer',
      quantity: 10,
      price: 99.99,
      description: 'Descrição do produto teste',
      category_id: 1,
    };

    const response = await request(app)
      .post('/api/products')
      .send(newProduct);

    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty('id');
  });

  // Testes para categorias
  it('deve criar uma nova categoria', async () => {
    const newCategory = {
      name: 'Eletrônicos',
      description: 'Produtos eletrônicos e gadgets'
    };

    const response = await request(app)
      .post('/api/categories')
      .send(newCategory);

    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty('id');
  });

  it('deve listar todas as categorias', async () => {
    const response = await request(app)
      .get('/api/categories');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it('deve atualizar uma categoria existente', async () => {
    // Primeiro, cria uma categoria para atualizar
    const newCategory = {
      name: 'Roupas',
      description: 'Categoria de roupas'
    };

    const createResponse = await request(app)
      .post('/api/categories')
      .send(newCategory);

    expect(createResponse.status).toBe(201);
    const categoryId = createResponse.body.data.id;

    // Atualiza a categoria
    const updateData = {
      name: 'Vestuário',
      description: 'Categoria de vestuário'
    };

    const updateResponse = await request(app)
      .put(`/api/categories/${categoryId}`)
      .send(updateData);

    expect(updateResponse.status).toBe(200);
    // Supondo que o serviço retorne true para sucesso na atualização
    expect(updateResponse.body.data).toBe(true);
  });

  it('deve remover uma categoria existente', async () => {
    // Cria uma categoria para remoção
    const newCategory = {
      name: 'Teste Remoção',
      description: 'Categoria para teste de remoção'
    };

    const createResponse = await request(app)
      .post('/api/categories')
      .send(newCategory);

    expect(createResponse.status).toBe(201);
    const categoryId = createResponse.body.data.id;

    // Remove a categoria
    const deleteResponse = await request(app)
      .delete(`/api/categories/${categoryId}`);

    expect(deleteResponse.status).toBe(200);
    // Supondo que o serviço retorne true para sucesso na remoção
    expect(deleteResponse.body.data).toBe(true);
  });
});
