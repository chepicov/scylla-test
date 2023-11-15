import React from 'react';
import Header from './components/Header';
import Main from './components/Main';
import { BookContextProvider } from './contexts/book.context';
import { CartContextProvider } from './contexts/cart.context';

const App: React.FC = () => {
  return (
    <BookContextProvider>
      <CartContextProvider>
        <Header />
        <Main />
      </CartContextProvider>
    </BookContextProvider>
  );
}

export default App;
