import React from 'react';
import { Grid } from '@mui/material';
import { BookContext, BookContextType } from 'contexts/book.context';
import { CartContext, CartContextType } from 'contexts/cart.context';
import Book from './components/Book';
import './Books.css';

const Books: React.FC = () => {
  const { books } = React.useContext<BookContextType>(BookContext);
  const { addToCart, cartItems } = React.useContext<CartContextType>(CartContext);

  const isDisabled = React.useCallback((id: string) => {
    return cartItems.some((item) => item.id === id);
  }, [cartItems]);

  return (
    <Grid container className='list' spacing={2}>
      {books.map((book) => (
        <Grid item key={book.id} className='list__item'>
          <Book book={book} onAdd={() => addToCart(book)} isDisabled={isDisabled(book.id)} />
        </Grid>
      ))}
    </Grid>
  )
};

export default Books;