import { CreateProductoDto } from '@/dto/createProductoDto';
import { UpdateProductoDto } from '@/dto/editProductoDto';
import { ProductoDto } from '@/dto/productoDto';
import { getAllProducts, createProduct, getProductById, deleteProductById, updateProduct } from '@/models/productModel';

export class ProductController {
  async getById(productId: number): Promise<ProductoDto> {
    return getProductById(productId);
  }

  async getAll(offset: number, limit: number): Promise<ProductoDto[]> {
    return getAllProducts(offset, limit);
  }

  async create(product: CreateProductoDto): Promise<void> {
    await createProduct(product);
  }

  async update(product: UpdateProductoDto): Promise<void> {
    await updateProduct(product);
  }

  async deleteById(productId: number): Promise<ProductoDto> {
    return deleteProductById(productId);
  }
}
