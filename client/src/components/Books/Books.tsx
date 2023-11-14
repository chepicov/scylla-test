import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { BookContext, BookContextType } from 'contexts/book.context';
import placeholder from 'assets/placeholder.png';
import { CartContext, CartContextType } from 'contexts/cart.context';
import './Books.css';

const Books: React.FC = () => {
  const { books } = React.useContext<BookContextType>(BookContext);
  const { addToCart } = React.useContext<CartContextType>(CartContext);

  return (
    <Grid container className='list'>
      {books.map((book) => (
        <Grid item key={book.id} className='list__item'>
          <Grid container className='item'>
            <Grid item xs={4}>
              <img className='item__image' src={book.thumbnail || placeholder} alt={book.title} />
            </Grid>
            <Grid item xs={8}>
              <Box>
                <Typography variant='h4'>{book.title}</Typography>
                <Typography variant='body1'>{book.description}</Typography>
                {!!book.pageNumber && (<Typography variant='body1'>Pages: {book.pageNumber}</Typography>)}
                {!!book.price && (<Typography variant='body1'>Price: {book.price}</Typography>)}
                <Button variant='contained' onClick={() => addToCart(book)}>Add to Cart</Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  )
};

export default Books;