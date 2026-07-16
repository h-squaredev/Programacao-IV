import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty({ message: 'O campo username é obrigatório.' })
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'O campo password é obrigatório.' })
  password: string;
}