import { ProductDetail } from '@/views/products';

interface Props {
  params: { id: string };
}

export default function ProductPage({ params: { id } }: Props) {
  return <ProductDetail productId={Number(id)} />;
}
