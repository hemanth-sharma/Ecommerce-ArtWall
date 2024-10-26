import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItemCount, setCartItemCount] = useState(() => {
    // Retrieve initial count from localStorage
    const savedCount = localStorage.getItem('cartItemCount');
    return savedCount ? parseInt(savedCount, 10) : 0;
  });

  useEffect(() => {
    // Store cart item count in localStorage whenever it changes
    localStorage.setItem('cartItemCount', cartItemCount);
  }, [cartItemCount]);

  return (
    <CartContext.Provider value={{ cartItemCount, setCartItemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
