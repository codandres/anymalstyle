'use server';

import prisma from '@/orm/prisma';
import { Prisma, Producto } from '@prisma/client';
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

export async function getAllProducts(offset: number, limit: number): Promise<Producto[]> {
  console.log({ offset, limit });

  if (isNaN(offset)) {
    throw new Error('offset must be a number');
  }

  if (isNaN(limit)) {
    throw new Error('limit must be a number');
  }

  const productos: Producto[] = await prisma.producto.findMany({ skip: offset, take: limit });

  return productos;
}

export async function createProduct(product: Producto): Promise<Producto> {
  try {
    console.log('AQUI1');
    const payload = (await productoCreateSchema.validate(product)) as unknown as Producto;
    console.log('AQUI2');

    const dto: Prisma.ProductoCreateInput = {
      nombre: payload.nombre,
      precio: payload.precio,
      cantidad: payload.cantidad,
      descripcion: payload.descripcion,
      // imagen: payload.imagen ? Buffer.from(payload.imagen),
      imagen: Buffer.from(payload.imagen!),
      // imagen: Buffer.from([1, 2, 3]),
      tipo: { connect: { idTipoProducto: BigInt(payload.idTipo!) } },
      marca: { connect: { idMarca: BigInt(payload.idMarca!) } },
    };
    console.log('AQUI3');

    const producto: Producto = await prisma.producto.create({ data: dto });
    console.log('AQUI4');

    return producto;
  } catch (error: any) {
    throw new Error(error.message);
    // throw new Error('Un error');
  }
}
