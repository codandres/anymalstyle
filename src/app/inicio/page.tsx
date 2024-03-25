import { ProductCard } from '@/components/products/ProductCard';

export default function InicioPage() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-2'>
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  );
}
