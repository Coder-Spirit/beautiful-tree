import { defineConfig } from 'rollup'
import dts from 'rollup-plugin-dts'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import pluginTs from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'

const name = 'BeautifulTree'
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
				file: 'dist/main.big.cjs',
				format: 'cjs',
				globals,
				sourcemap: true,
			},
			{
				file: 'dist/main.big.mjs',
				format: 'es',
				globals,
				sourcemap: true,
			},
			{
				name,
				file: 'dist/main.big.iife.js',
				format: 'iife',
				globals,
				sourcemap: true,
			},
			{
				name,
				file: 'dist/main.big.umd.js',
				format: 'umd',
				globals,
				sourcemap: true,
			},
		],
		external,
		plugins: [
			nodeResolve({ resolveOnly: ['@beautiful-tree/algorithms'] }),
			pluginTs(),
		],
	},
	{
		input,
		output: [
			{
				file: 'dist/main.min.cjs',
				format: 'cjs',
				globals,
				sourcemap: true,
			},
			{
				file: 'dist/main.min.mjs',
				format: 'es',
				globals,
				sourcemap: true,
			},
			{
				name,
				file: 'dist/main.min.iife.js',
				format: 'iife',
				globals,
				sourcemap: true,
			},
			{
				name,
				file: 'dist/main.min.umd.js',
				format: 'umd',
				globals,
				sourcemap: true,
			},
		],
		external,
		plugins: [
			nodeResolve({ resolveOnly: ['@beautiful-tree/algorithms'] }),
			pluginTs(),
			terser(),
		],
	},
	{
		input,
		output: [
			{ format: 'cjs', file: 'dist/main.d.cts' },
			{ format: 'es', file: 'dist/main.d.mts' },
		],
		external,
		plugins: [dts({ respectExternal: true })],
	},
])
