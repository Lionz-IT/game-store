import '@testing-library/jest-dom';
import { vi } from 'vitest';

(window as any).fetch = vi.fn((url: string) => {
  if (url === '/api/gamesData.json') {
    return Promise.resolve({
      json: () => Promise.resolve([
        {
          "_id": 1,
          "title": "League of Legends",
          "description": "Mock description",
          "level": "Median",
          "category": "MOBA",
          "rating": 3,
          "discount": 0.5,
          "price": 79.0,
          "img": "./assets/games/lol-bg.jpeg",
          "trailer": "https://www.youtube.com/embed/vzHrjOMfHPY",
          "active": true
        }
      ])
    });
  }
  return Promise.reject(new Error('Unknown URL'));
});

