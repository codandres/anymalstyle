'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { Formik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import * as yup from 'yup';
import { ProductController } from '@/controllers/productController';
import { CreateProductoDto } from '@/dto/createProductoDto';
import { ProductoDto } from '@/dto/productoDto';

interface Props {
  productId?: number;
}

interface ProductoForm {
  nombre: string;
  descripcion: string;
  cantidad: string | number;
  precio: string | number;
  imagen: string;
  idTipo: string | number;
  idMarca: string | number;
}

const requiredMessage = 'Este campo es requerido';

const formValidations = yup.object({
  nombre: yup.string().required(requiredMessage),
  precio: yup.number().required(requiredMessage).min(300, 'Precio mínimo: 500'),
  cantidad: yup.number().required(requiredMessage).min(1, 'Unidades mínima: 1'),
  descripcion: yup.string().optional(),
  idTipo: yup.number().optional(),
  idMarca: yup.number().optional(),
  imagen: yup.string().optional(),
});

export const ProductTemplateEditor = ({ productId }: Props) => {
  const isEditing: boolean = !!productId;
  const [product, setProducto] = useState<ProductoDto | undefined>(undefined);
  const [image, setImage] = useState<Blob | null>(null);
  const [imageSize, setImageSize] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const productController = new ProductController();

  useEffect(() => {
    if (isEditing) {
      if (!product) {
        productController.getById(productId!).then((res: ProductoDto) => {
          setProducto(res);
          setIsLoading(false);
        });
      } else {
        setImagePreview(product.imagen || null);
      }
    } else {
      setIsLoading(false);
    }
  }, [product, productController]);

  if (isLoading) return;

  // const initialValues: CreateProductoDto = {
  //   nombre: 'Pelota',
  //   descripcion: 'Pelota de colores',
  //   cantidad: 30,
  //   precio: 3500,
  //   imagen: '',
  //   idTipo: 3,
  //   idMarca: 2,
  // };

  const initialValues: ProductoForm = {
    nombre: product?.nombre || '',
    descripcion: product?.descripcion || '',
    cantidad: product?.cantidad || '',
    precio: product?.precio || '',
    imagen: product?.imagen || '',
    idTipo: product?.idTipo || '',
    idMarca: product?.idMarca || '',
  };

  // const onSubmit = async (values: ProductoForm, helpers: FormikHelpers<ProductoForm>) => {
  // const onSubmit = async (values: ProductoForm) => {
  const onSubmit = async (values: any) => {
    try {
      let imageRaw: string | undefined;

      if (image) {
        const arrayBuffer: ArrayBuffer = await image.arrayBuffer();
        imageRaw = Buffer.from(arrayBuffer).toString('binary');
      }

      const product: CreateProductoDto = {
        nombre: values.nombre,
        descripcion: values.descripcion,
        cantidad: parseInt(values.cantidad),
        precio: Number(3399),
        imagen: imageRaw,
        idTipo: parseInt(values.idTipo),
        idMarca: parseInt(values.idMarca),
      };

      if (isEditing) {
        // Update product
      } else {
        await productController.create(product);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  // let image: Blob | null = null;
  // let imageSize: string | null = null;
  // let imagePreview: string | null = null;

  const onImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      console.log('event.target.files :>> ', event.target.files);
      setImage(event.target.files[0]);
      setImagePreview(URL.createObjectURL(event.target.files[0]));
      setImageSize((event.target.files[0].size / 1000000).toFixed(2));
      // image = event.target.files[0];
      // imagePreview = URL.createObjectURL(event.target.files[0]);
      // imageSize = (event.target.files[0].size / 1000000).toFixed(2);

      console.log('imagePreview SAVE :>> ', URL.createObjectURL(event.target.files[0]));
    }
  };
  return (
    <div className="w-fit mx-auto">
      <div className="flex justify-items-center bg-white shadow-md rounded-lg">
        <div className="w-1/2">
          {
            <Image
              className="rounded-t-lg p-8"
              width={800}
              height={800}
              src={imagePreview || '/images/no-image-found.jpg'}
              // src={undefined}
              alt="product image"
            />
          }
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
                      <span className="text-vino-700">*</span>
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
                        <span className="text-vino-700">*</span>
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
                        <span className="text-vino-700">*</span>
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