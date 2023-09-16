/** @type {import('lint-staged').Config} */
const config = {
  '*.{js,jsx}': 'eslint --fix',
  '*.{css,js,jsx,json,md}': 'prettier --write',
};

export default config;
