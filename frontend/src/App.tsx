import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { GameList } from './components/GameList';
import { HeroCarousel } from './components/HeroCarousel';
import { Categories, Library, Bag, AllGamesPage } from './pages';
import { SellerPage } from './pages/SellerPage';
import { User, SlidersHorizontal, Heart, ShoppingBag, Store } from 'lucide-react';
import { WishlistProvider, useWishlist } from './context/WishlistContext';
import { CartProvider, useCart } from './context/CartContext';

const HomePage = () => (
  <>
    <HeroCarousel />
    <GameList limit={4} />
  </>
);

const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const { wishlist } = useWishlist();
  const { cart } = useCart();
  const location = useLocation();
  const isSellerView = location.pathname === '/seller';

  return (
    <header className="flex justify-between items-center mb-8 text-absolute-zero border-b border-whisper-gray pb-4">
        <div>
          <SlidersHorizontal 
            className="cursor-pointer hover:text-lumi-green transition-colors" 
            size={24} 
            onClick={toggleSidebar}
          />
        </div>
        <div className="flex items-center space-x-6">
          {!isSellerView && (
            <>
              <Link to="/library" className="relative cursor-pointer hover:text-lumi-green transition-colors">
                <Heart size={24} />
                <span className="absolute -top-2 -right-2 bg-lumi-green text-snowfield-white text-[10px] font-bold px-[5px] py-[1px] rounded-none">{wishlist.length}</span>
              </Link>
              <Link to="/bag" className="relative cursor-pointer hover:text-lumi-green transition-colors">
                <ShoppingBag size={24} />
                <span className="absolute -top-2 -right-2 bg-lumi-green text-snowfield-white text-[10px] font-bold px-[5px] py-[1px] rounded-none">{cart.length}</span>
              </Link>
            </>
          )}
          <div className="flex items-center space-x-3 border-l border-whisper-gray pl-6">
            <div className="bg-cyber-yellow p-2 rounded-full">
              <User size={20} className="text-absolute-zero" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-[13px] leading-tight">Demo User</span>
              {isSellerView ? (
                <Link to="/" className="text-[11px] text-lumi-green hover:underline font-bold flex items-center gap-1 mt-1">
                  Switch to Buyer
                </Link>
              ) : (
                <Link to="/seller" className="text-[11px] text-blue-600 hover:underline font-bold flex items-center gap-1 mt-1">
                  <Store size={12} /> Switch to Seller
                </Link>
              )}
            </div>
          </div>
        </div>
    </header>
  );
};

const App = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  return (
    <Router>
      <WishlistProvider>
        <CartProvider>
          <div className="flex bg-snowfield-white min-h-screen text-absolute-zero font-segoe-ui">
            <Sidebar isExpanded={isSidebarExpanded} />
            <main className="flex-1 p-8 h-screen overflow-y-auto overflow-x-hidden">
              <Header toggleSidebar={() => setIsSidebarExpanded(!isSidebarExpanded)} />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/games" element={<AllGamesPage />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/library" element={<Library />} />
                <Route path="/bag" element={<Bag />} />
                <Route path="/seller" element={<SellerPage />} />
              </Routes>
            </main>
          </div>
        </CartProvider>
      </WishlistProvider>
    </Router>
  );
};

export default App;
