/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // P3 Colors
        'p3-primary': '#00bbfa',
        'p3-primary-light': '#79d7fd',
        'p3-secondary': '#001736',
        'p3-secondary-alt': '#00183e',
        'p3-accent': '#ffc54a',
        // P5 Colors
        'p5-primary': '#ff0022',
        'p5-secondary': '#000000',
        'p5-accent': '#1cfeff',
        // Velvet Colors
        'velvet-primary': '#3a5ba0',
        'velvet-secondary': '#1a1a2e',
        'velvet-accent': '#c9a227',
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        code: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'bubble': 'bubble 8s ease-in infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-in-skew': 'slide-in-skew 0.4s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        bubble: {
          '0%': { transform: 'translateY(100%) scale(0.5)', opacity: '0' },
          '10%': { opacity: '0.8' },
          '90%': { opacity: '0.8' },
          '100%': { transform: 'translateY(-100px) scale(1)', opacity: '0' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 187, 250, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 187, 250, 0.6)' },
        },
        'slide-in-skew': {
          '0%': { transform: 'translateX(-100px) skewX(-15deg)', opacity: '0' },
          '100%': { transform: 'translateX(0) skewX(-5deg)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
