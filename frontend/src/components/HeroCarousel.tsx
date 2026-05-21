import { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import type { Game } from '../context/WishlistContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

export const HeroCarousel = () => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch('/api/gamesData.json')
      .then((res) => res.json())
      .then((data: Game[]) => setGames(data));
  }, []);

  if (games.length === 0) return null;

  return (
    <section className="mb-[48px] relative h-[450px] w-full">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        initialSlide={2}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2,
          slideShadows: true,
        }}
        navigation={true}
        modules={[EffectCoverflow, Navigation, Autoplay]}
        className="w-full h-full pb-[30px]"
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        {games.map((game) => (
          <SwiperSlide key={game._id} className="w-[60%] h-[350px]">
            {({ isActive }) => (
              <div
                className="w-full h-full bg-cover bg-center rounded-none relative shadow-2xl transition-all duration-300"
                style={{ backgroundImage: `url('${game.img}')` }}
              >
                {!isActive && <div className="absolute inset-0 bg-black/50 rounded-none transition-opacity duration-300"></div>}
                
                <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                  <h2 className="text-display font-semibold text-snowfield-white tracking-display mb-2 drop-shadow-lg">
                    {game.title}
                  </h2>
                  <p className="text-[16px] font-normal text-snowfield-white mb-6 drop-shadow-md max-w-lg line-clamp-2">
                    {game.description}
                  </p>
                  <div className="flex gap-4">
                    <button className="bg-electric-lime text-rich-meadow font-segoeproblack font-black text-[15px] py-[8px] px-[24px] rounded-none hover:bg-lumi-green hover:text-snowfield-white transition-colors flex items-center gap-2">
                      ORDER NOW
                    </button>
                    <a
                      href={game.trailer}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-black/50 text-snowfield-white p-3 rounded-full hover:bg-lumi-green transition-colors border border-snowfield-white/30"
                    >
                      <Play size={20} fill="currentColor" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
