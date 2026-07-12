import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { CreateUserDto } from './create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly pessoaService: PessoaService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
    return this.pessoaService.create(createUserDto);
    }

    @Get()
    findAll() {
    return this.pessoaService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
    return this.pessoaService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
    return this.pessoaService.remove(id);
    }
}