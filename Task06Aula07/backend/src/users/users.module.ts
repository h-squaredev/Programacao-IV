import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { PessoaService } from './pessoa.service';

@Module({
  controllers: [UsersController],
  providers: [PessoaService]
})
export class UsersModule {}
