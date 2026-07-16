/// <reference types="jest" />
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';

describe('PostsService', () => {
  let service: PostsService;
  let repository: Repository<Post>;

  // Dublê de teste (Mock) do repositório TypeORM
  const mockPostRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((post) => Promise.resolve({ id: 1, ...post })),
    find: jest.fn().mockResolvedValue([
      { id: 1, titulo: 'Post 1', conteudo: 'Conteúdo 1', imagem: 'img1.png', ordenacao: 1 },
      { id: 2, titulo: 'Post 2', conteudo: 'Conteúdo 2', imagem: 'img2.png', ordenacao: 2 },
    ]),
    findOneBy: jest.fn().mockImplementation(({ id }) => {
      if (id === 1) {
        return Promise.resolve({ id: 1, titulo: 'Post 1', conteudo: 'Conteúdo 1', imagem: 'img1.png', ordenacao: 1 });
      }
      return Promise.resolve(null);
    }),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(Post),
          useValue: mockPostRepository,
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    repository = module.get<Repository<Post>>(getRepositoryToken(Post));
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  it('deve criar e persistir um post com sucesso', async () => {
    const createDto = { titulo: 'Novo Post', conteudo: 'Conteúdo', imagem: 'img.png', ordenacao: 3 };
    const resultado = await service.create(createDto);
    
    expect(resultado).toEqual({ id: 1, ...createDto });
    expect(repository.create).toHaveBeenCalledWith(createDto);
    expect(repository.save).toHaveBeenCalled();
  });

  it('deve retornar todos os posts ordenados de forma ascendente', async () => {
    const posts = await service.findAll();
    
    expect(posts).toHaveLength(2);
    expect(repository.find).toHaveBeenCalledWith({
      order: { ordenacao: 'ASC' },
    });
  });

  it('deve retornar um post por ID com sucesso', async () => {
    const post = await service.findOne(1);
    
    expect(post.id).toBe(1);
    expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });

  it('deve lançar NotFoundException se o ID do post não for encontrado', async () => {
    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });
});