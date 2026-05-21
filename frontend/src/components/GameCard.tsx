import { Heart, ShoppingBag, Star } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import type { Game } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

interface GameCardProps {
  game: Game;
}

export const GameCard = ({ game }: GameCardProps) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const liked = isInWishlist(game._id);
  const discountPercent = Math.round(game.discount * 100);
  const salePrice = game.discount > 0
    ? (game.price * (1 - game.discount)).toFixed(2)
    : game.price.toFixed(2);

  return (
    <div key={game._id} className="bg-snowfield-white border border-whisper-gray rounded-none p-[16px] flex flex-col h-full hover:shadow-[0_0_0_2px_#107c10] transition-shadow cursor-pointer relative group">
        <div className="relative mb-[16px]">
          <img src={game.img} alt={game.title} className="h-[180px] w-full object-cover rounded-none bg-whisper-gray" />
          
          <button
            onClick={(e) => { e.stopPropagation(); toggleWishlist(game); }}
            className={`absolute top-2 right-2 drop-shadow-md transition-colors ${liked ? 'text-lumi-green' : 'text-snowfield-white hover:text-lumi-green'}`}
          >
            <Heart size={20} fill="currentColor" strokeWidth={1} />
          </button>


          <div className="absolute bottom-2 left-2 bg-electric-lime text-rich-meadow font-segoe-ui font-semibold text-caption px-[8px] py-[2px] rounded-none">
            {game.level}
          </div>

          <div className="absolute bottom-2 right-2 flex text-cyber-yellow drop-shadow-md">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} fill={i < game.rating ? 'currentColor' : 'none'} strokeWidth={i < game.rating ? 0 : 2} />
            ))}
          </div>
        </div>
        
        <h3 className="font-segoeproblack font-black text-[16px] text-absolute-zero line-clamp-1 mb-[16px] uppercase group-hover:text-lumi-green transition-colors">
          {game.title}
        </h3>
        
        <div className="mt-auto flex justify-between items-center relative">
          <div className="flex items-center space-x-3">
            {discountPercent > 0 && (
              <span className="bg-lumi-green text-snowfield-white font-bold text-caption px-[6px] py-[2px] rounded-none">
                {discountPercent}%
              </span>
            )}
            {discountPercent > 0 && (
              <span className="text-[12px] text-dark-steel line-through">${game.price.toFixed(2)}</span>
            )}
            <span className="font-bold text-heading text-absolute-zero">${salePrice}</span>
          </div>
        </div>

        <button 
          onClick={(e) => { e.stopPropagation(); addToCart(game); }}
          className="absolute bottom-0 right-0 bg-lumi-green text-snowfield-white p-[10px] rounded-none hover:bg-rich-meadow transition-colors"
        >
          <ShoppingBag size={20} />
        </button>
    </div>
  );
};
