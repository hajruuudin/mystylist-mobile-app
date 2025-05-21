import { KumbhSans_800ExtraBold } from '@expo-google-fonts/kumbh-sans';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        tomato: '#ff6347',
      },
      fontFamily: {
        'kumbh-sans-regular': ['regular', 'sans serif'],
        'kumbh-sans-bold' : ['bold', 'sans-serif'],
        'kumnh-sans-light' : ['light', 'sans-serif']
      }
    },
  },
  plugins: [],
};