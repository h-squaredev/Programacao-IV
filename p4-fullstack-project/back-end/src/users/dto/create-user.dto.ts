import { IsNotEmpty, IsString, MinLength } from 'class-validator';


export class CreateUserDto {
  @IsString({ message: 'O nome de usuário deve ser um texto.' })
  @IsNotEmpty({ message: 'O nome de usuário não pode ser vazio.' })
  username: string;

  @IsString({ message: 'A senha deve ser um texto.' })
  @IsNotEmpty({ message: 'A senha não pode ser vazia.' })
  @MinLength(6, { message: 'A senha deve conter no mínimo 6 caracteres.' })
  password: string;
}