import { defineConfig } from 'rollup'
import dts from 'rollup-plugin-dts'
import pluginTs from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'

const input = 'src/BeautifulTree.tsx'
const external = ['react', 'react-dom', 'react/jsx-runtime']
const globals = {
	react: 'React',
	'react-dom': 'ReactDOM',
	'react/jsx-runtime': 'jsxRuntime',
}

export default defineConfig([
	{
		input,
		output: [
			{
				file: 'dist/beautiful-tree.cjs',
				format: 'cjs',
				globals,
				sourcemap: true,
			},
			{
				file: 'dist/beautiful-tree.mjs',
				format: 'es',
				globals,
				sourcemap: true,
			},
			{
				name: 'BeautifulTree',
				file: 'dist/beautiful-tree.iife.js',
				format: 'iife',
				globals,
				sourcemap: true,
			},
			{
				name: 'BeautifulTree',
				file: 'dist/beautiful-tree.umd.js',
				format: 'umd',
				globals,
				sourcemap: true,
			},
		],
		external,
		plugins: [pluginTs()],
	},
	{
		input,
		output: [
			{
				file: 'dist/beautiful-tree.min.cjs',
				format: 'cjs',
				globals,
				sourcemap: true,
			},
			{
				file: 'dist/beautiful-tree.min.mjs',
				format: 'es',
				globals,
				sourcemap: true,
			},
			{
				name: 'BeautifulTree',
				file: 'dist/beautiful-tree.min.iife.js',
				format: 'iife',
				globals,
				sourcemap: true,
			},
			{
				name: 'BeautifulTree',
				file: 'dist/beautiful-tree.min.umd.js',
				format: 'umd',
				globals,
				sourcemap: true,
			},
		],
		external,
		plugins: [pluginTs(), terser()],
	},
	{
		input,
		output: [
			{ format: 'cjs', file: 'dist/beautiful-tree.d.cts' },
			{ format: 'es', file: 'dist/beautiful-tree.d.mts' },
		],
		external,
		plugins: [dts({ respectExternal: true })],
	},
])
