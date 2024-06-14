import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidUnknownValues: false }),
  );

  const config = new DocumentBuilder()
    .setTitle('Aplicação de Gestão de Tarefas')
    .setDescription('Desafio de programação para vaga de desenvolvedor backend na empresa Hint')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const PORT = process.env.PORT ?? 13624;
  await app.listen(PORT, '0.0.0.0');
  console.log(`[🤖]: Application is running on: ${await app.getUrl()}`);
  console.log(`[🚀]: Swagger application is running on: ${await app.getUrl()}/docs`);
}
bootstrap().catch(err => console.error(err));
