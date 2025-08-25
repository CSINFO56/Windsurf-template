import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0a66c2', // Couleur LinkedIn
        secondary: '#f5f5f5',
        dark: '#191919',
      },
    },
  },
  plugins: [],
}

export default config
