import { AppBar, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import CartButton from './components/CartButton';
import './Header.css';

const Header: React.FC = () => {
  return (
    <AppBar position='sticky' className='header'>
      <Container maxWidth='lg'>
        <Grid container spacing={4} alignItems={'center'}>
          <Grid item xs={8}>
            <Typography className='header__title' component={'h1'}>Book Store</Typography>
          </Grid>
          <Grid item xs={4}>
            <CartButton />
          </Grid>
        </Grid>
      </Container>
    </AppBar>
  )
}

export default Header;
