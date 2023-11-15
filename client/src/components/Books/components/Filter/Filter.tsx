import React from 'react';
import _debounce from 'lodash.debounce';
import { Card, TextField } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { BookContext, BookContextType } from 'contexts/book.context';
import './Filter.css';

const Filter: React.FC = () => {
  const { updateFilter } = React.useContext<BookContextType>(BookContext);
  const [query, setQuery] = React.useState<string>('');

  const debouncedUpdate = React.useMemo(() =>
    _debounce((value: string) => updateFilter({ query: value }), 500),
    [updateFilter],
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setQuery(newValue);
    debouncedUpdate(newValue);
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
