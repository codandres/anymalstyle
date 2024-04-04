import { CreateUsuarioDto } from '@/dto/auth/CreateUsuarioDto';
import { signUpUser } from '@/models/authModel';
import prisma from '@/orm/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  await prisma.marca.deleteMany();
  await prisma.tipoProducto.deleteMany();
  await prisma.producto.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

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
      {
        nombre: 'Producto 1',
        descripcion: 'descripcion del producto 1',
        cantidad: 10,
        precio: 100,
        idMarca: 2,
        idTipo: 2,
      },
      {
        nombre: 'Producto 2',
        descripcion: 'descripcion del producto 1',
        cantidad: 20,
        precio: 200,
        idMarca: 1,
        idTipo: 3,
      },
      {
        nombre: 'Producto 3',
        descripcion: 'descripcion del producto 1',
        cantidad: 20,
        precio: 200,
        idMarca: 1,
        idTipo: 3,
      },
      {
        nombre: 'Producto 4',
        descripcion: 'descripcion del producto 1',
        cantidad: 20,
        precio: 11800,
        idMarca: 2,
        idTipo: 3,
      },
      {
        nombre: 'Producto 5',
        descripcion: 'descripcion del producto 1',
        cantidad: 20,
        precio: 5600,
        idMarca: 1,
        idTipo: 3,
      },
      {
        nombre: 'Producto 6',
        descripcion: 'descripcion del producto 1',
        cantidad: 20,
        precio: 8200,
        idMarca: 3,
        idTipo: 1,
      },
      {
        nombre: 'Producto 7',
        descripcion: 'descripcion del producto 1',
        cantidad: 20,
        precio: 4500,
        idMarca: 2,
        idTipo: 2,
      },
    ],
  });

  const userAdmin: CreateUsuarioDto = {
    nombre: 'Juan',
    apellido: 'Perez',
    cedula: 10000000,
    email: 'admin@mail.com',
    password: 'pass123',
    usuario: 'admin',
    role: 'ADMIN',
    telefono: 3000000000,
    direccion: null,
  };

  const user: CreateUsuarioDto = {
    nombre: 'Andrés',
    apellido: 'Posada',
    cedula: 10000001,
    email: 'user@mail.com',
    password: 'pass123',
    usuario: 'user',
    role: 'USER',
    telefono: 3000000001,
    direccion: null,
  };

  await signUpUser(userAdmin, false);
  await signUpUser(user, false);

  return NextResponse.json({ message: 'Seed Excecuted' });
}
