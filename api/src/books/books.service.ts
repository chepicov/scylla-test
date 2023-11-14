import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BooksService {
  constructor(private readonly httpService: HttpService) {}

  async findAll() {
    try {
      const response = await this.httpService.axiosRef.get(
        'https://www.googleapis.com/books/v1/volumes?q=nosql',
      );
      const result = response.data.items.map((item) => {
        return {
          id: item.id,
          title: item.volumeInfo.title,
          authors: item.volumeInfo.authors,
          description: item.volumeInfo.description,
          thumbnail: item.volumeInfo.imageLinks?.thumbnail,
          pageNumber: item.volumeInfo.pageCount,
          price: item.saleInfo.listPrice?.amount,
        };
      });
      return result;
    } catch (error) {
      console.error(error);
    }
  }
}
