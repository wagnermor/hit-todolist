import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsNotEmpty, IsString, MaxLength } from "class-validator";

export enum task_task_categori {
  WORK = 'WORK',
  STUDY = 'STUDY',
  PERSONAL = 'PERSONAL',
  OTHER = 'OTHER',
}

export enum task_task_tag {
  URGENT = 'URGENT',
  IMPORTANT = 'IMPORTANT',
  OPTIONAL = 'OPTIONAL',
}

export class CreateTaskDto {
  @ApiProperty({
    name: 'taskName',
    description: 'Task name',
    example: 'Runner',
    type: String,
    required: true
  })
  @IsNotEmpty({ message: 'Task name is required' })
  @IsString()
  @MaxLength(100)
  taskName: string;

  @ApiProperty({
    name: 'taskDescription',
    description: 'Task description',
    example: 'Runner every morning',
    type: String,
    required: true
  })
  @IsNotEmpty({ message: 'Task description is required' })
  @IsString()
  @MaxLength(255)
  taskDescription: string;

  @ApiProperty({
    name: 'taskAuthor',
    description: 'Task author',
    example: 'Manoel Tesla',
    type: String,
    required: true
  })
  @IsNotEmpty({ message: 'Task author is required' })
  @IsString()
  @MaxLength(36)
  taskAuthor: string;

  @ApiProperty({
    name: 'taskCategori',
    description: 'Task Tag\n' +
      'DOMAIN:\n' +
      '- WORK\n' +
      '- STUDY\n' +
      '- PERSONAL\n' +
      '- OHTER\n',
    example: 'WORK',
    required: true
  })
  @IsNotEmpty({ message: 'Task categori is required' })
  @IsEnum(task_task_categori)
  taskCategori: task_task_categori;

  @ApiProperty({
    name: 'taskTag',
    description: 'Task Categori\n' +
      'DOMAIN:\n' +
      '- URGENT\n' +
      '- IMPORTANT\n' +
      '- OPTIONAL\n',
    example: 'IMPORTANT',
    required: true
  })
  @IsNotEmpty({ message: 'Task tag is required' })
  @IsEnum(task_task_tag)
  taskTag: task_task_tag;

  @ApiProperty({
    name: 'taskIsDone',
    description: 'Task is done',
    example: 'true',
    type: Boolean,
    required: true
  })
  @IsNotEmpty({ message: 'Task is done is required' })
  @IsBoolean()
  taskIsDone: boolean;
}



