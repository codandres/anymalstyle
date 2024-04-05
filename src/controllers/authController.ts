import { CreateUsuarioDto } from '@/dto/auth/CreateUsuarioDto';
import { CreateUsuarioResponse } from '@/dto/auth/CreateUsuarioResponse';
import { UsuarioDto } from '@/dto/auth/UsuarioDto';
import { signInEmailPassword, signUpUser } from '@/models/authModel';

export class AuthController {
  async createUser(usuario: CreateUsuarioDto): Promise<CreateUsuarioResponse> {
    return await signUpUser(usuario) as CreateUsuarioResponse;
  }

  async login(email?: string, password?: string): Promise<UsuarioDto | null> {
    return await signInEmailPassword(email, password);
  }
}
