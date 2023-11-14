import { AppBar, Grid, Typography } from "@mui/material";
import { CartContext, CartContextType } from "contexts/cart.context";
import React from "react";

const Header: React.FC = () => {
  const { cartItems, toggleCartVisibility } = React.useContext<CartContextType>(CartContext);

  return (
    <AppBar position="sticky">
      <Grid container>
        <Grid item>
          <Typography variant='h1'>Book Store</Typography>
        </Grid>
        <Grid item>
          <Typography variant='h3' onClick={toggleCartVisibility}>My Cart ({cartItems.length})</Typography>
        </Grid>
      </Grid>
    </AppBar>
  )
}

export default Header;
