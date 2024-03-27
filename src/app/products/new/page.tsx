import { Star } from '@/components/products/Star';
import Image from 'next/image';
import Link from 'next/link';

export default function newProductPage() {
  return (
    <div className="w-fit mx-auto">
      <div className="flex justify-items-center bg-white shadow-md rounded-lg">
        <div className="w-1/2">
          <Link href="#">
            <Image
              className="rounded-t-lg p-8"
              width={800}
              height={800}
              src="https://i.ibb.co/KqdgGY4/cosmetic-packaging-mockup-1150-40280.webp"
              alt="product image"
            />
          </Link>
        </div>
        <div className="divide-y divide-dashed divide-vino-700 px-5 pb-5 w-1/2 pt-6">
          <div className="pb-8">
            <span className="text-3xl font-bold text-vino-500">Creación del producto</span>
          </div>

          <div className="py-4">
            <form action="" method="post">
              <div className="mb-2">
                <label htmlFor="productName" className="block text-gray-600">
                  Nombre del producto
                </label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-vino-500 required:*"
                  autoComplete="off"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="username" className="block text-gray-600">
                  Descripción
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-vino-500"
                  autoComplete="off"
                />
              </div>

              <div className="flex justify-between mb-2">
                <div className="w-1/3">
                  <label htmlFor="username" className="block text-gray-600">
                    Tipo
                  </label>
                  <select
                    name="Tipo"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-vino-500"
                  >
                    <option value="Seleccionar">Seleccionar</option>
                    <option value="a">Medicamento</option>
                    <option value="b">Comida</option>
                    <option value="c">Juguete</option>
                  </select>
                </div>
                <div className="w-2/4">
                  <label htmlFor="price" className="block text-gray-600">
                    Costo
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-vino-500"
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="mb-2">
                <label htmlFor="username" className="block text-gray-600">
                  Unidades
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-vino-500"
                  autoComplete="off"
                />
              </div>
              <div>
                <label htmlFor="subidaImagen" className="block text-gray-600">
                  Subir Imagen
                </label>
                <input
                  type="file"
                  id="subidaImagen"
                  name="subidaImagen"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-vino-500"
                  autoComplete="off"
                />
              </div>

              <div id="secondSection" className="flex items-center justify-between py-8">
                <button
                  type="submit"
                  className="bg-vino-500 hover:bg-vino-600 text-white font-semibold rounded-md py-2 px-4 w-full"
                >
                  Guardar producto
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
