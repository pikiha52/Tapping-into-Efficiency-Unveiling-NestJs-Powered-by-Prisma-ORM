import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [BookModule, PrismaModule],
  providers: [PrismaService],
})
export class AppModule {}
