/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

export default {
	content: [
    	'./index.html',
    	'./src/**/*.{js,jsx}'
  	],
  	theme: {
		colors: {
      		custom: {
        		'dark': '#222B32',
				'purple': '#5F4879',
				'blue': '#4E5F97',
				'black': '#13181C',
				'pink': '#C51F5E'
      		},
      		...colors
    	},
    	extend: {
      		backgroundImage: {
        		'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))'
      		}
    	},
  	},
  	plugins: [],
}