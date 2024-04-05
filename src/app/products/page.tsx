import { getUserSession } from '@/helpers/auth/getUserSession';
import { ProductsList } from '@/views/products';

export default async function ProductsPage() {
  const user = await getUserSession();

  return (
    <>
      <ProductsList user={user} />
    </>
  );
}
