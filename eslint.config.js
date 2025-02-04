import js from '@eslint/js';
import pluginQuery from '@tanstack/eslint-plugin-query';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    { ignores: ['dist'] },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended, ...pluginQuery.configs['flat/recommended']],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            prettier: prettierPlugin, // Prettier 플러그인 추가
        },
        rules: {
            ...pluginQuery.configs['flat/recommended'],
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
            'prettier/prettier': 'error', // Prettier 규칙을 위반하면 ESLint에서 에러로 처리
            '@tanstack/query/exhaustive-deps': 'error',
            '@tanstack/query/stable-query-client': 'error',
            '@tanstack/query/no-rest-destructuring': 'warn',
        },
    },
);
