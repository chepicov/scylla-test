import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';

@Module({
  controllers: [BooksController],
  providers: [BooksService],
  imports: [HttpModule],
})
export class BooksModule {}
