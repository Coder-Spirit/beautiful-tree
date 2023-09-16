import { defineConfig } from 'rollup'
import dts from 'rollup-plugin-dts'
import pluginTs from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'

const name = 'BeautifulTreeAlgos'
const input = 'src/main.ts'

export default defineConfig([
	{
		input,
		output: [
			{
				file: 'dist/main.big.cjs',
				format: 'cjs',
				sourcemap: true,
			},
			{
				file: 'dist/main.big.mjs',
				format: 'es',
				sourcemap: true,
			},
			{
				name,
				file: 'dist/main.big.iife.js',
				format: 'iife',
				sourcemap: true,
			},
			{
				name,
				file: 'dist/main.big.umd.js',
				format: 'umd',
				sourcemap: true,
			},
		],
		plugins: [pluginTs()],
	},
	{
		input,
		output: [
			{
				file: 'dist/main.min.cjs',
				format: 'cjs',
				sourcemap: true,
			},
			{
				file: 'dist/main.min.mjs',
				format: 'es',
				sourcemap: true,
			},
			{
				name,
				file: 'dist/main.min.iife.js',
				format: 'iife',
				sourcemap: true,
			},
			{
				name,
				file: 'dist/main.min.umd.js',
				format: 'umd',
				sourcemap: true,
			},
		],
		plugins: [pluginTs(), terser()],
	},
	{
		input,
		output: [
			{ format: 'cjs', file: 'dist/main.d.cts' },
			{ format: 'es', file: 'dist/main.d.mts' },
		],
		plugins: [dts({ respectExternal: true })],
	},
])
