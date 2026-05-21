import { useState, useEffect } from 'react';
import type { Game } from '../context/WishlistContext';
import { GameForm } from '../components/GameForm';
import { Trash2, Edit2, Plus } from 'lucide-react';

export const SellerPage = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetch('/api/gamesData.json')
      .then(res => res.json())
      .then(data => setGames(data));
  }, []);

  const handleDelete = (id: number) => {
    setGames(games.filter(g => g._id !== id));
  };

  const handleSave = (data: Partial<Game>) => {
    console.log('Saving game:', data);
    setIsFormOpen(false);
    setEditingGame(null);
  };

  return (
    <div className="p-12">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-black text-lumi-green">Seller Dashboard</h1>
        <button 
          onClick={() => { setEditingGame(null); setIsFormOpen(true); }}
          className="bg-lumi-green text-white px-6 py-3 rounded-full font-bold flex items-center gap-2"
        >
          <Plus size={20} /> Add Game
        </button>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <GameForm game={editingGame || undefined} onSave={handleSave} onCancel={() => setIsFormOpen(false)} />
        </div>
      )}

      <table className="w-full bg-whisper-gray p-6 rounded-3xl border-separate border-spacing-y-4">
        <thead>
          <tr className="text-dark-steel text-lg">
            <th className="pb-4 px-4">Title</th>
            <th className="pb-4 px-4">Price</th>
            <th className="pb-4 px-4">Actions</th>
          </tr>
        </thead>
        <tbody className="text-absolute-zero">
          {games.map(game => (
            <tr key={game._id} className="bg-snowfield-white rounded-xl shadow-sm">
              <td className="py-4 px-4 font-semibold">{game.title}</td>
              <td className="py-4 px-4">${game.price}</td>
              <td className="py-4 px-4 flex gap-4">
                <button onClick={() => { setEditingGame(game); setIsFormOpen(true); }} className="text-blue-500"><Edit2 size={20} /></button>
                <button onClick={() => handleDelete(game._id)} className="text-red-500"><Trash2 size={20} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
