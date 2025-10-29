import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import cssModules from 'eslint-plugin-css-modules';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import sortKeys from 'eslint-plugin-sort-keys';
import unicorn from 'eslint-plugin-unicorn';
import nextPlugin from '@next/eslint-plugin-next';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  // Ignore patterns
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'dist/**',
      'build/**',
      '*.config.js',
      '*.config.mjs',
      '*.config.ts',
      'next-env.d.ts',
    ],
  },
  // Custom configuration
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
      globals: {
        React: 'writable',
        globalThis: 'readonly',
        console: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly',
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        fetch: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      'simple-import-sort': simpleImportSort,
      react,
      'react-hooks': reactHooks,
      'css-modules': cssModules,
      'sort-keys': sortKeys,
      prettier,
      import: importPlugin,
      'jsx-a11y': jsxA11y,
      unicorn,
      '@next/next': nextPlugin,
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        alias: {
          extensions: ['.js', '.jsx', '.tsx', '.ts'],
          map: [['@/', './src/']],
        },
      },
    },
    rules: {
      // Unicorn rules
      'unicorn/no-array-reduce': 'off',
      'unicorn/no-array-for-each': 'off',
      'unicorn/filename-case': 'off',
      'unicorn/no-new-array': 'off',
      'unicorn/prefer-module': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prefer-global-this': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/no-useless-undefined': 'off',
      'unicorn/prefer-top-level-await': 'off',
      'unicorn/prefer-node-protocol': 'off',
      'unicorn/no-anonymous-default-export': 'off',

      // Sort keys
      'sort-keys': 'off',
      'sort-keys/sort-keys-fix': 'off',

      // Import sorting
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react', '^next'],
            ['^@/'],
            ['^\\u0000'],
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\.\\/(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\.(?!/?$)'],
            ['^.+\\.?(css|scss)$'],
          ],
        },
      ],

      // React rules
      'react/react-in-jsx-scope': 'off',
      'react/jsx-filename-extension': ['warn', { extensions: ['.js', '.jsx', '.tsx'] }],
      'react/prop-types': 'off',
      'react/no-unused-prop-types': 'warn',
      'react/jsx-props-no-spreading': 'off',
      'react/function-component-definition': [
        'warn',
        { namedComponents: 'arrow-function', unnamedComponents: 'arrow-function' },
      ],
      'react/jsx-no-useless-fragment': 'warn',
      'react/jsx-curly-brace-presence': 'off',
      'react/self-closing-comp': 'warn',
      'react/jsx-sort-props': 'off',
      'react/display-name': 'off',

      // React Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Accessibility
      'jsx-a11y/anchor-is-valid': 'off',
      'jsx-a11y/label-has-associated-control': [
        'warn',
        {
          labelComponents: ['Label'],
          labelAttributes: ['label'],
          controlComponents: ['Input', 'TextArea'],
          depth: 3,
        },
      ],
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/aria-props': 'warn',
      'jsx-a11y/aria-proptypes': 'warn',
      'jsx-a11y/aria-unsupported-elements': 'warn',
      'jsx-a11y/role-has-required-aria-props': 'warn',
      'jsx-a11y/role-supports-aria-props': 'warn',
      'jsx-a11y/no-autofocus': 'off',
      'jsx-a11y/click-events-have-key-events': 'warn',
      'jsx-a11y/no-static-element-interactions': 'warn',

      // TypeScript rules
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-var-requires': 'warn',
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],
      '@typescript-eslint/consistent-type-exports': 'warn',
      '@typescript-eslint/no-import-type-side-effects': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn',

      // General rules
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-param-reassign': ['error', { props: false }],
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'warn',
      'no-empty-function': 'off',
      '@typescript-eslint/no-empty-function': 'warn',
      'prefer-const': 'warn',
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': [
        'warn',
        { functions: false, classes: false, variables: true },
      ],
      'no-multi-spaces': 'warn',
      'no-duplicate-imports': 'off',
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': 'warn',
      'prefer-template': 'warn',
      'prefer-arrow-callback': 'warn',
      'arrow-spacing': 'warn',

      // Import rules
      'import/extensions': 'off',
      'import/no-unresolved': 'off',
      'import/no-duplicates': 'warn',
      'import/no-unused-modules': 'off',
      'import/order': 'off',
      'import/prefer-default-export': 'off',
      'import/no-anonymous-default-export': 'off',

      // Next.js specific
      '@next/next/no-img-element': 'warn',
      '@next/next/no-html-link-for-pages': 'warn',
    },
  },
];
