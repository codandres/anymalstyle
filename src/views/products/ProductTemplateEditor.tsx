'use client';

import { ChangeEvent, useState } from 'react';
import { Prisma, Producto } from '@prisma/client';
// import { Producto } from '@prisma/client';
import { Formik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import * as yup from 'yup';
import { ProductController } from '@/controllers/productController';
import { useRouter } from 'next/navigation';

interface Props {
  isEditing?: boolean;
}

interface ProductoForm {
  nombre: string;
  descripcion: string;
  cantidad: string;
  precio: string;
  imagen: string;
  idTipo: string;
  idMarca: string;
}

const requiredMessage = 'Este campo es requerido';

const formValidations = yup.object({
  nombre: yup.string().required(requiredMessage),
  precio: yup.number().required(requiredMessage).min(300, 'Mínimo 300'),
  cantidad: yup.number().required(requiredMessage).min(0),
  descripcion: yup.string().optional(),
  idTipo: yup.number().required(requiredMessage),
  idMarca: yup.number().required(requiredMessage),
  imagen: yup.string().optional(),
});

export const ProductTemplateEditor = ({ isEditing = false }: Props) => {
  const router = useRouter();

  const initialValues: ProductoForm = {
    nombre: 'Pelota',
    descripcion: 'Pelota de colores',
    cantidad: '30',
    precio: '3500',
    imagen: '',
    idTipo: '1',
    idMarca: '2',
  };

  const productController = new ProductController();

  // const onSubmit = async (values: ProductoForm, helpers: FormikHelpers<ProductoForm>) => {
  // const onSubmit = async (values: ProductoForm) => {
  const onSubmit = async (values: any) => {
    try {
      let imageRaw: Buffer | undefined;

      if (image) {
        const arrayBuffer: ArrayBuffer = await image.arrayBuffer();
        imageRaw = Buffer.from(arrayBuffer);
      }

      const product: Producto = {
        nombre: values.nombre,
        descripcion: values.descripcion,
        cantidad: parseInt(values.cantidad),
        precio: new Prisma.Decimal(values.precio),
        imagen: imageRaw,
        idTipo: BigInt(values.idTipo).toString(),
        idMarca: BigInt(values.idMarca).toString(),
      } as unknown as Producto;

      // const data = JSON.stringify(
      //   product,
      //   (key, value) => (typeof value === 'bigint' ? value.toString() : value), // return everything else unchanged
      // );

      if (isEditing) {
        // Update product
      } else {
        // await productController.create(JSON.parse(data));
        await productController.create(product);
        router.push('/products');
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const [image, setImage] = useState<Blob | null>(null);
  const [imageSize, setImageSize] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
      setImagePreview(URL.createObjectURL(event.target.files[0]));
      setImageSize((event.target.files[0].size / 1000000).toFixed(2));
    }
  };

  return (
    <div className="w-fit mx-auto">
      <div className="flex justify-items-center bg-white shadow-md rounded-lg">
        <div className="w-1/2">
          <Link href="#">
            <Image
              className="rounded-t-lg p-8"
              width={800}
              height={800}
              src={imagePreview || '/images/no-image-found.jpg'}
              alt="product image"
            />
          </Link>
        </div>
        <div className="divide-y divide-dashed divide-vino-700 px-5 pb-5 w-1/2 pt-6">
          <div className="pb-8">
            <span className="text-3xl font-bold text-vino-500">
              {isEditing ? 'Edición del Producto' : 'Creación del roducto'}
            </span>
          </div>

          <div className="py-4">
            <Formik initialValues={initialValues} validationSchema={formValidations} onSubmit={onSubmit}>
              {({
                values,
                errors,
                touched,
                handleSubmit,
                handleChange,
                /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className="mb-2">
                    <label htmlFor="nombre" className="block text-gray-600">
                      Nombre del producto
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-vino-500 required:*"
                      autoComplete="off"
                      onChange={handleChange}
                      value={values.nombre}
                    />
                    <div className="text-vino-700">{errors.nombre && touched.nombre && errors.nombre}</div>
                  </div>
                  <div className="mb-2">
                    <label htmlFor="descripcion" className="block text-gray-600">
                      Descripción
                    </label>
                    <input
                      type="text"
                      id="descripcion"
                      name="descripcion"
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-vino-500"
                      autoComplete="off"
                      onChange={handleChange}
                      value={values.descripcion}
                    />
                    <div className="text-vino-700">
                      {errors.descripcion && touched.descripcion && errors.descripcion}
                    </div>
                  </div>
                  <div className="flex justify-between mb-2">
                    <div className="w-1/3">
                      <label htmlFor="idTipo" className="block text-gray-600">
                        Tipo
                      </label>
                      <select
                        name="idTipo"
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-vino-500"
                        onChange={handleChange}
                        value={values.idTipo}
                      >
                        <option value="Seleccionar">Seleccionar</option>
                        <option value={1}>Medicamento</option>
                        <option value={2}>Comida</option>
                        <option value={3}>Juguete</option>
                      </select>
                      <div className="text-vino-700">{errors.idTipo && touched.idTipo && errors.idTipo}</div>
                    </div>
                    <div className="w-2/4">
                      <label htmlFor="precio" className="block text-gray-600">
                        Precio
                      </label>
                      <input
                        type="number"
                        id="precio"
                        name="precio"
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-vino-500"
                        autoComplete="off"
                        onChange={handleChange}
                        value={values.precio}
                      />
                      <div className="text-vino-700">{errors.precio && touched.precio && errors.precio}</div>
                    </div>
                  </div>
                  <div className="flex justify-between mb-2">
                    <div className="w-1/3">
                      <label htmlFor="idMarca" className="block text-gray-600">
                        Marca
                      </label>
                      <select
                        name="idMarca"
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-vino-500"
                        onChange={handleChange}
                        value={values.idMarca}
                      >
                        <option value="Seleccionar">Seleccionar</option>
                        <option value={1}>Medicamento</option>
                        <option value={2}>Comida</option>
                        <option value={3}>Juguete</option>
                      </select>
                      <div className="text-vino-700">{errors.idMarca && touched.idMarca && errors.idMarca}</div>
                    </div>
                    <div className="w-2/4">
                      <label htmlFor="cantidad" className="block text-gray-600">
                        Unidades
                      </label>
                      <input
                        type="number"
                        id="cantidad"
                        name="cantidad"
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-vino-500"
                        autoComplete="off"
                        onChange={handleChange}
                        value={values.cantidad}
                      />
                      <div className="text-vino-700">{errors.cantidad && touched.cantidad && errors.cantidad}</div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="imagen" className="block text-gray-600">
                      Subir Imagen
                    </label>
                    <input
                      type="file"
                      id="imagen"
                      name="imagen"
                      accept="image/*"
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-vino-500"
                      autoComplete="off"
                      // ref={inputFileRef}
                      // ref={values.imagen}
                      onChange={onImageChange}
                      // value={values.imagen}
                    />
                    <div>{imageSize && `Peso: ${imageSize} MB`}</div>
                    <div className="text-vino-700">{errors.imagen && touched.imagen && errors.imagen}</div>
                  </div>

                  <div id="secondSection" className="flex items-center justify-between py-8">
                    <button
                      type="submit"
                      className="bg-vino-500 hover:bg-vino-600 text-white font-semibold rounded-md py-2 px-4 w-full"
                    >
                      {isEditing ? 'Actualizar Producto' : 'Guardar Producto'}
                    </button>
                  </div>
                </form>
              )}

              {/* <form>
                <div className="mb-2">
                  <label htmlFor="nombre" className="block text-gray-600">
                    Nombre del producto
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-vino-500 required:*"
                    autoComplete="off"
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="descripcion" className="block text-gray-600">
                    Descripción
                  </label>
                  <input
                    type="text"
                    id="descripcion"
                    name="descripcion"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-vino-500"
                    autoComplete="off"
                  />
                </div>

                <div className="flex justify-between mb-2">
                  <div className="w-1/3">
                    <label htmlFor="tipo" className="block text-gray-600">
                      Tipo
                    </label>
                    <select
                      name="tipo"
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-vino-500"
                    >
                      <option value="Seleccionar">Seleccionar</option>
                      <option value="a">Medicamento</option>
                      <option value="b">Comida</option>
                      <option value="c">Juguete</option>
                    </select>
                  </div>
                  <div className="w-2/4">
                    <label htmlFor="precio" className="block text-gray-600">
                      Costo
                    </label>
                    <input
                      type="number"
                      id="precio"
                      name="precio"
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-vino-500"
                      autoComplete="off"
                    />
                  </div>
                </div>
                <div className="mb-2">
                  <label htmlFor="cantidad" className="block text-gray-600">
                    Unidades
                  </label>
                  <input
                    type="text"
                    id="cantidad"
                    name="cantidad"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-vino-500"
                    autoComplete="off"
                  />
                </div>
                <div>
                  <label htmlFor="imagen" className="block text-gray-600">
                    Subir Imagen
                  </label>
                  <input
                    type="file"
                    id="imagen"
                    name="imagen"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-vino-500"
                    autoComplete="off"
                  />
                </div>

                <div id="secondSection" className="flex items-center justify-between py-8">
                  <button
                    type="submit"
                    className="bg-vino-500 hover:bg-vino-600 text-white font-semibold rounded-md py-2 px-4 w-full"
                  >
                    {isEditing ? 'Actualizar Producto' : 'Guardar Producto'}
                  </button>
                </div>
              </form> */}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};
