import { render, screen, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App Component', () => {
  it('renders Sidebar PLAY logo', async () => {
    await act(async () => {
      render(<App />);
    });
    const playLogo = screen.getByText(/PLAY/i);
    expect(playLogo).toBeInTheDocument();
  });

  it('renders default Games page text', async () => {
    await act(async () => {
      render(<App />);
    });
    const gamesHeading = await screen.findByText(/GAMES ON PROMOTION/i);
    expect(gamesHeading).toBeInTheDocument();
  });
});
