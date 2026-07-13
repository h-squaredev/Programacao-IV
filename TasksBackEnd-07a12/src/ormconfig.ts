import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306, // porta padrão do MySQL 
      username: 'root', // usuário do servidor MySQL
      password: 'TInaveia123@', // senha do servidor MySQL
      database: 'atividades_prog', // O banco de dados isolado
      entities: [User],
      synchronize: true, // Permite que o TypeORM crie a tabela automaticamente no MySQL
    }),
    UsersModule,
  ],
})
export class AppModule {}