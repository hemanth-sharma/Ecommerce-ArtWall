import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItemCount, setWishlistItemCount] = useState(() => {
    const savedCount = localStorage.getItem('wishlistItemCount');
    return savedCount ? parseInt(savedCount, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem('wishlistItemCount', wishlistItemCount);
  }, [wishlistItemCount]);

  return (
    <WishlistContext.Provider value={{ wishlistItemCount, setWishlistItemCount }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
