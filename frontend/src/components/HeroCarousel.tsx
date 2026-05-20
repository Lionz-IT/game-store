import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

const featuredGames = [
  {
    id: 1,
    title: "Call of Duty: Black Ops",
    description: "Experience the next generation of global combat.",
    image: "https://images.unsplash.com/photo-1605901309584-818e25960b8f?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Diablo III",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Spider-Man",
    description: "Swing through the city in an all-new adventure.",
    image: "https://images.unsplash.com/photo-1608889175123-8ee362201f81?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Fortnite",
    description: "Battle royale with building mechanics.",
    image: "https://images.unsplash.com/photo-1580234797602-22c37b4a6217?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Halo Infinite",
    description: "The Master Chief returns in his greatest adventure.",
    image: "https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=1000&auto=format&fit=crop",
  }
];

export const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(2);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredGames.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredGames.length) % featuredGames.length);
  };

  return (
    <section className="mb-[48px] relative h-[450px] flex items-center justify-center overflow-hidden w-full">
      <button 
        onClick={prevSlide}
        className="absolute left-4 z-20 bg-black/50 text-snowfield-white p-2 rounded-full hover:bg-lumi-green transition-colors"
      >
        <ChevronLeft size={32} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 z-20 bg-black/50 text-snowfield-white p-2 rounded-full hover:bg-lumi-green transition-colors"
      >
        <ChevronRight size={32} />
      </button>

      <div className="relative w-full h-full flex items-center justify-center">
        {featuredGames.map((game, index) => {
          let position = index - currentIndex;
          if (position < -2) position += featuredGames.length;
          if (position > 2) position -= featuredGames.length;

          const isActive = position === 0;
          const isLeft = position === -1;
          const isRight = position === 1;
          const isHidden = Math.abs(position) > 1;

          let transform = 'translateX(0) scale(1)';
          let zIndex = 0;
          let opacity = 1;

          if (isActive) {
            transform = 'translateX(0) scale(1)';
            zIndex = 10;
          } else if (isLeft) {
            transform = 'translateX(-65%) scale(0.85)';
            zIndex = 5;
            opacity = 0.7;
          } else if (isRight) {
            transform = 'translateX(65%) scale(0.85)';
            zIndex = 5;
            opacity = 0.7;
          } else {
            transform = `translateX(${position > 0 ? 100 : -100}%) scale(0.7)`;
            zIndex = 1;
            opacity = 0;
          }

          return (
            <div
              key={game.id}
              className="absolute w-[60%] h-[350px] transition-all duration-500 ease-in-out rounded-none shadow-2xl"
              style={{
                transform,
                zIndex,
                opacity,
                visibility: isHidden ? 'hidden' : 'visible'
              }}
            >
              <div 
                className="w-full h-full bg-cover bg-center rounded-none relative"
                style={{ backgroundImage: `url('${game.image}')` }}
              >
                {!isActive && <div className="absolute inset-0 bg-black/50 rounded-none"></div>}
                
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
                    <button className="bg-black/50 text-snowfield-white p-3 rounded-full hover:bg-lumi-green transition-colors border border-snowfield-white/30">
                      <Play size={20} fill="currentColor" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
