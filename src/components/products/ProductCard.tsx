import { Producto } from '@prisma/client';
import Image from 'next/image';
// import { useState } from 'react';

interface Props {
  producto: Producto;
}

export const ProductCard = ({ producto }: Props) => {
  // const [imagePreview, setImagePreview] = useState<string | null>(null);
  let imagePreview: string | null = null;

  if (producto.imagen) {
    // const blob = new Blob([producto.imagen!]);
    const blob = new Blob([Buffer.from(producto.imagen!)]);
    imagePreview = URL.createObjectURL(blob);
    // setImagePreview(URL.createObjectURL(blob));
  }

  return (
    <div className="bg-white rounded-lg border p-4 max-w-sm">
      <Image
        // src="https://placehold.co/300x200/d1d4ff/352cb5.png"
        src={imagePreview || '/images/no-image-found.jpg'}
        alt="Placeholder Image"
        className="w-full h-48 rounded-md object-cover"
        height={100}
        width={100}
      />
      <div className="px-1 py-4">
        <div className="font-bold text-xl mb-2">Titulo del producto</div>
        <p className="text-gray-700 text-base">
          This is a simple blog card example using Tailwind CSS. You can replace this text with your own blog content.
        </p>
      </div>
      <div className="px-1 py-4">
        <a href="#" className="text-blue-500 hover:underline">
          Leer más
        </a>
      </div>
    </div>
  );
};
