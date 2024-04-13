import { Suspense, lazy } from 'react';

import { ProductController } from '@/controllers/productController';
import { getUserSession } from '@/helpers/auth/getUserSession';
import { ProductsListLoader } from '@/components/loaders';
import { ProductoDto } from '@/dto/producto/productoDto';

const ProductsList = lazy(() =>
  import('../../views/products/ProductsList').then((mod) => ({ default: mod.ProductsList })),
);

export default async function ProductsPage() {
  const user = await getUserSession();
  const productControler = new ProductController();
  const products: ProductoDto[] = await productControler.getAll(0, 100);

  const productsToList: ProductoDto[] =
    user?.role === 'ADMIN' ? products : products?.filter((product) => product.estado === 'ACTIVO');

  return (
    <>
      <Suspense fallback={<ProductsListLoader />}>
        <ProductsList user={user} products={productsToList} />
      </Suspense>
    </>
  );
}
