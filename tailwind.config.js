/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        hangar: '#122420',
        hangardeep: '#0C1A17',
        panel: '#1A342C',
        panel2: '#20402F',
        ink: '#F1ECDD',
        inkdim: '#AFC0B6',
        brass: '#CE9E52',
        signal: '#E2572B',
        linecyan: '#7FC8BE',
      },
      fontFamily: {
        display: ['"Big Shoulders Display"', 'sans-serif'],
        body: ['"IBM Plex Sans"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
