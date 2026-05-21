import { useState, useEffect } from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { GameCard } from '../components/GameCard';
import { GameList } from '../components/GameList';
import type { Game } from '../context/WishlistContext';
import { Search, Trash2, ShoppingBag } from 'lucide-react';

export const Categories = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/gamesData.json')
      .then((res) => res.json())
      .then((data: Game[]) => setGames(data));
  }, []);

  const categories = ['ALL', 'RPG', 'MOBA', 'BATTLE', 'RACING', 'FIGHTING'];

  const filteredGames = games.filter((game) => {
    const matchesCategory = filter === 'ALL' || game.category.toUpperCase() === filter;
    const matchesSearch = game.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-whisper-gray p-6 rounded-3xl">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                filter === cat ? 'bg-lumi-green text-snowfield-white' : 'bg-snowfield-white text-dark-steel hover:bg-whisper-gray'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-64 flex items-center">
          <Search className="absolute top-1/2 -translate-y-1/2 text-dark-steel pointer-events-none" size={18} />
          <input
            type="text"
            placeholder="  Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-2 rounded-full border border-whisper-gray focus:outline-none focus:ring-2 focus:ring-lumi-green"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[20px]">
        {filteredGames.map((game) => (
          <GameCard key={game._id} game={game} />
        ))}
      </div>
    </div>
  );
};

export const AllGamesPage = () => (
  <div className="p-8">
    <GameList />
  </div>
);

export const Library = () => {
  const { wishlist } = useWishlist();
  return (
    <section className="p-8">
        <h1 className="text-display font-segoeproblack font-black text-lumi-green mb-8">MY LIBRARY</h1>
        {wishlist.length === 0 ? (
          <p className="text-heading text-dark-steel">Your wishlist is empty.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[20px]">
              {wishlist.map((game) => (
                <GameCard key={game._id} game={game} />
              ))}
          </div>
        )}
    </section>
  );
};

export const Bag = () => {
  const { cart, removeFromCart } = useCart();
  const total = cart.reduce((sum, item) => sum + (item.price * (1 - item.discount)), 0);

  return (
    <section className="p-12">
        <h1 className="text-4xl font-black text-lumi-green mb-10">My Bag</h1>
        {cart.length === 0 ? (
          <p className="text-xl text-dark-steel">Your shopping cart is currently empty.</p>
        ) : (
          <div className="bg-whisper-gray p-10 rounded-3xl shadow-lg">
            <table className="w-full text-left border-separate border-spacing-y-4">
              <thead>
                <tr className="text-dark-steel text-lg">
                  <th className="pb-6 px-4">No.</th>
                  <th className="pb-6 px-4">Preview</th>
                  <th className="pb-6 px-4">Game</th>
                  <th className="pb-6 px-4">Price</th>
                  <th className="pb-6 px-4">Discount</th>
                  <th className="pb-6 px-4">Payment</th>
                  <th className="pb-6 px-4">Remove</th>
                </tr>
              </thead>
              <tbody className="text-absolute-zero text-lg">
                {cart.map((game, index) => (
                    <tr key={game._id} className="bg-snowfield-white rounded-2xl shadow-sm">
                    <td className="py-12 px-6 font-semibold rounded-l-2xl text-xl">{index + 1}</td>
                    <td className="py-12 px-6"><img src={game.img} alt={game.title} className="w-56 h-32 object-cover rounded-xl" /></td>
                    <td className="py-12 px-6 font-semibold text-2xl">{game.title}</td>
                    <td className="py-12 px-6 text-xl">${game.price.toFixed(2)}</td>
                    <td className="py-12 px-6 text-xl">{Math.round(game.discount * 100)}%</td>
                    <td className="py-12 px-6 font-bold text-xl">${(game.price * (1 - game.discount)).toFixed(2)}</td>
                    <td className="py-12 px-6 rounded-r-2xl">

                      <button onClick={() => removeFromCart(game._id)} className="text-red-500 hover:text-red-700 p-2">
                        <Trash2 size={28} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-absolute-zero/10">
              <p className="text-2xl font-semibold">Total Items: {cart.length}</p>
              <div className="flex items-center gap-8">
                <p className="text-3xl font-bold">Total: ${total.toFixed(2)}</p>
                <button className="bg-lumi-green text-white px-10 py-4 rounded-full font-bold text-lg flex items-center gap-3 hover:bg-rich-meadow transition-colors">
                  Check out <ShoppingBag size={24} />
                </button>
              </div>
            </div>
          </div>
        )}
    </section>
  );
};
