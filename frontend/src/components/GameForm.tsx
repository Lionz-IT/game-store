import { useState } from 'react';
import type { Game } from '../context/WishlistContext';

interface GameFormProps {
  game?: Game;
  onSave: (data: Partial<Game>) => void;
  onCancel: () => void;
}

export const GameForm = ({ game, onSave, onCancel }: GameFormProps) => {
  const [formData, setFormData] = useState<Partial<Game>>(game || {
    title: '',
    description: '',
    price: 0,
    category: '',
    img: '',
    rating: 0,
    discount: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-3xl shadow-lg space-y-4">
      <input type="text" placeholder="Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-2 border rounded" required />
      <textarea placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-2 border rounded" />
      <input type="number" placeholder="Price" value={formData.price} onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})} className="w-full p-2 border rounded" required />
      <input type="text" placeholder="Category" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full p-2 border rounded" required />
      <input type="text" placeholder="Image URL" value={formData.img} onChange={e => setFormData({...formData, img: e.target.value})} className="w-full p-2 border rounded" />
      <div className="flex gap-4">
        <button type="submit" className="bg-lumi-green text-white px-6 py-2 rounded-full font-bold">Save</button>
        <button type="button" onClick={onCancel} className="bg-gray-200 px-6 py-2 rounded-full">Cancel</button>
      </div>
    </form>
  );
};
