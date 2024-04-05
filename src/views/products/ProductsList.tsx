'use client';

import { Spinner } from '@/components/loaders';
import { ProductCard } from '@/components/products';
import { useGetProducts } from '@/hooks/useGetProducts';
import { User as UserSession } from 'next-auth';
import Link from 'next/link';

interface Props {
  user?: UserSession;
}

export const ProductsList = ({ user }: Props) => {
  const { products, isLoading, error } = useGetProducts();

  if (error) {
    return <div>Un error inesperado ha occurido</div>;
  }

  return (
    <div className="w-fit h-fit mx-auto">
      <div className="flex justify-end mb-4">
        {user && user.role === 'ADMIN' && (
          <Link href="/products/new">
            <button className="bg-vino-500 hover:bg-vino-600 text-white font-semibold rounded-md py-2 px-4 w-50">
              Crear Producto
            </button>
          </Link>
        )}
      </div>
      <div>
        {isLoading ? (
          <Spinner dog className="h-screen mx-auto size-1/6 -mt-40" />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-10">
            {products!.map((product) => (
              <ProductCard key={product.idProducto} producto={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};