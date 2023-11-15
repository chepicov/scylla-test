import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BooksService {
  constructor(private readonly httpService: HttpService) {}

  async findAll({ query }: { query: string }) {
    try {
      const search = query ? query : 'nosql';
      const response = await this.httpService.axiosRef.get(
        `https://www.googleapis.com/books/v1/volumes?q=${search}&maxAllowedMaturityRating=not-mature`,
      );
      const { items } = response.data;

      const result = await Promise.all(
        items.map(async (item) => {
          const isbn = item.volumeInfo.industryIdentifiers?.[0]?.identifier;
          const olVersion = isbn ? await this.getOLRevision(isbn) : undefined;
          return {
            id: item.id,
            title: item.volumeInfo.title,
            description: item.volumeInfo.description,
            thumbnail: item.volumeInfo.imageLinks?.thumbnail,
            pageNumber: item.volumeInfo.pageCount,
            price: item.saleInfo.listPrice?.amount,
            olVersion,
          };
        }),
      );
      return result;
    } catch (error) {
      console.log('Error in BooksService.findAll:', error.message);
      return [];
    }
  }

  async getOLRevision(isbn: string) {
    try {
      const response = await this.httpService.axiosRef.get(
        `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=details&format=json`,
      );
      const details = (Object.values(response.data)[0] as any)?.details;
      const olVersion = details?.latest_revision;
      return olVersion;
    } catch (error) {
      return undefined;
    }
  }
}
