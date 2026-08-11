/** @type {import('tailwindcss').Config} */
export default {
  content: ['./*.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'forest-teal': {
          DEFAULT: '#0D5C53',
          dark: '#0a4a42',
          light: '#1a7a6e',
        },
        'electric-gold': '#FFC700',
        'light-mint': '#F0F4F1',
      },
      backgroundImage: {
        'footer-gradient': 'linear-gradient(135deg, #0D5C53 0%, #1a7a6e 50%, #2a9a8a 100%)',
        'floor-indicator-gradient': 'linear-gradient(90deg, #FFC700, #0D5C53)',
        'skeleton-shine': 'linear-gradient(90deg, #eef1ef 25%, #e3e8e5 37%, #eef1ef 63%)',
      },
      keyframes: {
        fadeUp: { from: { opacity: 0, transform: 'translateY(16px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        slideIn: { from: { opacity: 0, transform: 'translateX(-16px)' }, to: { opacity: 1, transform: 'translateX(0)' } },
        pulseSoft: { '0%, 100%': { opacity: 0.6, transform: 'scale(1)' }, '50%': { opacity: 1, transform: 'scale(1.15)' } },
        floatPulse: { '0%, 100%': { transform: 'scale(1)' }, '50%': { transform: 'scale(1.04)' } },
        rippleAnim: { to: { transform: 'scale(3)', opacity: 0 } },
        skeletonShine: { '0%': { backgroundPosition: '100% 50%' }, '100%': { backgroundPosition: '0 50%' } },
        toastIn: { from: { opacity: 0, transform: 'translateX(30px)' }, to: { opacity: 1, transform: 'translateX(0)' } },
        blobFloat1: { '0%, 100%': { transform: 'translate(0,0) scale(1)' }, '50%': { transform: 'translate(-30px, 25px) scale(1.08)' } },
        blobFloat2: { '0%, 100%': { transform: 'translate(0,0) scale(1)' }, '50%': { transform: 'translate(25px, -20px) scale(1.05)' } },
      },
      animation: {
        fadeUp: 'fadeUp 0.5s ease forwards',
        slideIn: 'slideIn 0.4s ease forwards',
        'pulse-soft': 'pulseSoft 2s infinite',
        floatPulse: 'floatPulse 3s infinite',
        ripple: 'rippleAnim 0.6s linear',
        skeletonShine: 'skeletonShine 1.4s ease infinite',
        toastIn: 'toastIn 0.3s cubic-bezier(0.16,1,0.3,1)',
        blobFloat1: 'blobFloat1 16s ease-in-out infinite',
        blobFloat2: 'blobFloat2 18s ease-in-out infinite',
        blobFloat1Reverse: 'blobFloat1 20s ease-in-out infinite reverse',
      },
    },
  },
  plugins: [],
}
