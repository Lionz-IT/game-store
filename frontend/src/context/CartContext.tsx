import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Game } from './WishlistContext';

interface CartContextType {
  cart: Game[];
  addToCart: (game: Game) => void;
  removeFromCart: (id: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Game[]>([]);

  const addToCart = (game: Game) => {
    setCart((prev) => {
      // Periksa apakah game sudah ada di keranjang
      const exists = prev.some((item) => item._id === game._id);
      if (exists) {
        return prev;
      }
      return [...prev, game];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
