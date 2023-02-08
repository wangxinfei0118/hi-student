/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  media: false,
  theme: {
    extend: {
      colors: {
        theme:'#f4f5f5', //背景主题色
        333: '#333333', //文字颜色
        active: '#2775E8',//活跃文字颜色
        shadow:'rgba(81,87,103,0.8)',
        'shadow-x':'rgba(81,87,103,0.6)',
        'shadow-y':'rgba(81,87,103,0.05)',
        nav:'#8590a6',
        'theme-black-850': 'rgba(0,0,0,0.85)', // 文字标题
        'theme-black-650': 'rgba(0,0,0,0.65)', // 普通导航文字色
        'theme-black-250': 'rgba(0,0,0,0.25)', // 文字描述
        'theme-red': '#E34152',
        'theme-yellow': '#E8A31B',
        'theme-green': '#00BE6A',
        'theme-title': 'rgba(135,206,250)',
        'bg-card':'rgba(135,206,250,0.2)',
        'card-blue': '#e1edff',
        'card-orange': '#fff3e2',
        'card-yellow': '#fef9e2',
        'card-green': '#e5f7f7'
      },
      fontSize: {
        small: '12px',
        'small-x': '13px',
        medium: '14px',
        'medium-x': '16px',
        large: '18px',
      },
      borderRadius: {
        small: '2px',
        medium: '4px',
        large: '8px'
      },
      lineHeight: {
        12: '12px',
        18: '18px',
        20: '20px',
        22: '22px',
        24: '24px',
      },
      boxShadow: {
        card: '0 1px 3px rgb(18 18 18 / 10%)'
      },
      minHeight:{
        'cover':'calc(100vh - 52px)'
      },
    },
  },
  plugins: [],
}
