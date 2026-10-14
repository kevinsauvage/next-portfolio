module.exports = {
  // Config files are ignored by ESLint; --no-warn-ignored keeps them from failing the run.
  '**/*.{js,jsx,ts,tsx}': ['eslint --fix --no-warn-ignored', 'prettier --write'],
  '**/*.{json,md,yml,yaml}': ['prettier --write'],
};
