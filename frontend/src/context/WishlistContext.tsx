import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export interface Game {
  _id: number;
  title: string;
  description: string;
  level: string;
  category: string;
  rating: number;
  discount: number;
  price: number;
  img: string;
  trailer: string;
  active: boolean;
}

interface WishlistContextType {
  wishlist: Game[];
  toggleWishlist: (game: Game) => void;
  isInWishlist: (id: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<Game[]>([]);

  const toggleWishlist = (game: Game) => {
    setWishlist((prev) => {
      const exists = prev.some((g) => g._id === game._id);
      if (exists) {
        return prev.filter((g) => g._id !== game._id);
      }
      return [...prev, game];
    });
  };

  const isInWishlist = (id: number) => {
    return wishlist.some((g) => g._id === id);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
