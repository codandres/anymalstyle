import prisma from '@/orm/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  await prisma.marca.deleteMany();
  await prisma.tipoProducto.deleteMany();
  await prisma.producto.deleteMany();

  const marcas = await prisma.marca.createMany({
    data: [
      { idMarca: 1, nombre: 'Miwi' },
      { idMarca: 2, nombre: 'Foki' },
      { idMarca: 3, nombre: 'Pepi' },
      { idMarca: 4, nombre: 'Plopi' },
      { idMarca: 5, nombre: 'Servo' },
    ],
  });

  console.log('marcas :>> ', marcas);

  const tipos = await prisma.tipoProducto.createMany({
    data: [
      { idTipoProducto: 1, nombre: 'Medicamento' },
      { idTipoProducto: 2, nombre: 'Juguete' },
      { idTipoProducto: 3, nombre: 'Ropa' },
    ],
  });

  console.log('tipos :>> ', tipos);

  await prisma.producto.createMany({
    data: [
      { nombre: 'Producto 1', cantidad: 10, precio: 100, idMarca: 2, idTipo: 2 },
      { nombre: 'Producto 2', cantidad: 20, precio: 200, idMarca: 1, idTipo: 3 },
    ],
  });

  return NextResponse.json({ message: 'Seed Excecuted' });
}
