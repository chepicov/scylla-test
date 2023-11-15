import React from "react";
import { Box, Card, Grid, Typography } from "@mui/material";
import { CartContextType, CartContext } from "contexts/cart.context";
import { formatCurrency } from "utils/currency";
import CartItemComponent from "./components/CartItem";
import "./Cart.css";

const Cart: React.FC = () => {
  const { cartItems, total, removeFromCart, updateQuantity } = React.useContext<CartContextType>(CartContext);

  return (
    <Box className='cart'>
      <Grid container spacing={2} className='cart__list'>
        {cartItems.map((item) => (
          <Grid item key={item.id} width={'100%'}>
            <CartItemComponent item={item} removeFromCart={removeFromCart} onUpdateQuantity={updateQuantity} />
          </Grid>
        ))}
      </Grid>
      <Card>
        <Typography className='cart__total'>Total Price: {formatCurrency(total)}</Typography>
      </Card>
    </Box>
  );
};

export default Cart;
