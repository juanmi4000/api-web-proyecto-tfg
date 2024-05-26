/** @type {import('tailwindcss').Config} */
import animations from '@midudev/tailwind-animations'
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        fugaz: ['Fugaz One', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: [animations]
}
