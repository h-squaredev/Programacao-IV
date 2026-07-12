import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class PessoaService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ){}

    create(createUserDto: CreateUserDto) {
        return this.userRepository.save(createUserDto);
    }

    findAll() {
        return this.userRepository.find();
    }

    findOne(id: number) {
        return this.userRepository.findOneBy({ id: id });
    }

    remove(id: number) {
        return this.userRepository.delete(id);
    }
}