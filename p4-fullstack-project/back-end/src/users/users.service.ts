import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Cria um usuário novo criptografando a senha
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, password } = createUserDto;

    const usuarioExistente = await this.userRepository.findOneBy({ username });
    if (usuarioExistente) {
      throw new BadRequestException('Este nome de usuário já está em uso.');
    }

    // Aplica o hashing unidirecional de segurança na senha
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const novoUsuario = this.userRepository.create({
      username,
      password: passwordHash,
    });

    const salvo = await this.userRepository.save(novoUsuario);
    const { password: _password, ...usuarioSemSenha } = salvo; // Remove a senha de forma segura
    return usuarioSemSenha as User;
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ username });
  }
}
