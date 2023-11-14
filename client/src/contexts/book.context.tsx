import React from 'react';
import { Book } from '../types/book';

export type BookContextType = {
  books: Book[];
}

const initialContext: BookContextType = {
  books: [],
}

export const BookContext = React.createContext<BookContextType>(initialContext);

type Props = {
  children: React.ReactNode;
}

export const BookContextProvider: React.FC<Props> = ({ children }) => {
  const [books, setBooks] = React.useState<Book[]>([]);

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:3001/books');
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <BookContext.Provider value={{ books }}>
      {children}
    </BookContext.Provider>
  );
};
