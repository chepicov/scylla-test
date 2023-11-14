import React from "react";
import { Grid } from "@mui/material";
import Books from "components/Books";
import Cart from "components/Cart";
import { CartContextType, CartContext } from "contexts/cart.context";

const Main: React.FC = () => {
  const { isCartVisible } = React.useContext<CartContextType>(CartContext);

  return (
    <Grid container>
      <Grid item xs={isCartVisible ? 9 : 12}>
        <Books />
      </Grid>
      {isCartVisible && (
        <Grid item xs={3}>
          <Cart />
        </Grid>
      )}
    </Grid>
  )
};

export default Main;
