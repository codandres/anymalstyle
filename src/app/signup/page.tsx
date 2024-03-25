'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      {/* <!-- Left: Image --> */}
      <div className="w-1/2 h-screen hidden lg:block">
        <Image
          // src="https://placehold.co/800x/667fff/ffffff.png?text=Your+Image&font=Montserrat"
          src="/images/signup.jpg"
          width={923}
          height={923}
          // layout='responsive'
          alt="Placeholder Image"
          className="object-cover w-full h-full"
        />
      </div>
      {/* <!-- Right: Sign up Form --> */}
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2 flex justify-center items-center">
        <div>
          <div className="text-center">
            <h1 className="text-2xl font-semibold mb-8">Registro</h1>
          </div>
          <form action="#" method="POST">
            <div className="grid grid-cols-2 gap-4">
              {/* <!-- Nombre Input --> */}
              <div className="mb-4">
                <label htmlFor="nombre" className="block text-gray-600">
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-vino-500"
                  autoComplete="off"
                />
              </div>
              {/* <!-- Apellido Input --> */}
              <div className="mb-4">
                <label htmlFor="apellido" className="block text-gray-600">
                  Apellido
                </label>
                <input
                  type="apellido"
                  id="apellido"
                  name="apellido"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-vino-500"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* <!-- Cédula Input --> */}
              <div className="mb-4">
                <label htmlFor="cedula" className="block text-gray-600">
                  Cédula de Ciudadanía
                </label>
                <input
                  type="cedula"
                  id="cedula"
                  name="cedula"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-vino-500"
                  autoComplete="off"
                />
              </div>
              {/* <!-- Celular Input --> */}
              <div className="mb-4">
                <label htmlFor="celular" className="block text-gray-600">
                  Celular
                </label>
                <input
                  type="celular"
                  id="celular"
                  name="celular"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-vino-500"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="mb-4">
              {/* <!-- Correo Electrónco Input --> */}
              <label htmlFor="correo" className="block text-gray-600">
                Correo electrónico
              </label>
              <input
                type="text"
                id="correo"
                name="correo"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-vino-500"
                autoComplete="off"
              />
            </div>
            {/* <!-- Password Input --> */}
            <div className="mb-8">
              <label htmlFor="password" className="block text-gray-600">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-vino-500"
                autoComplete="off"
              />
            </div>
            {/* <!-- Ingresar Button --> */}
            <button
              type="submit"
              className="bg-vino-500 hover:bg-vino-600 text-white font-semibold rounded-md py-2 px-4 w-full"
            >
              Registrar
            </button>
          </form>
          <div className="mt-6 text-vino-500 text-center">
            <Link href="/signin" className="hover:underline">
              Inicia Sesión Aquí
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
