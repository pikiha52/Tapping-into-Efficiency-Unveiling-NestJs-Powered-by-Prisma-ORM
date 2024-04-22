import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookRepository } from './book.repository';

@Module({
  controllers: [BookController],
  providers: [BookService, BookRepository,  PrismaService],
})
export class BookModule {}
