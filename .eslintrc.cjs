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
		'@typescript-eslint',
		'import',
		'prettier',
		'react-refresh',
	],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/strict-type-checked',
		'plugin:@typescript-eslint/stylistic-type-checked',
		'plugin:import/recommended',
		'plugin:import/typescript',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'plugin:react-hooks/recommended',
		'plugin:storybook/recommended',
		'prettier',
	],
	rules: {
		'@typescript-eslint/consistent-type-exports': 'error',
		'@typescript-eslint/consistent-type-imports': 'error',
		"@typescript-eslint/explicit-function-return-type": "error",
		"@typescript-eslint/explicit-member-accessibility": "error",
		"@typescript-eslint/explicit-module-boundary-types": "error",
		"@typescript-eslint/no-import-type-side-effects": "error",
		'@typescript-eslint/no-misused-promises': 'error',
		"@typescript-eslint/no-unnecessary-qualifier": "error",
		"@typescript-eslint/prefer-readonly": "error",
		"@typescript-eslint/prefer-readonly-parameter-types": "error",
	},
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
