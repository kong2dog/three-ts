import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const path = require('path');

export default defineConfig({
	base: '',
	plugins: [
		tsconfigPaths({
			projects: [
				path.resolve(__dirname, './demos/tsconfig.json'),
				path.resolve(__dirname, './tsconfig.json'),
			],
		}),
	],
	root: path.resolve(__dirname, './demos'),
	build: {
		outDir: 'dist',
		rollupOptions: {
			input: {
				main: path.resolve(__dirname, './demos/index.html'),
			},
		},
	},
	server: {
		open: true,
	},
});
