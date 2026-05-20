/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lumi-green': 'var(--color-lumi-green)',
        'rich-meadow': 'var(--color-rich-meadow)',
        'electric-lime': 'var(--color-electric-lime)',
        'cyber-yellow': 'var(--color-cyber-yellow)',
        'deep-space-blue': 'var(--color-deep-space-blue)',
        'absolute-zero': 'var(--color-absolute-zero)',
        'snowfield-white': 'var(--color-snowfield-white)',
        'charcoal-depth': 'var(--color-charcoal-depth)',
        'whisper-gray': 'var(--color-whisper-gray)',
        'dark-steel': 'var(--color-dark-steel)',
        'onyx-shadow': 'var(--color-onyx-shadow)',
      },
      fontFamily: {
        'segoe-ui': 'var(--font-segoe-ui)',
        'segoe-pro-black': 'var(--font-segoeproblack)',
      },
    },
  },
  plugins: [],
}
