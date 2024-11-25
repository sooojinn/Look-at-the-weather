export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'weather-light-gradient': 'linear-gradient(118.17deg, #F5AF16 -4.95%, #FFEA73 101.98%)',
        'weather-normal-gradient': 'linear-gradient(118.17deg, #29ACFF -4.95%, #BAE1FA 101.98%)',
        'weather-dark-gradient': 'linear-gradient(118.17deg, #0E3363 -4.95%, #4484D9 101.98%)',
        'weather-error-gradient': 'linear-gradient(120.34deg, #063F80 -4.79%, #130B59 43.81%, #390F5F 90.11%)',
      },
      colors: {
        white: 'rgb(var(--color-label-100))',
        disabled: 'rgb(var(--color-label-200))',
        lightGray: 'rgb(var(--color-label-300))',
        gray: 'rgb(var(--color-label-400))',
        darkGray: 'rgb(var(--color-label-500))',
        lightBlack: 'rgb(var(--color-label-600))',
        black: 'rgb(var(--color-label-700))',

        opacity: {
          black90: 'rgba(var(--color-label-700), 0.9)',
          black50: 'rgba(var(--color-label-700), 0.5)',
          black20: 'rgba(var(--color-label-700), 0.2)',
          lightBlack52: 'rgb(var(--color-label-600), 0.52)',
          lightBlack90: 'rgb(var(--color-label-600), 0.9)',
          white40: 'rgba(var(--color-label-100),0.4)',
        },
        background: {
          white: 'rgb(var(--color-label-100))',
          light: 'rgb(var(--bg-gray-100))',
          disabled: 'rgb(var(--bg-gray-200))',
        },
        status: {
          success: 'rgb(var(--color-success))',
          warning: 'rgb(var(--color-warning))',
          error: 'rgb(var(--color-error))',
        },
        line: {
          lightest: 'rgb(var(--line-gray-100))',
          lighter: 'rgb(var(--line-gray-200))',
          light: 'rgb(var(--line-gray-300))',
        },
        primary: {
          main: 'rgb(var(--color-primary))',
          logo: 'rgb(var(--color-label-700))',
        },
      },
      fontSize: {
        xs: 'var(--fs-xs)',
        s: 'var(--fs-md)',
        m: 'var(--fs-md)',
        l: 'var(--fs-lg)',
        xl: 'var(--fs-xl)',
        '2xl': 'var(--fs-2xl)',
        '3xl': 'var(--fs-3xl)',
      },
      fontWeight: {
        regular: 'var(--fw-400)',
        medium: 'var(--fw-500)',
        bold: 'var(--fw-700)',
      },
      dropShadow: {
        custom: '0px 0px 8px rgba(0, 0, 0, 0.1)',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(50%)', opacity: '0.5' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        bounceTooltip: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        slideUp: 'slideUp 0.5s forwards',
        fadeOut: 'fadeOut 0.4s forwards',
        bounceTooltip: 'bounceTooltip 1s ease-in-out forwards',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
  purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  mode: 'jit',
};
