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

  React.useEffect(() => {
    const items = localStorage.getItem('cartItems');
    if (items) {
      const parsedItems = JSON.parse(items);
      setCartItems(parsedItems);
      setIsCartVisible(parsedItems.length > 0);
    }
  }, []);

  const updateStorage = React.useCallback((items: CartItem[]) => {
    localStorage.setItem('cartItems', JSON.stringify(items));
  }, []);

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
    if (cartItems.length === 0) {
      setIsCartVisible(true);
    }
    const newItem = { id: book.id, quantity: 1, title: book.title, price: book.price };
    const newCartItems = [...cartItems, newItem];
    setCartItems(newCartItems);
    updateStorage(newCartItems);
  }

  const removeFromCart = (id: string) => {
    if (cartItems.length === 1) {
      setIsCartVisible(false);
    }
    const newCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(newCartItems);
    updateStorage(newCartItems);
  }

  const updateQuantity = (id: string, quantity: number) => {
    const newCartItems = cartItems.map((item) => {
      if (item.id === id) {
        return { ...item, quantity };
      }
      return item;
    });
    setCartItems(newCartItems);
    updateStorage(newCartItems);
  }

  return (
    <CartContext.Provider value={{ cartItems, isCartVisible, toggleCartVisibility, total, addToCart, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
