module.exports = {
  '**/*.{js,jsx,ts,tsx}': filenames => {
    // Filter out config files that are ignored by ESLint
    const filtered = filenames.filter(file => {
      // Handle both Unix and Windows paths
      const fileName = file.split(/[/\\]/).pop() || file;
      return (
        !fileName.endsWith('.config.js') &&
        !fileName.endsWith('.config.mjs') &&
        !fileName.endsWith('.config.ts') &&
        !fileName.endsWith('.lintstagedrc.js') &&
        fileName !== '.lintstagedrc.js'
      );
    });

    if (filtered.length === 0) {
      return [];
    }

    return [
      `eslint --fix --max-warnings=0 ${filtered.map(f => `"${f}"`).join(' ')}`,
      `prettier --write ${filtered.map(f => `"${f}"`).join(' ')}`,
    ];
  },
  '**/*.{json,md,yml,yaml}': ['prettier --write'],
};
