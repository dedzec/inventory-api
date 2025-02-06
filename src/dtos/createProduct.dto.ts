export interface CreateProductDTO {
  name: string;
  description?: string;
  quantity: number;
  price: number;
  categoryId?: number;
}
