// eslint-disable-next-line import/no-unresolved
import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		coverage: {
			include: ['src/*.{ts,tsx}'],
			exclude: ['src/**/*.test.{ts,tsx}', 'src/stories/**/*'],
			// thresholdAutoUpdate: true,
			branches: 94.31,
			lines: 99.32,
			functions: 100,
			statements: 99.32,
		},
		environment: 'jsdom',
	},
})
