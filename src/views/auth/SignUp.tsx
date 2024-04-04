'use client';

import { AuthController } from '@/controllers/authController';
import { Formik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import * as yup from 'yup';
import { toast } from 'react-hot-toast';

const requiredMessage = 'Este campo es requerido';

const formValidations = yup.object({
  nombre: yup.string().required(requiredMessage),
  apellido: yup.string().required(requiredMessage),
  cedula: yup.number().required(requiredMessage).min(1, 'Unidades mínima: 1'),
  telefono: yup.number().required(requiredMessage).min(1, 'Unidades mínima: 1'),
  email: yup.string().required(requiredMessage),
  usuario: yup.string().required(requiredMessage),
  password: yup.string().required(requiredMessage),
});

export const SignUp = () => {
  const authController = useMemo(() => new AuthController(), []);

  const initialValues = {
    nombre: 'Andrés',
    apellido: 'Escalante',
    cedula: '1017233307',
    telefono: 3004147412,
    email: 'andres_95@outlook.com',
    usuario: 'andres95',
    password: 'pika1234',
  };

  const [errorMessage, setErrorMessage] = useState(undefined);

  const onSubmit = async (values: any) => {
    try {
      await authController.createUser(values);
      toast.success('Usuario creado correctamente!');
    } catch (error: any) {
      const message = error.message;
      toast.error(message);
      setErrorMessage(message);
    }
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      {/* <!-- Left: Image --> */}
      <div className="w-1/2 h-screen hidden lg:block">
        <Image
          src="/images/signup.svg"
          width={923}
          height={923}
          alt="Placeholder Image"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2 flex justify-center items-center">
        <div>
          <div className="text-center">
            <h1 className="text-2xl font-semibold mb-8">Registro</h1>
          </div>
          <Formik initialValues={initialValues} validationSchema={formValidations} onSubmit={onSubmit}>
            {({ values, errors, touched, handleSubmit, handleChange }) => (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  {/* <!-- Nombre Input --> */}
                  <div className="mb-4">
                    <label htmlFor="nombre" className="block text-gray-600">
                      Nombre
                      <span className="text-vino-700">*</span>
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-vino-500"
                      autoComplete="off"
                      onChange={handleChange}
                      value={values.nombre}
                    />
                    <div className="text-vino-700">{errors.nombre && touched.nombre && errors.nombre}</div>
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
                      onChange={handleChange}
                      value={values.apellido}
                    />
                    <div className="text-vino-700">{errors.apellido && touched.apellido && errors.apellido}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {/* <!-- Cédula Input --> */}
                  <div className="mb-4">
                    <label htmlFor="cedula" className="block text-gray-600">
                      Cédula de Ciudadanía
                      <span className="text-vino-700">*</span>
                    </label>
                    <input
                      type="number"
                      id="cedula"
                      name="cedula"
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-vino-500"
                      autoComplete="off"
                      onChange={handleChange}
                      value={values.cedula}
                    />
                    <div className="text-vino-700">{errors.cedula && touched.cedula && errors.cedula}</div>
                  </div>
                  {/* <!-- Celular Input --> */}
                  <div className="mb-4">
                    <label htmlFor="celular" className="block text-gray-600">
                      Celular
                    </label>
                    <input
                      type="number"
                      id="telefono"
                      name="telefono"
                      className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-vino-500"
                      autoComplete="off"
                      onChange={handleChange}
                      value={values.telefono}
                    />
                    <div className="text-vino-700">{errors.telefono && touched.telefono && errors.telefono}</div>
                  </div>
                </div>
                <div className="mb-4">
                  {/* <!-- Correo Electrónco Input --> */}
                  <label htmlFor="email" className="block text-gray-600">
                    Correo electrónico
                    <span className="text-vino-700">*</span>
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-vino-500"
                    autoComplete="off"
                    onChange={handleChange}
                    value={values.email}
                  />
                  <div className="text-vino-700">{errors.email && touched.email && errors.email}</div>
                </div>
                <div className="mb-4">
                  {/* <!-- Usuario Input --> */}
                  <label htmlFor="usuario" className="block text-gray-600">
                    Usuario
                    <span className="text-vino-700">*</span>
                  </label>
                  <input
                    type="text"
                    id="usuario"
                    name="usuario"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-vino-500"
                    autoComplete="off"
                    onChange={handleChange}
                    value={values.usuario}
                  />
                  <div className="text-vino-700">{errors.email && touched.email && errors.email}</div>
                </div>
                {/* <!-- Password Input --> */}
                <div className="mb-8">
                  <label htmlFor="password" className="block text-gray-600">
                    Contraseña
                    <span className="text-vino-700">*</span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-vino-500"
                    autoComplete="off"
                    onChange={handleChange}
                    value={values.password}
                  />
                  <div className="text-vino-700">{errors.password && touched.password && errors.password}</div>
                </div>
                <div className="text-vino-700">{errorMessage}</div>
                <button
                  type="submit"
                  className="bg-vino-500 hover:bg-vino-600 text-white font-semibold rounded-md py-2 px-4 w-full"
                >
                  Registrarse
                </button>
              </form>
            )}
          </Formik>
          <div className="mt-6 text-vino-500 text-center">
            <Link href="/signin" className="hover:underline">
              Inicia Sesión Aquí
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
