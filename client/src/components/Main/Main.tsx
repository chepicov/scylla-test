import React from "react";
import { Container, Grid } from "@mui/material";
import Books from "components/Books";
import Cart from "components/Cart";
import { CartContextType, CartContext } from "contexts/cart.context";
import "./Main.css";

const Main: React.FC = () => {
  const { isCartVisible } = React.useContext<CartContextType>(CartContext);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item xs={isCartVisible ? 8 : 12}>
          <Books />
        </Grid>
        {isCartVisible && (
          <Grid item xs={4}>
            <Cart />
          </Grid>
        )}
      </Grid>
    </Container>
  )
};

export default Main;
