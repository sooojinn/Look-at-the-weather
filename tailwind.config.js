export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        lightBlack: '#171719',
        darkGray: '#47484c',
        gray: '#858588',
        lightGray: '#c7c8c9',
        white: '##dfdfe0',

        background: {
          white: '#FFFFFF',
          default: '#dfdfeo',
          light: '#f7f7f8',
          gray: 'rgb(243 244 246)',
        },
        interactive: {
          default: '#989ba2',
          light: '#f4f4f5',
        },
        status: {
          success: '#00bf40',
          warning: '#ff9200',
          error: '#ff4242',
        },
        dimmer: {
          bg: 'rgba(23, 23, 25, 0.52)', // 171719 with 52% opacity
        },
        line: {
          lightest: '#f4f4f5',
          lighter: '#e8e8ea',
          light: '#e0e0e2',
        },
        primary: {
          lightest: '#0066ff',
          lighter: '#005eeeb',
          light: '#0054d1',
        },
      },
      fontSize: {
        xs: '12px',
        s: '13px',
        m: '14px',
        l: '16px',
        xl: '18px',
        xxl: '24px',
      },
      fontWeight: {
        nomal: 400,
        bold: 700,
      },
    },
  },
  plugins: [],
  purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  mode: 'jit',
};
