/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        noto: ['"Noto Sans JP"', 'sans-serif'],
        mouseMemoirs: ['"Mouse Memoirs"', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
        ubuntu: ['Ubuntu', 'sans-serif'],
        catamaran: ['Catamaran', 'sans-serif'],
        oswald: ['Oswald', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        squarePeg: ['"Square Peg"', 'cursive'],
      },
      colors: {
        error: '#ff3300c9',
        body: '#3f3f3f',
        invalid: { label: '#ca3e51', input: '#aa0b20' },
        brown: {
          DEFAULT: '#ad5502',
          light: '#8a2b06',
          dark: '#5a1a01',
          accent: {
            light: '#92320c',
            lighter: '#b94517',
            dark: '#2c0d00',
            darker: '#4d1601',
          },
        },
        switch: {
          sky: 'rgb(var(--color-switch-sky) / <alpha-value>)',
          purple: 'rgb(var(--color-switch-purple) / <alpha-value>)',
          pink: 'rgb(var(--color-switch-pink) / <alpha-value>)',
          emerald: 'rgb(var(--color-switch-emerald) / <alpha-value>)',
          orange: 'rgb(var(--color-switch-orange) / <alpha-value>)',
        },
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
      },
      screens: {
        big: '960px', // => @media (min-width: 640px) { ... }
        sml: '550px', // => @media (min-width: 550px) { ... }
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s linear infinite',
        'ping-slow': 'ping 3s linear infinite',
        meals: 'meals 1s ease-out forwards',
        bump: 'bump 500ms ease-out',
        'slide-down': 'slide-down 300ms ease-out forwards',
      },
      keyframes: {
        meals: {
          from: { opacity: 0, transform: 'translateY(3rem)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        bump: {
          '0%': {
            transform: 'scale(1)',
          },
          '10%': {
            transform: 'scale(0.9)',
          },
          '30%': {
            transform: 'scale(1.1)',
          },
          '50%': {
            transform: 'scale(1.15)',
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
        'slide-down': {
          from: {
            opacity: 0,
            transform: 'translateY(-3rem)',
          },
          to: {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
      },
      inset: {
        'left-sml': 'calc(50% - 13rem)',
      },
    },
  },
  plugins: [],
};
