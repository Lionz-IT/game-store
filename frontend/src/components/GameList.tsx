import { useState, useEffect } from 'react';
import { Loader2, Heart, ShoppingBag, Star } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import type { Game } from '../context/WishlistContext';

export const GameList = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/gamesData.json');
        const data: Game[] = await response.json();
        setGames(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching games:', err);
        setError('Failed to load games. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-lumi-green">
        <Loader2 className="animate-spin mr-2" size={46} />
        <span className="text-heading font-semibold text-absolute-zero">Loading games...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-cyber-yellow border-none text-absolute-zero px-4 py-3 rounded-none relative" role="alert">
        <span className="block sm:inline font-segoe-ui">{error}</span>
      </div>
    );
  }

  return (
    <section>
        <div className="flex justify-between items-end mb-[24px]">
          <h2 className="text-heading-lg font-bold text-absolute-zero uppercase tracking-wide">GAMES ON PROMOTION</h2>
          <button className="text-dark-steel hover:text-lumi-green transition-colors text-[14px] font-semibold flex items-center">
            View More Games <span className="ml-1">→</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[20px]">
            {games.map((game) => {
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

                    <button className="absolute bottom-0 right-0 bg-lumi-green text-snowfield-white p-[10px] rounded-none hover:bg-rich-meadow transition-colors">
                      <ShoppingBag size={20} />
                    </button>
                </div>
              );
            })}
        </div>
    </section>
  );
};
