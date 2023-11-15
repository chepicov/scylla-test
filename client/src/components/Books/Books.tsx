import React from 'react';
import { CircularProgress, Grid, Typography } from '@mui/material';
import { BookContext, BookContextType } from 'contexts/book.context';
import { CartContext, CartContextType } from 'contexts/cart.context';
import Book from './components/Book';
import './Books.css';
import Filter from './components/Filter';

const Books: React.FC = () => {
  const { books, isLoading } = React.useContext<BookContextType>(BookContext);
  const { addToCart, cartItems } = React.useContext<CartContextType>(CartContext);

  const isDisabled = React.useCallback((id: string) => {
    return cartItems.some((item) => item.id === id);
  }, [cartItems]);

  return (
    <Grid container className='list' spacing={2}>
      <Grid item xs={12}>
        <Filter />
      </Grid>
      {isLoading && (
        <Grid item xs={12}>
          <CircularProgress />
        </Grid>
      )}
      {!isLoading && books.length === 0 && (
        <Grid item xs={12}>
          <Typography component='h2'>No books found</Typography>
        </Grid>
      )}
      {books.map((book) => (
        <Grid item key={book.id} className='list__item'>
          <Book book={book} onAdd={() => addToCart(book)} isDisabled={isDisabled(book.id)} />
        </Grid>
      ))}
    </Grid>
  )
};

export default Books;