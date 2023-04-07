import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoDto } from './dto/todo';

import { HttpService } from '@nestjs/axios';
import { Like, Repository } from 'typeorm';

import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly todo: Repository<Todo>,
    private readonly httpService: HttpService,
  ) {
    console.log('servive');
  }

  async insert() {
    const res = await this.httpService.get(
      'https://jsonplaceholder.typicode.com/todos',
    );
    return res;
  }

  async create(createTodoDto: TodoDto) {
    return await this.todo.save(createTodoDto);
  }

  async findAll() {
    return await this.todo.find();
  }

  async findOne(content: string) {
    return await this.todo.find({
      where: {
        content: Like(`%${content}%`),
      },
    });
  }

  async update(updateTodoDto: TodoDto) {
    return await this.todo.update(updateTodoDto?.id, updateTodoDto);
  }

  async remove(id: string) {
    return await this.todo.delete(id);
  }
}
