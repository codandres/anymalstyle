import { UsuarioDto } from '@/dto/auth/UsuarioDto';
import { signInEmailPassword, signUpUser } from '@/models/authModel';

export class AuthController {
  async createUser(usuario: UsuarioDto): Promise<UsuarioDto> {
    return await signUpUser(usuario);
  }

  async login(email?: string, password?: string): Promise<UsuarioDto | null> {
    return await signInEmailPassword(email, password);
  }
}
