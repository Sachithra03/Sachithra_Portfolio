/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FAF8F2',
          100: '#F5F1E8',
          200: '#EBE5D8',
          300: '#DCD6CA',
        },
        ink: {
          900: '#292820',
          800: '#3D3B32',
          700: '#524F44',
          600: '#77736B',
          400: '#9E998F',
        },
        terracotta: {
          DEFAULT: '#C56B38',
          hover: '#AA5728',
          soft: 'rgba(197, 107, 56, 0.12)',
        },
      },
      fontFamily: {
        serif: ['Space Grotesk', 'Newsreader', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'Plus Jakarta Sans', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
