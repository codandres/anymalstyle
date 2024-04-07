'use client';

import { ProductController } from '@/controllers/productController';
import { ProductoDto } from '@/dto/producto/productoDto';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { FaRegEdit } from 'react-icons/fa';
import { IoTrashOutline } from 'react-icons/io5';
import { User as UserSession } from 'next-auth';
import { useEffect, useMemo, useState } from 'react';
import { Spinner } from '../loaders';

interface Props {
  user?: UserSession;
  producto: ProductoDto;
}

export const ProductCard = ({ producto, user }: Props) => {
  const router = useRouter();
  const productController = useMemo(() => new ProductController(), []);

  const [loadEdit, setLoadEdit] = useState<boolean>(false);
  const [loadDelete, setLoadDelete] = useState<boolean>(false);

  const handleEdit = () => {
    setLoadEdit(true);
    router.push(`/products/${producto.idProducto}/edit`);
  };

  const handleDeleteProduct = async () => {
    setLoadDelete(true);

    toast.loading(`Eliminando ${producto.nombre}...`, { id: 'loading' });
    try {
      await productController.deleteById(producto.idProducto);
      toast.remove('loading');
      toast.success(`${producto.nombre} ha sido eliminado!`, { duration: 40000 });
    } catch (error) {
      console.error(error);
      toast.remove('loading');
      toast.error(`Error inesperado al eliminar ${producto.nombre}, inténtelo nuevamente`, { duration: 40000 });
    }
  };

  return (
    <div className="bg-white rounded-lg border p-4 max-w-sm">
      <Image
        src={producto.imagen || '/images/no-image-found.jpg'}
        alt={producto.nombre}
        className="w-full h-48 rounded-md object-cover"
        height={100}
        width={100}
      />
      <div className="px-1 py-4">
        <div className="text-vino-500 font-bold text-xl mb-2">{producto.nombre}</div>
        <p className="text-slate-600 text-base mb-2">{producto.descripcion}</p>
        <p className="text-slate-600 text-base">Tipo: {producto.tipo}</p>
        <p className="text-slate-600 text-base mb-4">Marca: {producto.marca}</p>
        <p className="text-vino-700 text-base font-bold">$ {producto.precio.toLocaleString()}</p>
        <p className="text-slate-600 text-base">en stock: {producto.cantidad.toLocaleString()}</p>
      </div>
      <div className="flex px-1 py-4 justify-between align-bottom">
        <div className="content-center">
          <Link href={`/products/${producto.idProducto}`} className="text-vino-500 hover:text-vino-700 hover:underline">
            Leer más
          </Link>
        </div>
        {user && user.role === 'ADMIN' && (
          <div className="flex justify-end">
            <button
              className="bg-vino-500 hover:bg-vino-600 text-white font-medium focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-2"
              onClick={handleEdit}
              disabled={loadEdit}
            >
              {loadEdit ? <Spinner className="text-white" /> : <FaRegEdit size={20} />}
            </button>
            <button
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              onClick={handleDeleteProduct}
              disabled={loadDelete}
            >
              {loadDelete ? <Spinner className="text-white" /> : <IoTrashOutline size={20} />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
