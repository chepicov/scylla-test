import { Button } from "@mui/material";
import { CartContext, CartContextType } from "../../../../contexts/cart.context";
import React from "react";
import './CartButton.css';

const CartButton: React.FC = () => {
  const { cartItems, toggleCartVisibility } = React.useContext<CartContextType>(CartContext);

  if (!cartItems.length) {
    return null;
  }

  return (
    <Button className='cartButton' onClick={toggleCartVisibility}>My Cart ({cartItems.length})</Button>
  )
}

export default CartButton;
