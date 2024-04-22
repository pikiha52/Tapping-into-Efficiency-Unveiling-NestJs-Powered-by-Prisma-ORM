import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { BookService } from './book.service';
import { listBooks } from 'src/interface/list.interface';
import { CreateBookDto } from 'src/dto/create.dto';
import { books } from '@prisma/client';

@Controller('book')
export class BookController {
    constructor(private bookService: BookService) { }

    @Get("")
    async list(@Req() request: Request, @Res() response: Response) {
        const books: listBooks[] = await this.bookService.books(request);
        return response.status(HttpStatus.OK).json({
            statusCode: HttpStatus.OK,
            data: books,
            message: '',
            error: ''
        })
    }

    @Post("")
    async store(@Body() body: CreateBookDto, @Res() response: Response) {
        const book: books = await this.bookService.bookStore(body);
        return response.status(HttpStatus.CREATED).json({
            statusCode: HttpStatus.CREATED,
            data: book,
            message: "CREATED",
            error: ''
        })
    }

    @Get("/:id")
    async show(@Param("id") id: number, @Res() response: Response) {
        const book: books = await this.bookService.showBook(id)
        return response.status(HttpStatus.OK).json({
            statusCode: HttpStatus.OK,
            data: book,
            message: "OKE",
            error: ''
        })
    }
}
