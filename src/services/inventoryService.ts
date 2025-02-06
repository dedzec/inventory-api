import { CreateProductDTO } from '../dtos/createProduct.dto';
import { Product } from '../models/product';
import { productRepository } from '../repositories/productRepository';

export const inventoryService = {
  async createProduct(data: CreateProductDTO): Promise<Product> {
    const product = new Product(data.name, data.quantity, data.price, data.description, data.category_id);
    return await productRepository.create(product);
  },

  async getProducts(): Promise<Product[]> {
    return await productRepository.findAll();
  },

  async updateProductStock(id: number, quantity: number): Promise<boolean> {
    return await productRepository.updateQuantity(id, quantity);
  }
};
