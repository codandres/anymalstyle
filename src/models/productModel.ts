'use server';

import { CreateProductoDto } from '@/dto/producto/createProductoDto';
import { UpdateProductoDto } from '@/dto/producto/editProductoDto';
import { ProductoDto } from '@/dto/producto/productoDto';
import { toProductoDto } from '@/mappers/toProductoDto';
import prisma from '@/orm/prisma';
import { Prisma, Producto } from '@prisma/client';
import { revalidatePath } from 'next/cache';
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

const productoUpdateSchema: yup.Schema = yup.object({
  idProducto: yup.string().required(),
  nombre: yup.string().optional(),
  precio: yup.number().optional().min(0),
  cantidad: yup.number().optional().min(0),
  descripcion: yup.string().optional(),
  idTipo: yup.number().optional(),
  idMarca: yup.number().optional(),
  imagen: yup.mixed<Buffer>().optional(),
});

const getProduct = async (idProducto: number): Promise<Producto> => {
  const producto: Producto | null = await prisma.producto.findUnique({
    where: { idProducto },
    include: { tipo: true, marca: true },
  });

  if (!producto) throw new Error(`No producto with id ${idProducto} found`);

  return producto;
};

export async function getProductById(productId: number): Promise<ProductoDto> {
  const producto: Producto = await getProduct(productId);

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

  const productos: Producto[] = await prisma.producto.findMany({
    skip: offset,
    take: limit,
    include: { tipo: true, marca: true },
  });

  const result: Promise<ProductoDto>[] = [];

  productos.forEach((product) => result.push(toProductoDto(product)));

  return Promise.all(result);
}

export async function createProduct(productDto: CreateProductoDto): Promise<void> {
  try {
    const payload = await productoCreateSchema.validate(productDto);

    let imageRaw: Buffer | undefined;

    if (productDto.imagen) {
      imageRaw = Buffer.from(productDto.imagen, 'binary');
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

    await prisma.producto.create({ data: product });
  } catch (error: any) {
    throw new Error(error.message);
  }

  redirect('/products');
}

export async function updateProduct(productDto: UpdateProductoDto): Promise<void> {
  try {
    const payload = await productoUpdateSchema.validate(productDto);

    let imageRaw: Buffer | undefined;

    if (productDto.imagen) {
      imageRaw = Buffer.from(productDto.imagen, 'binary');
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

    await prisma.producto.update({ data: product, where: { idProducto: payload.idProducto } });
  } catch (error: any) {
    throw new Error(error.message);
  }

  redirect('/products');
}

export async function deleteProductById(idProducto: number): Promise<void> {
  await getProduct(idProducto);

  await prisma.producto.delete({ where: { idProducto } });

  revalidatePath('/products');
}
