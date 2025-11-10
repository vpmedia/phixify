/* eslint n/no-unpublished-import: 0 */
import js from '@eslint/js';
import jsdocPlugin from 'eslint-plugin-jsdoc';
import nodePlugin from 'eslint-plugin-n';
import unicornPlugin from 'eslint-plugin-unicorn';
import globals from 'globals';

/** @type { import('eslint').Linter.Config[] } */
export default [
  {
    ignores: [
      '.github/**/*.*',
      '.idea/**/*.*',
      '.vscode/**/*.*',
      'build/**/*.*',
      'coverage/**/*.*',
      'dist/**/*.*',
      'public/**/*.*',
      'types/**/*.*',
      'node_modules/**/*.*',
    ],
  },
  {
    languageOptions: {
      globals: {
        ...globals.vitest,
        ...globals.browser,
        ...globals.node,
        ...globals.es2026,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    plugins: {
      jsdoc: jsdocPlugin,
      n: nodePlugin,
      unicorn: unicornPlugin,
    },
    settings: {
      'import/parsers': {
        espree: ['.js', '.cjs', '.mjs', '.jsx'],
      },
      'import/resolver': {
        node: true,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      ...jsdocPlugin.configs['flat/recommended'].rules,
      ...nodePlugin.configs['flat/all'].rules,
      ...unicornPlugin.configs.recommended.rules,
      "n/no-sync": "off",
      "unicorn/explicit-length-check": "off",
      "unicorn/filename-case": "off",
      "unicorn/import-style": "off",
      "unicorn/no-array-for-each": "off",
      "unicorn/no-array-reduce": "off",
      "unicorn/no-array-sort": "off",
      "unicorn/no-immediate-mutation": "off",
      "unicorn/no-null": "off",
      "unicorn/prefer-at": "off",
      "unicorn/prefer-date-now": "off",
      "unicorn/prefer-number-properties": "off",
      "unicorn/prefer-set-has": "off",
      "unicorn/prefer-string-replace-all": "off",
      "unicorn/prefer-string-slice": "off",
      "unicorn/prevent-abbreviations": "off",
      "unicorn/relative-url-style": "off",
    },
  },
];
