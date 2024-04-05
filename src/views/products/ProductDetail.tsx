'use client';

import { ProductDetailLoader } from '@/components/loaders';
import { Star } from '@/components/products';

import { useGetProductById } from '@/hooks/useGetProductById';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  productId: number;
}

export const ProductDetail = ({ productId }: Props) => {
  const { product, isLoading, error } = useGetProductById(productId);

  if (isLoading) {
    return <ProductDetailLoader />;
  }

  if (error) {
    return <div>Un error inesperado ha occurido</div>;
  }

  return (
    <div className="w-fit mx-auto">
      <div className="flex justify-items-center bg-white shadow-md rounded-lg">
        <div className="w-1/2">
          <Link href="#">
            <Image
              className="rounded-t-lg p-8"
              width={800}
              height={800}
              src={product?.imagen || '/images/no-image-found.jpg'}
              alt="product image"
            />
          </Link>
        </div>
        <div className="divide-y divide-dashed divide-vino-700 px-5 pb-5 w-1/2 p-8">
          <div id="firstSection">
            <Link href="#">
              <h3 className="text-gray-900 font-semibold text-xl tracking-tight">
                {/* Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport */}
                {product?.nombre}
              </h3>
            </Link>
            <div className="flex items-center mt-2.5 mb-5">
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">5.0</span>
            </div>

            <div>{product?.descripcion}</div>
          </div>
          {/* <div id="divider1" className="divide-current h-3 bg-orange-400 text-cyan-500"></div> */}

          <div id="secondSection" className="flex items-center justify-between py-8">
            <span className="text-3xl font-bold text-gray-900">${product?.precio}</span>
            <Link
              href="#"
              className="text-white bg-vino-500 hover:bg-vino-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Add to cart
            </Link>
          </div>

          <div id="thirdSection" className="flex items-center justify-between py-8">
            <span className="text-3xl font-bold text-gray-900">$599</span>
            <Link
              href="#"
              className="text-white bg-vino-500 hover:bg-vino-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Add to cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
