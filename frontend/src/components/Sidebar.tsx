import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, List, Library, ShoppingBag, Gamepad2, Settings, Share2 } from 'lucide-react';

export const Sidebar = () => {
  const location = useLocation();

  const getLinkClass = (path: string) => {
    const isActive = location.pathname === path;
    return `flex items-center space-x-3 text-[15px] font-segoe-ui px-4 py-4 hover:underline decoration-2 underline-offset-8 transition-colors ${
      isActive ? 'text-lumi-green font-semibold underline' : 'text-absolute-zero'
    }`;
  };

  return (
    <nav className="w-64 h-screen bg-whisper-gray p-6 flex flex-col justify-between border-r border-dark-steel rounded-none">
      <div>
        <div className="flex items-center space-x-2 mb-10 text-lumi-green">
          <Gamepad2 size={32} />
          <h1 className="text-display font-segoeproblack font-black tracking-display leading-none">PLAY</h1>
        </div>
        <ul className="space-y-2">
          <li>
            <Link to="/" className={getLinkClass('/')}>
              <Home size={20} />
              <span>Games</span>
            </Link>
          </li>
          <li>
            <Link to="/categories" className={getLinkClass('/categories')}>
              <List size={20} />
              <span>Categories</span>
            </Link>
          </li>
          <li>
            <Link to="/library" className={getLinkClass('/library')}>
              <Library size={20} />
              <span>My Library</span>
            </Link>
          </li>
          <li>
            <Link to="/bag" className={getLinkClass('/bag')}>
              <ShoppingBag size={20} />
              <span>My Bag</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex space-x-5 text-absolute-zero px-4 pb-4">
        <Gamepad2 className="cursor-pointer hover:text-lumi-green transition-colors" size={20} />
        <Settings className="cursor-pointer hover:text-lumi-green transition-colors" size={20} />
        <Share2 className="cursor-pointer hover:text-lumi-green transition-colors" size={20} />
      </div>
    </nav>
  );
};
