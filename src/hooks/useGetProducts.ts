'use client';

import { ProductController } from '@/controllers/productController';
import { ProductoDto } from '@/dto/producto/productoDto';
import { useEffect, useMemo, useState } from 'react';

export const useGetProducts = () => {
  const productController = useMemo(() => new ProductController(), []);

  const [products, setProducts] = useState<ProductoDto[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    productController
      .getAll(0, 100)
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [productController]);

  return { products, isLoading, error };
};
