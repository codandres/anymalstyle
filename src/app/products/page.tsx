import Link from 'next/link';
import { ProductCard } from '@/components/products';
import { ProductController } from '@/controllers/productController';
import { getUserSession } from '@/helpers/getUserSession';

export default async function ProductsPage() {
  const productController = new ProductController();
  const user = await getUserSession();

  const products = await productController.getAll(0, 10);

  return (
    <div className="w-fit">
      <div className="flex justify-end mb-4">
        {user && user.role === 'ADMIN' && (
          <Link href="/products/new">
            <button className="bg-vino-500 hover:bg-vino-600 text-white font-semibold rounded-md py-2 px-4 w-50">
              Crear Producto
            </button>
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-10">
        {products.map((product) => (
          <ProductCard key={product.idProducto} producto={product} />
        ))}
      </div>
    </div>
  );
}
