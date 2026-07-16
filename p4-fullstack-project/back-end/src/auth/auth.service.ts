import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    const usuario = await this.usersService.findOneByUsername(username);
    if (!usuario) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    // Compara o hash seguro do MySQL com a senha digitada
    const senhaValida = await bcrypt.compare(password, usuario.password);
    if (!senhaValida) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }

    // Payload codificado dentro do token JWT
    const payload = { sub: usuario.id, username: usuario.username };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}