import { getAllProducts, createProduct } from '@/models/productModel';
import { Producto } from '@prisma/client';

export class ProductController {
  async getAll(offset: number, limit: number): Promise<Producto[]> {
    return getAllProducts(offset, limit);
  }

  async create(product: Producto): Promise<Producto> {
    return createProduct(product);
  }
}
