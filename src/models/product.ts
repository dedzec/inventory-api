export class Product {
  id?: number;
  name: string;
  description?: string;
  quantity: number;
  price: number;
  category_id?: number;

  constructor(name: string, quantity: number, price: number, description?: string, category_id?: number, id?: number) {
    this.name = name;
    this.quantity = quantity;
    this.price = price;

    this.description = description;
    this.category_id = category_id;
    this.id = id;
  }
}
