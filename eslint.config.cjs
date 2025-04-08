const next = require('eslint-config-next');
const globals = require('globals');

export default [
	{
		ignores: ['node_modules/', '.next/', 'out/', '*.md', '*.json'],
	},
	next(),
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.es2021,
			},
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		rules: {
			'react/react-in-jsx-scope': 'off',
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',
		},
	},
];
