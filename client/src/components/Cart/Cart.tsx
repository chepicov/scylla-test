import React from "react";
import { Box, Button, Grid, Input, Typography } from "@mui/material";
import { CartContextType, CartContext } from "contexts/cart.context";

const Cart: React.FC = () => {
  const { cartItems, total, removeFromCart } = React.useContext<CartContextType>(CartContext);

  return (
    <Box>
      <Grid container>
        {cartItems.map((item) => (
          <Grid item key={item.id}>
            <Box>
              <Button variant='contained' onClick={() => removeFromCart(item.id)}>Remove</Button>
              <Typography variant='h4'>{item.title}</Typography>
              <Input type='number' value={item.quantity} />
              <Typography variant='h6'>{item.price}</Typography>
              <Button variant='contained'>Update quantity</Button>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box>
        <Typography variant='h4'>Total Price: ${total}</Typography>
      </Box>
    </Box>
  );
};

export default Cart;
