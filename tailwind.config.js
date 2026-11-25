/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        med: {
          blue: '#2563EB',
          'blue-dark': '#1E40AF',
          'blue-subtle': '#EFF6FF',
          teal: '#0D9488',
          'teal-subtle': '#F0FDFA',
          danger: '#DC2626',
          'danger-subtle': '#FEF2F2',
          warn: '#D97706',
          'warn-subtle': '#FFFBEB',
          safe: '#16A34A',
          'safe-subtle': '#F0FDF4',
          bg: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E2E8F0',
          text: '#0F172A',
          'text-secondary': '#475569',
          'text-muted': '#94A3B8',
        },
      },
      fontFamily: {
        sans: [
          'Pretendard',
          '-apple-system',
          'BlinkMacSystemFont',
          'system-ui',
          'Roboto',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
