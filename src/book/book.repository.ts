import { Injectable } from "@nestjs/common";
import { books } from "@prisma/client";
import { queryBook } from "src/interface/query.interface";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class BookRepository {
    constructor(private prismaService: PrismaService) { }

    async list(queryBook: queryBook): Promise<books[]> {
        const data: books[] = await this.prismaService.books.findMany(queryBook);
        return data;
    }

    async createOne(book: books): Promise<books> {
        const data: books = await this.prismaService.books.create({
            data: book
        });

        return data;
    }

    async findById(id: number): Promise<books> {
        return await this.prismaService.books.findUnique({ where: { id: id } })
    }
}