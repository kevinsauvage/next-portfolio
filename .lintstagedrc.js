module.exports = {
  '**/*.{js,jsx,ts,tsx}': filenames => {
    // Filter out config files that are ignored by ESLint
    const filtered = filenames.filter(
      file =>
        !file.includes('.config.js') &&
        !file.includes('.config.mjs') &&
        !file.includes('.config.ts')
    );

    if (filtered.length === 0) {
      return [];
    }

    return [
      `eslint --fix --max-warnings=0 ${filtered.map(f => `"${f}"`).join(' ')}`,
      `prettier --write ${filtered.map(f => `"${f}"`).join(' ')}`,
    ];
  },
  '**/*.{scss,css}': ['stylelint --fix'],
  '**/*.{json,md,yml,yaml}': ['prettier --write'],
};
