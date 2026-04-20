import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        aurora: 'aurora 14s ease-in-out infinite',
        'aurora-slow': 'aurora 22s ease-in-out infinite',
        'float-slow': 'float 3.5s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2.4s ease-in-out infinite',
        dash: 'dashFlow 2s linear infinite',
        'dash-slow': 'dashFlow 3s linear infinite',
        'dash-fast': 'dashFlow 1.5s linear infinite',
        'node-pulse': 'nodePulse 2.2s ease-in-out infinite',
      },
      keyframes: {
        aurora: {
          '0%, 100%': { transform: 'translate3d(-8%, -6%, 0) scale(1)' },
          '50%': { transform: 'translate3d(8%, 6%, 0) scale(1.15)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.5' },
          '50%': { transform: 'translateY(10px)', opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        dashFlow: {
          to: { strokeDashoffset: '-20' },
        },
        nodePulse: {
          '0%, 100%': { opacity: '0.7' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
