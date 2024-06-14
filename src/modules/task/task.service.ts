import { BadRequestException, Injectable } from '@nestjs/common';
import { task } from '@prisma/client';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) { }

  async createTask(data: CreateTaskDto): Promise<task> {
    try {
      const { ...dto } = data
      return this.prisma.task.create({
        data: {
          task_name: dto.taskName,
          task_description: dto.taskDescription,
          task_author: dto.taskAuthor,
          task_categori: dto.taskCategori,
          task_tag: dto.taskTag,
          task_created_at: new Date(),
          task_is_done: dto.taskIsDone,
        }
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

}
