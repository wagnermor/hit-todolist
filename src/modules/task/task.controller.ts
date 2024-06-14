import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
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

  @Patch(':id')
  async updateTask(@Param('id') id: number, @Body() data: CreateTaskDto): Promise<task> {
    return this.taskService.updateTask(+id, data);
  }

}
