import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { GameList } from './components/GameList';
import { HeroCarousel } from './components/HeroCarousel';
import { Categories, Library, Bag } from './pages';
import { User, SlidersHorizontal, Heart, ShoppingBag } from 'lucide-react';

const HomePage = () => (
  <>
    <HeroCarousel />
    <GameList />
  </>
);

const App = () => {
  return (
    <Router>
      <div className="flex bg-snowfield-white min-h-screen text-absolute-zero font-segoe-ui">
        <Sidebar />
        <main className="flex-1 p-8 h-screen overflow-y-auto overflow-x-hidden">
          <header className="flex justify-between items-center mb-8 text-absolute-zero border-b border-whisper-gray pb-4">
              <div>
                <SlidersHorizontal className="cursor-pointer hover:text-lumi-green transition-colors" size={24} />
              </div>
              <div className="flex items-center space-x-6">
                <div className="relative cursor-pointer hover:text-lumi-green transition-colors">
                  <Heart size={24} />
                  <span className="absolute -top-2 -right-2 bg-lumi-green text-snowfield-white text-[10px] font-bold px-[5px] py-[1px] rounded-none">0</span>
                </div>
                <div className="relative cursor-pointer hover:text-lumi-green transition-colors">
                  <ShoppingBag size={24} />
                  <span className="absolute -top-2 -right-2 bg-lumi-green text-snowfield-white text-[10px] font-bold px-[5px] py-[1px] rounded-none">0</span>
                </div>
                <div className="flex items-center space-x-3 border-l border-whisper-gray pl-6 cursor-pointer">
                  <div className="bg-cyber-yellow p-1 rounded-none">
                    <User size={20} className="text-absolute-zero" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-[13px] leading-tight">User Name</span>
                    <span className="text-[11px] text-dark-steel">View Profile</span>
                  </div>
                </div>
              </div>
          </header>

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/library" element={<Library />} />
            <Route path="/bag" element={<Bag />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
