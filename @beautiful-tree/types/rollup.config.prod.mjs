import { defineConfig } from 'rollup'
import dts from 'rollup-plugin-dts'

const input = 'src/types.ts'

export default defineConfig([
	{
		input,
		output: [
			{ format: 'cjs', file: 'dist/types.d.cts' },
			{ format: 'es', file: 'dist/types.d.mts' },
		],
		plugins: [dts()],
	},
])
