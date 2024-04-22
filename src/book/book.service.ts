import { Injectable, Req } from '@nestjs/common';
import { books as booksModel } from '@prisma/client'
import { listBooks } from 'src/interface/list.interface';
import { Request } from 'express';
import { BookRepository } from './book.repository';
import { queryBook } from 'src/interface/query.interface';
import { CreateBookDto } from 'src/dto/create.dto';

@Injectable()
export class BookService {
    constructor(private bookRepository: BookRepository) { }

    async books(@Req() request: Request): Promise<listBooks[]> {
        let iList: listBooks[] = Array();
        const query: queryBook = {
            skip: request.query.skip != "" ? request.query.skip != undefined ? Number(request.query.skip) : 0 : 0,
            take: request.query.take != "" ? request.query.take != undefined ? Number(request.query.take) : 0 : 10,
        }
        const data: booksModel[] = await this.bookRepository.list(query);
        if (data.length > 0) {
            data.forEach((item: booksModel) => {
                iList.push({
                    id: item.id,
                    cover_uri: item.cover_uri,
                    description: item.description,
                    name: item.name,
                    published_at: item.published_at,
                    created_at: item.created_at,
                    updated_at: item.updated_at
                })
            })
        }
        return iList;
    }

    async bookStore(bookDto: CreateBookDto): Promise<booksModel> {
        const book: booksModel = {
            id: undefined,
            cover_uri: bookDto.cover_uri,
            description: bookDto.description,
            name: bookDto.name,
            published_at: Boolean(bookDto.published) ? new Date() : null,
            created_at: undefined,
            updated_at: undefined
        }

        return await this.bookRepository.createOne(book);
    }

    async showBook(id: number): Promise<booksModel> {
        const convertId: number = Number(id);
        return await this.bookRepository.findById(convertId);
    }

}
