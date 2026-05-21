import { useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import type { Game } from '../context/WishlistContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

export const HeroCarousel = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [playingId, setPlayingId] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/gamesData.json')
      .then((res) => res.json())
      .then((data: Game[]) => setGames(data));
  }, []);

  if (games.length === 0) return null;

  return (
    <section className="mb-[48px] relative h-[400px] w-full overflow-hidden">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 30 }
        }}
        initialSlide={1}
        loop={true}
        loopAdditionalSlides={2}
        coverflowEffect={{
          rotate: 20,
          stretch: 0,
          depth: 150,
          modifier: 1,
          slideShadows: true,
        }}
        navigation={true}
        modules={[EffectCoverflow, Navigation, Autoplay]}
        className="w-full h-full pb-[20px] pt-[20px]"
        autoplay={playingId === null ? { delay: 3000, disableOnInteraction: false, waitForTransition: true } : false}
      >
        {games.map((game) => (
          <SwiperSlide key={game._id} className="h-full">
            {({ isActive }: { isActive: boolean }) => (
              <div
                className={`w-full h-full bg-cover bg-center rounded-3xl relative shadow-2xl transition-all duration-300 overflow-hidden ${isActive ? 'scale-100' : 'scale-90 opacity-60'}`}
                style={{ backgroundImage: `url('${game.img}')` }}
              >
                {!isActive && <div className="absolute inset-0 bg-black/50 rounded-3xl transition-opacity duration-300"></div>}
                
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                  <h2 className="text-display font-semibold text-snowfield-white tracking-display mb-2 drop-shadow-lg">
                    {game.title}
                  </h2>
                  <p className="text-[14px] font-normal text-snowfield-white mb-4 drop-shadow-md max-w-lg line-clamp-2">
                    {game.description}
                  </p>
                  <div className="flex gap-4">
                    <button className="bg-electric-lime text-rich-meadow font-segoeproblack font-black text-[14px] py-[6px] px-[20px] rounded-full hover:bg-lumi-green hover:text-snowfield-white transition-colors flex items-center gap-2">
                      ORDER NOW
                    </button>
                    <button
                      onClick={() => setPlayingId(playingId === game._id ? null : game._id)}
                      className="bg-black/50 text-snowfield-white p-2 rounded-full hover:bg-lumi-green transition-colors border border-snowfield-white/30"
                    >
                      {playingId === game._id ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
                    </button>
                  </div>
                </div>

                {playingId === game._id && (
                  <div className="absolute top-4 right-4 z-20 w-65 h-45 rounded-xl overflow-hidden border border-lumi-green shadow-lg">
                    <iframe
                      className="w-full h-full"
                      src={`${game.trailer}?autoplay=1&mute=0`}
                      title="Game Trailer"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
