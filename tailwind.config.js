import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
  safelist: ["dark"],
	theme: {
		extend: {
			container: {
				center: true,
				padding: '1rem',
				screens: {
					"2xl": "1400px"
				}
			},
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: "hsl(var(--popover) / <alpha-value>)",
					foreground: "hsl(var(--popover-foreground) / <alpha-value>)"
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				sans: [...fontFamily.sans]
			}
		}
	},
	plugins: [
		function ({addUtilities}){
			const newUtilities = {
				".scrollbar-thin" :{
					scrollbarWidth: "thin",
					scrollbarColor: "rgb(31 29 29) white",
				},
				".scrollbar-webkit": {
					"&::-webkit-scrollbar":{
						width: "8px",
					},
					"&::-webkit-scrollbar-track":{
						background: "white"
					},
					"&::-webkit-scrollbar-thumb":{
						background: "rgb(31 41 55)",
						borderRadius: "20px",
						border: "1px solid white"
					}
				}
			}
			addUtilities(newUtilities, ["responsive", "hover"])
		}
	]
};
