import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Game } from '../context/WishlistContext';
import { GameCard } from './GameCard';

interface GameListProps {
  limit?: number;
}

export const GameList = ({ limit }: GameListProps) => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const displayedGames = limit ? games.slice(0, limit) : games;

  return (
    <section>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-[24px] gap-2">
          <h2 className="text-2xl sm:text-heading-lg font-bold text-absolute-zero uppercase tracking-wide">
            {limit ? 'GAMES ON PROMOTION' : 'ALL GAMES'}
          </h2>
          {limit && (
            <Link to="/games" className="text-dark-steel hover:text-lumi-green transition-colors text-[14px] font-semibold flex items-center">
              View More Games <span className="ml-1">→</span>
            </Link>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-[20px]">
            {displayedGames.map((game) => (
              <GameCard key={game._id} game={game} />
            ))}
        </div>
    </section>
  );
};
