import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoDto } from './dto/todo';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {
    console.log('todoStart');
  }

  @Get()
  async findAll() {
    return await this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') contet: string) {
    return this.todoService.findOne(contet);
  }

  @Get('/insert')
  async insert() {
    await this.todoService.insert();
  }

  @Post('/add')
  async create(@Body() createTodoDto: TodoDto) {
    await this.todoService.create(createTodoDto);
    return this.todoService.findAll();
  }

  @Post('/put')
  async update(@Body() updateTodoDto: TodoDto) {
    await this.todoService.update(updateTodoDto);
    return this.todoService.findAll();
  }

  @Post('/delete')
  async remove(@Body() id: string) {
    await this.todoService.remove(id);
    return this.todoService.findAll();
  }
}
