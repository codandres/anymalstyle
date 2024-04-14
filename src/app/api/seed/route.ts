export const dynamic = 'force-dynamic'; // Para prevenir que next ejecute la ruta en el build (o sea en modo estático)

import { CreateUsuarioDto } from '@/dto/auth/CreateUsuarioDto';
import { signUpUser } from '@/models/authModel';
import prisma from '@/orm/prisma';
import { NextResponse } from 'next/server';
import { Faker, es, es_MX } from '@faker-js/faker';
import bcrypt from 'bcryptjs';

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
  await prisma.resena.deleteMany();

  await prisma.tipoProducto.createMany({
    data: [
      { idTipoProducto: 1, nombre: 'Juguete' },
      { idTipoProducto: 2, nombre: 'Comida' },
      { idTipoProducto: 3, nombre: 'Gimnasios' },
      { idTipoProducto: 4, nombre: 'Camas' },
    ],
  });

  await prisma.marca.createMany({
    data: [
      { idMarca: 1, nombre: 'Dogchow' },
      { idMarca: 2, nombre: 'Hills' },
      { idMarca: 3, nombre: 'Besties' },
      { idMarca: 4, nombre: 'Pro Plan' },
      { idMarca: 5, nombre: 'Guamba' },
      { idMarca: 6, nombre: 'Equilibrio' },
      { idMarca: 7, nombre: 'Inaba Premium' },
    ],
  });

  await prisma.producto.createMany({
    data: [
      {
        nombre: 'Churu inaba',
        descripcion: '¡Estos sabrosos snacks para gatos se hacen con atún silvestre o pollo criado en granjas puro y natural! Disponibles en nueve variedades deliciosas, los Churu® Purés tienen el alto contenido de humedad necesario para la salud de los felinos.',
        precio: 24000,
        cantidad: 90,
        idMarca: 7,
        idTipo: 2,
        imagen: faker.image.dataUri({ width: 640, height: 480, type: 'svg-base64', color: faker.color.rgb() }),
      },
      {
        nombre: 'Equilibrio Gato Adulto Castrado +7 Años 1.5 Kg',
        descripcion: 'Equilibrio Gato Adulto Castrado +7 Años 1.5 Kg es un alimento completo para gatos mayores de 7 años. Combina ingredientes que colaboran al control del peso, previene  la acumulación de pelotas de pelo en el tracto digestivo, auxilia en el mantenimiento de la salud del tracto urinario.',
        precio: 90000,
        cantidad: 70,
        idMarca: 6,
        idTipo: 2,
        imagen: faker.image.dataUri({ width: 640, height: 480, type: 'svg-base64', color: faker.color.rgb() }),
      },
      {
        nombre: 'Cama para perro antiestrés tipo Donut',
        descripcion: 'Gracias a su forma redonda, la cama para perros tipo donut de alta calidad es ideal para las mascotas a las que les encanta acurrucarse. El borde elevado de esta cama para perros crea una sensación de seguridad y proporciona soporte para la cabeza y el cuello.',
        precio: 120000,
        cantidad: 100,
        idMarca: 5,
        idTipo: 4,
        imagen: faker.image.dataUri({ width: 640, height: 480, type: 'svg-base64', color: faker.color.rgb() }),
      },
    ].map((producto) => ({ ...producto, imagen: base64ToBuffer(producto.imagen) })),
  });

  // const marcas = await prisma.marca.createMany({
  //   data: Array.from({ length: 20 }).map((_, i) => ({ idMarca: i + 1, nombre: faker.commerce.department() })),
  // });

  // console.log('marcas :>> ', marcas);

  // const tipos = await prisma.tipoProducto.createMany({
  //   data: Array.from({ length: 20 }).map((_, i) => ({ idTipoProducto: i + 1, nombre: faker.commerce.product() })),
  // });

  const estadoProbability: string[] = [
    'ACTIVO',
    'ACTIVO',
    'ACTIVO',
    'ACTIVO',
    'ACTIVO',
    'ACTIVO',
    'ACTIVO',
    'INACTIVO',
    'INACTIVO',
    'INACTIVO',
    'INACTIVO',
  ];

  // await prisma.producto.createMany({
  //   data: Array.from({ length: 20 })
  //     .map((_, i) => ({
  //       idProducto: i + 1,
  //       nombre: faker.commerce.product(),
  //       descripcion: faker.lorem.sentences({ min: 3, max: 20 }),
  //       cantidad: faker.number.int({ min: 1, max: 2000 }),
  //       precio: faker.commerce.price({ min: 500, max: 1000000 }),
  //       idMarca: faker.number.int({ min: 1, max: marcas.count }),
  //       estado: estadoProbability[Math.floor(Math.random() * estadoProbability.length)],
  //       idTipo: faker.number.int({ min: 1, max: tipos.count }),
  //       imagen: faker.image.dataUri({ width: 640, height: 480, type: 'svg-base64', color: faker.color.rgb() }),
  //     }))
  //     .map((producto) => ({ ...producto, imagen: base64ToBuffer(producto.imagen) })),
  // });

  const rolesProbability: string[] = [
    'ADMIN',
    'ADMIN',
    'ADMIN',
    'ADMIN',
    'ADMIN',
    'ADMIN',
    'ADMIN',
    'USER',
    'USER',
    'USER',
  ];

  await prisma.user.createMany({
    data: Array.from({ length: 50 }).map((_, i) => {
      const nombre = faker.person.firstName();
      const apellido = faker.person.lastName();

      return {
        nombre,
        apellido,
        cedula: faker.number.bigInt({ min: 1000000000, max: 1999999999 }),
        // email: faker.internet.email({
        //   firstName: nombre,
        //   lastName: apellido,
        //   allowSpecialCharacters: true,
        //   provider: 'mail.com',
        // }),
        email: `${i + 1}@m.com`,
        password: bcrypt.hashSync('123', 10),
        // usuario: `${faker.internet.userName({ firstName: nombre, lastName: apellido })}${i + 1}`,
        usuario: `${nombre}${i + 1}`,
        role: i === 0 ? 'ADMIN' : rolesProbability[Math.floor(Math.random() * rolesProbability.length)],
        telefono: faker.number.bigInt({ min: 3000000000, max: 3009099999 }),
        direccion: faker.location.streetAddress(),
      };
    }),
  });

  const userAdmin: CreateUsuarioDto = {
    nombre: 'Juan',
    apellido: 'Perez',
    cedula: 1000000,
    email: 'admin@mail.com',
    password: '123',
    usuario: 'admin',
    role: 'ADMIN',
    telefono: 3000000000,
    direccion: null,
  };

  const user: CreateUsuarioDto = {
    nombre: 'Andrés',
    apellido: 'Posada',
    cedula: 1000001,
    email: 'user@mail.com',
    password: '123',
    usuario: 'user',
    role: 'USER',
    telefono: 3000000001,
    direccion: null,
  };

  await signUpUser(userAdmin, false);
  await signUpUser(user, false);

  const users = await prisma.user.findMany({ select: { id: true } });
  const products = await prisma.producto.findMany({ select: { idProducto: true } });

  console.log('users :>> ', users.length);
  console.log('products :>> ', products.length);

  const puntuacionRangeProbability: number[] = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1.5, 2, 2.5, 3, 3.5, 3.5, 3.5, 3.5, 4, 4.5, 5, 4, 4.5, 5, 4, 4.5, 5, 4, 4.5, 5, 4, 4.5,
    5, 4, 4.5, 5, 4, 4.5, 5, 5, 5, 5,
  ];

  const puntuacionRangeProbabilityZule: number[] = [
    4, 4.5, 5, 4, 4.5, 5, 4, 4.5, 5, 4, 4.5, 5, 4, 4.5,
    5, 4, 4.5, 5, 4, 4.5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5
  ];

  const res = await prisma.resena.createMany({
    data: users
      .map((user) =>
        products.map((product) => ({
          idUsuario: user.id,
          idProducto: Number(product.idProducto),
          // puntuacion: puntuacionRangeProbability[Math.floor(Math.random() * puntuacionRangeProbability.length)],
          puntuacion: puntuacionRangeProbabilityZule[Math.floor(Math.random() * puntuacionRangeProbabilityZule.length)],
          comentario: faker.lorem.sentences({ min: 1, max: 2 }),
          fechaResena: faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2025-01-01T00:00:00.000Z' }),
        })),
      )
      .flat(),
  });

  console.log('Reseñas creadas :>> ', res);

  return NextResponse.json({ message: 'Ejecutado' });
}
