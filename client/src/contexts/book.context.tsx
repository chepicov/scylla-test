import React from 'react';
import { Book } from '../types/book';

export type BookContextType = {
  books: Book[];
  updateFilter: (filter: { query: string }) => void;
  isLoading: boolean;
}

const initialContext: BookContextType = {
  books: [],
  updateFilter: () => {},
  isLoading: true,
}

export const BookContext = React.createContext<BookContextType>(initialContext);

type Props = {
  children: React.ReactNode;
}

interface Filter {
  query: string;
}

export const BookContextProvider: React.FC<Props> = ({ children }) => {
  const [filter, setFilter] = React.useState<Filter>({ query: 'nosql' })
  const [books, setBooks] = React.useState<Book[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const fetchBooks = React.useCallback(async ({ query }: Filter) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env['REACT_APP_API_URL']}/books?query=${query}`);
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
  }, []);

  const updateFilter = (newFilter: Partial<Filter>) => {
    setFilter({ ...filter, ...newFilter });
  }

  React.useEffect(() => {
    fetchBooks(filter);
  }, [filter, fetchBooks]);

  return (
    <BookContext.Provider value={{ books, updateFilter, isLoading }}>
      {children}
    </BookContext.Provider>
  );
};
