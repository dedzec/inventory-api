import { ICategory } from '../interfaces/category.interface';

export class Category implements ICategory {
  id?: number;
  name: string;
  description?: string;

  constructor(name: string, description?: string, id?: number) {
    this.name = name;
    this.description = description;
    this.id = id;
  }
}
