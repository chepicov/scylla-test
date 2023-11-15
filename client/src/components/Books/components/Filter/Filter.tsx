import React from 'react';
import _debounce from 'lodash.debounce';
import { Card, TextField } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { BookContext, BookContextType } from 'contexts/book.context';
import './Filter.css';

const Filter: React.FC = () => {
  const { fetchBooks } = React.useContext<BookContextType>(BookContext);
  const [query, setQuery] = React.useState<string>('nosql');

  const debouncedFetch = React.useCallback(
    _debounce((value: string) => fetchBooks(value), 500),
    [],
  );

  React.useEffect(() => {
    debouncedFetch(query);
  }, [query]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }

  return (
    <Card className='filter'>
      <TextField
        variant='standard'
        onChange={handleChange}
        value={query}
        InputProps={{
          endAdornment: <SearchIcon />
        }}
      />
    </Card>
  );
};

export default Filter;
