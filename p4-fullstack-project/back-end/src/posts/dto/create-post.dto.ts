import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';

export class CreatePostDto {
  @IsString({ message: 'O título deve ser um texto.' })
  @IsNotEmpty({ message: 'O título não pode ser vazio.' })
  titulo: string;

  @IsString({ message: 'O conteúdo deve ser um texto.' })
  @IsNotEmpty({ message: 'O conteúdo não pode ser vazio.' })
  conteudo: string;

  @IsString({ message: 'A imagem deve ser uma URL ou caminho de arquivo válido.' })
  @IsNotEmpty({ message: 'A imagem não pode ser vazia.' })
  imagem: string;

  @IsInt({ message: 'A ordenação deve ser um número inteiro.' })
  @Min(0, { message: 'A ordenação deve ser maior ou igual a zero.' })
  ordenacao: number;
}