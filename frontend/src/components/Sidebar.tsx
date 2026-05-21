import { Link, useLocation } from 'react-router-dom';
import { Home, List, Library, ShoppingBag, Gamepad2, Settings, Share2 } from 'lucide-react';

interface SidebarProps {
  isExpanded: boolean;
}

export const Sidebar = ({ isExpanded }: SidebarProps) => {
  const location = useLocation();

  const getLinkClass = (path: string) => {
    const isActive = location.pathname === path;
    return `flex items-center space-x-3 text-[15px] font-segoe-ui py-4 hover:underline decoration-2 underline-offset-8 transition-colors ${
      isExpanded ? 'px-4' : 'px-2 justify-center'
    } ${
      isActive ? 'text-lumi-green font-semibold underline' : 'text-absolute-zero'
    }`;
  };

  const iconSize = isExpanded ? 24 : 28;

  return (
    <nav className={`h-screen bg-whisper-gray flex flex-col justify-between border-r border-dark-steel rounded-none transition-all duration-300 ${isExpanded ? 'p-6 w-64' : 'py-6 px-4 w-26'}`}>
      <div>
        <div className={`flex items-center space-x-2 mb-10 text-lumi-green ${!isExpanded && 'justify-center'}`}>
          <Gamepad2 className="shrink-0" size={isExpanded ? 32 : 40} />
          {isExpanded && <h1 className="text-display font-segoeproblack font-black tracking-display leading-none">PLAY</h1>}
        </div>
        <ul className="space-y-4">
          <li>
            <Link to="/" className={getLinkClass('/')}>
              <Home className="shrink-0" size={iconSize} />
              {isExpanded && <span>Home</span>}
            </Link>
          </li>
          <li>
            <Link to="/categories" className={getLinkClass('/categories')}>
              <List className="shrink-0" size={iconSize} />
              {isExpanded && <span>Categories</span>}
            </Link>
          </li>
          <li>
            <Link to="/library" className={getLinkClass('/library')}>
              <Library className="shrink-0" size={iconSize} />
              {isExpanded && <span>My Library</span>}
            </Link>
          </li>
          <li>
            <Link to="/bag" className={getLinkClass('/bag')}>
              <ShoppingBag className="shrink-0" size={iconSize} />
              {isExpanded && <span>My Bag</span>}
            </Link>
          </li>
        </ul>
      </div>
      <div className={`flex text-absolute-zero pb-4 ${isExpanded ? 'px-4 space-x-5' : 'flex-col items-center space-y-5 px-0'}`}>
        <Gamepad2 className="cursor-pointer hover:text-lumi-green transition-colors shrink-0" size={iconSize} />
        <Settings className="cursor-pointer hover:text-lumi-green transition-colors shrink-0" size={iconSize} />
        <Share2 className="cursor-pointer hover:text-lumi-green transition-colors shrink-0" size={iconSize} />
      </div>
    </nav>
  );
};
