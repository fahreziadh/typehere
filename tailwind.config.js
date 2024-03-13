/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			container: {
				center: true,
				padding: '1rem'
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
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	plugins: [
		function ({addUtilities}){
			const newUtilities = {
				".scrollbar-thin" :{
					scrollbarWidth: "thin",
					scrollbarColor: "rgb(31 29 29) white",
					borderRadius: "20px",
				},
				".scrollbar-webkit": {
					"&::-webkit-scrollbar":{
						width: "8px"
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
