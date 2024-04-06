import { ProductController } from '@/controllers/productController';
import { getUserSession } from '@/helpers/auth/getUserSession';
import { ProductsList } from '@/views/products';
import { Suspense } from 'react';
import { ProductsListLoader } from '@/components/loaders';

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
