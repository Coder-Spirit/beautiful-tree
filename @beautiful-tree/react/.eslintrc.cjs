'use strict';

module.exports = {
	root: true,
	env: {
		browser: true,
		es2020: true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		tsConfigRootDir: __dirname,
		project: ['./tsconfig.json'],
	},
	plugins: [
		'react-refresh',
	],
	extends: [
		'@coderspirit',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'plugin:react-hooks/recommended',
		'plugin:storybook/recommended',
	],
	settings: {
		react: {
			version: 'detect'
		},
	},
	ignorePatterns: [
		'.eslintrc.cjs',
		'dist/**/*',
		'node_modules/**/*',
	]
}
