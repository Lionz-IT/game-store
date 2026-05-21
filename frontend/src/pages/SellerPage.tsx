import { useState, useEffect } from 'react';
import type { Game } from '../context/WishlistContext';
import { GameForm } from '../components/GameForm';
import { Trash2, Edit2, Plus } from 'lucide-react';

const API_URL = 'https://game-store-backend.onrender.com';

export const SellerPage = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const fetchGames = async () => {
    const res = await fetch(`${API_URL}/api/games`);
    const data = await res.json();
    setGames(data.data); // Backend returns paginated data, so access .data
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure?')) return;
    await fetch(`${API_URL}/api/games/${id}`, { method: 'DELETE' });
    setGames(games.filter(g => g._id !== id));
  };

  const handleSave = async (data: Partial<Game>) => {
    const method = editingGame ? 'PUT' : 'POST';
    const url = editingGame ? `${API_URL}/api/games/${editingGame._id}` : `${API_URL}/api/games`;
    
    // Map 'img' to 'image_url' as expected by backend
    const payload = {
        title: data.title,
        description: data.description,
        price: data.price,
        category: data.category,
        image_url: data.img,
        rating: data.rating
    };

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    setIsFormOpen(false);
    setEditingGame(null);
    fetchGames(); // Refresh list
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
