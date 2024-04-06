export const dynamic = 'force-dynamic'; // Para prevenir que next ejecute la ruta en el build (o sea en modo estático)

import { CreateUsuarioDto } from '@/dto/auth/CreateUsuarioDto';
import { signUpUser } from '@/models/authModel';
import prisma from '@/orm/prisma';
import { NextResponse } from 'next/server';
import { Faker, es, es_MX } from '@faker-js/faker';

const base64ToBuffer = (base64String: string): Buffer => {
  const base64Data = base64String.replace(/^data:image\/.*?;base64,/, ''); // Ej: data:image/svg+xml;base64,PHN2ZyB4bW
  return Buffer.from(base64Data, 'base64');
};

export async function GET() {
  const faker = new Faker({
    locale: [es_MX, es],
  });

  await prisma.marca.deleteMany();
  await prisma.tipoProducto.deleteMany();
  await prisma.producto.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  const marcas = await prisma.marca.createMany({
    data: Array.from({ length: 20 }).map((_, i) => ({ idMarca: i + 1, nombre: faker.commerce.department() })),
  });

  console.log('marcas :>> ', marcas);

  const tipos = await prisma.tipoProducto.createMany({
    data: Array.from({ length: 20 }).map((_, i) => ({ idTipoProducto: i + 1, nombre: faker.commerce.product() })),
  });

  await prisma.producto.createMany({
    data: Array.from({ length: 20 })
      .map((_, i) => ({
        idProducto: i + 1,
        nombre: faker.commerce.product(),
        descripcion: faker.lorem.text(),
        cantidad: faker.number.int({ min: 1, max: 2000 }),
        precio: faker.commerce.price({ min: 500, max: 1000000 }),
        idMarca: faker.number.int({ min: 1, max: marcas.count }),
        idTipo: faker.number.int({ min: 1, max: tipos.count }),
        imagen: faker.image.dataUri({ width: 640, height: 480, type: 'svg-base64', color: faker.color.rgb() }),
      }))
      .map((producto) => ({ ...producto, imagen: base64ToBuffer(producto.imagen) })),
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

  return NextResponse.json({ message: 'Ejecutado' });
}
