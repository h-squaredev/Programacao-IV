import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>, // Injeção do repositório TypeORM
  ) {}

  //Cria e persiste um novo post no banco de dados 
  async create(createPostDto: CreatePostDto): Promise<Post> {
    const novoPost = this.postRepository.create(createPostDto);
    return await this.postRepository.save(novoPost);
  }

  // Busca todos os posts ordenados pelo campo 'ordenacao' de forma ascendente 
  async findAll(): Promise<Post[]> {
    return await this.postRepository.find({
      order: {
        ordenacao: 'ASC', // Atende ao requisito de ordenação de apresentação
      },
    });
  }

  // Busca um post único pelo ID. Lança erro caso não exista 
  async findOne(id: number): Promise<Post> {
    const post = await this.postRepository.findOneBy({ id });
    if (!post) {
      throw new NotFoundException(`Post com o ID #${id} não foi encontrado.`);
    }
    return post;
  }

  // Atualiza os dados de um post existente [10, 11]
  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.findOne(id); // Garante que o post existe antes de atualizar
    const postAtualizado = this.postRepository.merge(post, updatePostDto);
    return await this.postRepository.save(postAtualizado);
  }

  // Remove um post do banco de dados 
  async remove(id: number): Promise<void> {
    const post = await this.findOne(id); // Garante que o post existe antes de deletar
    await this.postRepository.remove(post);
  }
}
