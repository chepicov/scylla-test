import React from 'react';
import { Book } from '../types/book';

export type BookContextType = {
  books: Book[];
  fetchBooks: (query?: string) => void;
  isLoading: boolean;
}

const initialContext: BookContextType = {
  books: [],
  fetchBooks: () => {},
  isLoading: true,
}

export const BookContext = React.createContext<BookContextType>(initialContext);

type Props = {
  children: React.ReactNode;
}

export const BookContextProvider: React.FC<Props> = ({ children }) => {
  const [books, setBooks] = React.useState<Book[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const fetchBooks = async (query = 'nosql') => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:3001/books?query=${query}`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <BookContext.Provider value={{ books, fetchBooks, isLoading }}>
      {children}
    </BookContext.Provider>
  );
};
