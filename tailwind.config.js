export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        assistive: '#C7C8C9',

        background: {
          default: '#dfdfeo',
          light: '#f7f7f8',
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
      height: {
        '292px': '292px',
        '60px': '60px',
        '312px': '312px',
      },
    },
  },
  plugins: [],
};
