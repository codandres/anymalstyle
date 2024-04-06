import { ProductController } from '@/controllers/productController';
import { getUserSession } from '@/helpers/auth/getUserSession';
import { ProductsList } from '@/views/products';
import { Suspense } from 'react';
import { Spinner } from '@/components/loaders';

export default async function ProductsPage() {
  const user = await getUserSession();
  const productControoler = new ProductController();
  const products = await productControoler.getAll(0, 100);

  return (
    <>
      <Suspense fallback={<Spinner dog className="h-screen mx-auto size-1/6 -mt-40" />}>
        <ProductsList user={user} products={products} />
      </Suspense>
    </>
  );
}
