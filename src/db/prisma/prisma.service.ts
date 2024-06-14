import {
  BadRequestException,
  INestApplication,
  Injectable,
  OnModuleInit
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit(): Promise<any> {
    try {
      await this.$connect();
    } catch (error) {
      throw new BadRequestException(`Database not connect! - ${String(error.message)}`);
    }
  }
  enableShutdownHooks(app: INestApplication): void {
    this.$on('beforeExit' as never, () => {
      void app.close();
    });
  }
}
