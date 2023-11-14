import React from 'react';
import { Book } from '../types/book';
import { CartItem } from '../types/cart';

export type CartContextType = {
  cartItems: CartItem[];
  isCartVisible: boolean;
  toggleCartVisibility: () => void;
  addToCart: (book: Book) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  total: number;
}

const initialContext: CartContextType = {
  cartItems: [],
  isCartVisible: false,
  toggleCartVisibility: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  total: 0,
}

export const CartContext = React.createContext<CartContextType>(initialContext);

type Props = {
  children: React.ReactNode;
}

export const CartContextProvider: React.FC<Props> = ({ children }) => {
  const [isCartVisible, setIsCartVisible] = React.useState<boolean>(false);
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  }

  const total = React.useMemo(() => {
    return cartItems.reduce((acc, item) => {
      if (!item.price) return acc;
      return acc + (item.price * item.quantity);
    }, 0);
  }, [cartItems]);

  const addToCart = (book: Book) => {
    if (cartItems.findIndex((item) => item.id === book.id) !== -1) {
      return;
    }
    const newItem = { id: book.id, quantity: 1, title: book.title, price: book.price };
    setCartItems((prev) => [...prev, newItem]);
  }

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems((prev) => prev.map((item) => {
      if (item.id === id) {
        return { ...item, quantity };
      }
      return item;
    }));
  }

  return (
    <CartContext.Provider value={{ cartItems, isCartVisible, toggleCartVisibility, total, addToCart, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
