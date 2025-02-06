import { IProduct } from '../interfaces/product.interface';

export class Product implements IProduct{
  id?: number;
  name: string;
  description?: string;
  quantity: number;
  price: number;
  categoryId?: number;

  constructor(name: string, quantity: number, price: number, description?: string, categoryId?: number, id?: number) {
    this.name = name;
    this.quantity = quantity;
    this.price = price;

    this.description = description;
    this.categoryId = categoryId;
    this.id = id;
  }
}
