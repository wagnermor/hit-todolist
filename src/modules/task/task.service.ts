import { BadRequestException, Injectable } from '@nestjs/common';
import { task } from '@prisma/client';
import { PrismaService } from 'src/db/prisma/prisma.service';
import { getUpdatedKeys } from '../../helpers/fieldChange';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) { }

  async createTask(data: CreateTaskDto): Promise<task> {
    try {
      const { ...dto } = data
      const task = await this.prisma.task.create({
        data: {
          task_name: dto.taskName,
          task_description: dto.taskDescription,
          task_author: dto.taskAuthor,
          task_categori: dto.taskCategori,
          task_tag: dto.taskTag,
          task_created_at: new Date(),
          task_is_done: false,
        }
      });

      const newTask = JSON.stringify({
        task_name: task.task_name,
        task_description: task.task_description,
        task_author: task.task_author,
        task_categori: task.task_categori,
        task_tag: task.task_tag,
        task_created_at: task.task_created_at,
        task_is_done: task.task_is_done,
      })

      await this.prisma.task_log.create({
        data: {
          task_id: task.task_id,
          task_log_action: 'CREATE',
          task_log_field_name: 'ALL',
          task_log_new_value: JSON.parse(newTask),
        }
      });

      return task;
    } catch (error) {
      throw new BadRequestException(`Not possible to create task: ${error}`);
    }
  }

  async updateById(id: number, data: UpdateTaskDto): Promise<task> {
    try {
      const { ...dto } = data
      if (Number.isNaN(id)) throw new BadRequestException('Id is not a number');

      const task = await this.prisma.task.findUnique({
        where: { task_id: Number(id) }
      });

      if (!task) {
        throw new BadRequestException('Task not found');
      }
      const oldTask = {
        task_name: task.task_name,
        task_description: task.task_description,
        task_author: task.task_author,
        task_categori: task.task_categori,
        task_tag: task.task_tag,
        task_created_at: task.task_created_at,
        task_is_done: task.task_is_done,
      }
      console.log('**************** oldTask ****************');
      console.log(JSON.stringify(oldTask));



      await this.prisma.task.update({
        where: { task_id: id },
        data: {
          task_name: dto.taskName,
          task_description: dto.taskDescription,
          task_author: dto.taskAuthor,
          task_categori: dto.taskCategori,
          task_tag: dto.taskTag,
          task_update_at: new Date(),
          task_is_done: false,
        }
      });
      const taskUpdated = await this.prisma.task.findUnique({
        where: { task_id: id }
      });
      const newTask = {
        task_name: taskUpdated.task_name,
        task_description: taskUpdated.task_description,
        task_author: taskUpdated.task_author,
        task_categori: taskUpdated.task_categori,
        task_tag: taskUpdated.task_tag,
        task_created_at: taskUpdated.task_created_at,
        task_is_done: taskUpdated.task_is_done,
      }
      console.log('**************** newTask ****************');
      console.log(JSON.stringify(newTask));
      console.log('**************** taskUpdated ****************');
      const b = String([getUpdatedKeys(oldTask, newTask)]);
      console.log(() => b);
      console.log(String([getUpdatedKeys(oldTask, newTask)]));



      await this.prisma.task_log.create({
        data: {
          task_id: task.task_id,
          task_log_action: 'UPDATE',
          task_log_field_name: String([getUpdatedKeys(oldTask, newTask)]),
          task_log_old_value: JSON.stringify(oldTask),
          task_log_new_value: JSON.stringify(newTask),
        }
      })
      return taskUpdated;
    } catch (error) {
      throw new BadRequestException(`Not possible to update task: ${error}`);
    }
  }

  async deleteTask(id: number): Promise<task> {
    try {
      if (Number.isNaN(id)) throw new BadRequestException('Id is not a number');
      const task = await this.prisma.task.findUnique({
        where: { task_id: id }
      });
      if (!task) {
        throw new BadRequestException('Task not found');
      }
      const oldTask = JSON.stringify({
        task_name: task.task_name,
        task_description: task.task_description,
        task_author: task.task_author,
        task_categori: task.task_categori,
        task_tag: task.task_tag,
        task_created_at: task.task_created_at,
        task_is_done: task.task_is_done,
      })
      await this.prisma.task_log.create({
        data: {
          task_id: task.task_id,
          task_log_action: 'UPDATE',
          task_log_field_name: 'ALL',
          task_log_old_value: JSON.parse(oldTask),
        }
      })
      return this.prisma.task.delete({
        where: { task_id: id }
      });
    } catch (error) {
      throw new BadRequestException(`Not possible to delete task: ${error}`);
    }
  }

  async getAllTask(): Promise<task[]> {
    try {
      return this.prisma.task.findMany();
    } catch (error) {
      throw new BadRequestException(`Not possible to get all tasks: ${error}`);
    }
  }

  async taskIsDone(id: number): Promise<task> {
    try {
      if (Number.isNaN(id)) throw new BadRequestException('Id is not a number');
      const task = await this.prisma.task.findUnique({
        where: { task_id: id }
      });
      if (!task) {
        throw new BadRequestException('Task not found');
      }
      if (task.task_is_done) {
        throw new BadRequestException('Task is already done');
      }
      return this.prisma.task.update({
        where: { task_id: id },
        data: {
          task_is_done: true,
          task_update_at: new Date()
        }
      });
    } catch (error) {
      throw new BadRequestException(`Not possible to update status task: ${error}`);
    }
  }

}

