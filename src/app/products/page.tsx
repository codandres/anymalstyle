import { Suspense, lazy } from 'react';

import { ProductController } from '@/controllers/productController';
import { getUserSession } from '@/helpers/auth/getUserSession';
import { ProductsListLoader } from '@/components/loaders';

const ProductsList = lazy(() =>
  import('../../views/products/ProductsList').then((mod) => ({ default: mod.ProductsList })),
);

export default async function ProductsPage() {
  const user = await getUserSession();
  const productControoler = new ProductController();
  const products = await productControoler.getAll(0, 100);

  return (
    <>
      <Suspense fallback={<ProductsListLoader />}>
        <ProductsList user={user} products={products} />
      </Suspense>
    </>
  );
}
