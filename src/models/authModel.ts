'use server';

import { UsuarioDto } from '@/dto/auth/UsuarioDto';
import { toUsuarioDto } from '@/mappers/toUsuarioDto';
import prisma from '@/orm/prisma';
import { Prisma, User } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';

const uniqueConstraintErrorCode = 'P2002';

export const signUpUser = async (usuario: UsuarioDto): Promise<UsuarioDto> => {
  try {
    const password: string = bcrypt.hashSync(usuario.password, 10);

    await prisma.user.create({
      data: {
        ...usuario,
        password,
      },
    });
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === uniqueConstraintErrorCode) {
        const field: string = error.meta?.target as string;
        console.error(`SignUp error: ${error.message}`);

        throw new Error(`${field} ya existe en el sistema`);
      }
    }

    throw error;
  }

  redirect('/signin');
};

export const signInEmailPassword = async (email?: string, password?: string): Promise<UsuarioDto | null> => {
  try {
    if (!email || !password) return null;

    const usuario: User | null = await prisma.user.findUnique({ where: { email } });

    if (!usuario) {
      throw new Error('Usuario no existe');
    }

    if (!bcrypt.compareSync(password, usuario.password ?? '')) {
      throw new Error('Contraseña incorrecta');
    }

    return toUsuarioDto(usuario);
  } catch (error: any) {
    console.error(`SignUp error: ${error.message}`);
    return null;
  }
};
