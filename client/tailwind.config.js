module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2A4365', // Modern blue for background and buttons
        secondary: '#2B6CB0', // Vibrant blue for accents
        accent: '#E0E1DD', // Light text color
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
