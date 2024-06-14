import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { task } from '@prisma/client';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskService } from './task.service';

@ApiTags('Task')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Post()
  async createTask(@Body() data: CreateTaskDto): Promise<task> {
    return this.taskService.createTask(data);
  }

  @Put(':id')
  async updateTask(@Param('id') id: number, @Body() data: CreateTaskDto): Promise<task> {
    return this.taskService.updateById(+id, data);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: number): Promise<task> {
    return this.taskService.deleteTask(+id);
  }

  @Get()
  async getAllTask(): Promise<task[]> {
    return this.taskService.getAllTask();
  }

  @Patch(':id')
  async updateTaskStatus(@Param('id') id: number): Promise<task> {
    return this.taskService.taskIsDone(+id);
  }

}
