import React from 'react';
import { Box, Button, Card, Grid, Typography } from '@mui/material';
import placeholder from 'assets/placeholder.png';
import { Book } from 'types/book';
import { formatCurrency } from 'utils/currency';
import './Book.css';

interface Props {
  book: Book;
  onAdd: () => void;
  isDisabled: boolean;
}

const BookComponent: React.FC<Props> = ({ book, onAdd, isDisabled }) => {
  return (
    <Card className='book'>
      <Grid container className='book__wrapper'>
        <Grid item xs={4} className='book__imageWrapper'>
          <img className='book__image' src={book.thumbnail || placeholder} alt={book.title} />
        </Grid>
        <Grid item xs={8}>
          <Box className='book__info'>
            <Typography className='book__title'>{book.title}</Typography>
            <Typography className='book__description'>{book.description}</Typography>
            {!!book.pageNumber && (
              <Typography className='book__page'>Pages: {book.pageNumber}</Typography>
            )}
            {!!book.price && (
              <Typography className='book__price'>Price: {formatCurrency(book.price)}</Typography>
            )}
            <Button className='book_button' variant='contained' disabled={isDisabled} onClick={onAdd}>Add to Cart</Button>
          </Box>
        </Grid>
      </Grid>
    </Card>
  )
};

export default BookComponent;
