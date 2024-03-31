'use server';

import { CreateProductoDto } from '@/dto/createProductoDto';
import { ProductoDto } from '@/dto/productoDto';
import { toProductoDto } from '@/mappers/toProductoDtoMap';
import prisma from '@/orm/prisma';
import { Prisma, Producto } from '@prisma/client';
import { redirect } from 'next/navigation';
import * as yup from 'yup';

const productoCreateSchema: yup.Schema = yup.object({
  nombre: yup.string().required(),
  precio: yup.number().required().min(0),
  cantidad: yup.number().required().min(0),
  descripcion: yup.string().optional(),
  idTipo: yup.number().required(),
  idMarca: yup.number().required(),
  imagen: yup.mixed<Buffer>().optional(),
});

const getProduct = async (idProducto: number): Promise<Producto> => {
  const producto: Producto | null = await prisma.producto.findUnique({ where: { idProducto } });

  if (!producto) throw new Error(`No producto with id ${idProducto} found`);

  return producto;
};

export async function getProductById(productId: number): Promise<ProductoDto> {
  const producto: Producto = await getProduct(productId);

  // return toProductoDto(producto);
  return await toProductoDto(producto);
}

export async function getAllProducts(offset: number, limit: number): Promise<ProductoDto[]> {
  console.log({ offset, limit });

  if (isNaN(offset)) {
    throw new Error('offset must be a number');
  }

  if (isNaN(limit)) {
    throw new Error('limit must be a number');
  }

  const productos: Producto[] = await prisma.producto.findMany({ skip: offset, take: limit });

  const result: Promise<ProductoDto>[] = [];

  productos.forEach((product) => result.push(toProductoDto(product)));

  return Promise.all(result);
}

export async function createProduct(productDto: CreateProductoDto): Promise<void> {
  try {
    const payload = await productoCreateSchema.validate(productDto);

    let imageRaw: Buffer | undefined;

    if (productDto.imagen) {
      // const arrayBuffer: ArrayBuffer = await new Blob([productDto.imagen]).arrayBuffer();
      // imageRaw = Buffer.from(payload.imagen, 'binary');
      imageRaw = Buffer.from(productDto.imagen, 'binary');

      console.log('image BUFF BEFORE SAVE :>> ', imageRaw);
    }

    const product: Prisma.ProductoCreateInput = {
      nombre: payload.nombre,
      precio: payload.precio,
      cantidad: payload.cantidad,
      descripcion: payload.descripcion,
      imagen: imageRaw,
      tipo: { connect: { idTipoProducto: payload.idTipo! } },
      marca: { connect: { idMarca: payload.idMarca! } },
    };

    console.log('product :>> ', product);

    await prisma.producto.create({ data: product });
  } catch (error: any) {
    throw new Error(error.message);
  }
  redirect('/products');
}

export async function deleteProductById(idProducto: number): Promise<ProductoDto> {
  await getProduct(idProducto);

  await prisma.producto.delete({ where: { idProducto } });

  redirect('/products');
}