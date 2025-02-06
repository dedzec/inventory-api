import { CreateCategoryDTO } from '../dtos/createCategory.dto';
import { Category } from '../models/category';
import { categoryRepository } from '../repositories/categoryRepository';

export const categoryService = {
  async createCategory(data: CreateCategoryDTO): Promise<Category> {
    const category = new Category(data.name, data.description);
    return await categoryRepository.create(category);
  },

  async getCategories(): Promise<Category[]> {
    return await categoryRepository.findAll();
  },

  async updateCategory(id: number, data: Partial<CreateCategoryDTO>): Promise<boolean> {
    // Cria um objeto com os dados atualizados; caso o campo não seja enviado, assume valor vazio ou mantém
    const category = new Category(data.name || '', data.description, id);
    return await categoryRepository.update(category);
  },

  async deleteCategory(id: number): Promise<boolean> {
    return await categoryRepository.delete(id);
  },
};
