'use client';

import { ProductController } from '@/controllers/productController';
import { ProductoDto } from '@/dto/productoDto';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaRegEdit } from 'react-icons/fa';
import { IoTrashOutline } from 'react-icons/io5';

interface Props {
  producto: ProductoDto;
}

export const ProductCard = ({ producto }: Props) => {
  const router = useRouter();
  // const productId = Number()
  const handleEdit = async () => {
    router.push(`/products/${producto.idProducto}/edit`);
  };

  const handleDeleteProduct = async () => {
    const productController = new ProductController();

    await productController.deleteById(producto.idProducto);
  };

  return (
    <div className="bg-white rounded-lg border p-4 max-w-sm">
      <Image
        src={producto.imagen || '/images/no-image-found.jpg'}
        // src={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA
        // AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO
        //     9TXL0Y4OHwAAAABJRU5ErkJggg==`}
        alt={producto.nombre}
        className="w-full h-48 rounded-md object-cover"
        height={100}
        width={100}
      />
      <div className="px-1 py-4">
        <div className="text-vino-700 font-bold text-xl mb-2">{producto.nombre}</div>
        <p className="text-slate-600 text-base">{producto.descripcion}</p>
        <p className="text-vino-700 text-base font-bold">$ {producto.precio}</p>
        {/* <p className="text-slate-600 text-base">{producto.id}</p> */}
      </div>
      <div className="flex px-1 py-4 justify-between">
        <div className="content-center">
          <Link href={`/products/${producto.idProducto}`} className="text-vino-700 hover:underline">
            Leer más
          </Link>
        </div>
        <div className="flex justify-end">
          <button
            className="text-white mr-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleEdit}
          >
            <FaRegEdit size={25} />
          </button>
          <button
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            onClick={handleDeleteProduct}
          >
            <IoTrashOutline size={25} />
            {/* Eliminar */}
          </button>
        </div>
      </div>
    </div>
  );
};
