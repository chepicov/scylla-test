import { Injectable } from '@nestjs/common';

@Injectable()
export class BooksService {
  findAll() {
    return `This action returns all books`;
  }
}
