export interface CreateProductDTO {
  name: string;
  description?: string;
  quantity: number;
  price: number;
  category_id?: number;
}
