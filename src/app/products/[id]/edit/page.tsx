import { ProductTemplateEditor } from '@/views/products';

interface Props {
  params: { id: string };
}

export default function EditProductPage({ params: { id } }: Props) {
  return <ProductTemplateEditor productId={Number(id)} />;
}
