// eslint-disable-next-line import/no-unresolved
import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		coverage: {
			provider: 'v8',
			include: ['src/*.ts'],
			exclude: ['src/**/*.test.ts'],
			// thresholdAutoUpdate: true,
			branches: 93.54,
			lines: 93.4,
			functions: 90.9,
			statements: 93.4,
		},
	},
})
