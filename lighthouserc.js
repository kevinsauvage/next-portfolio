module.exports = {
  ci: {
    assert: {
      preset: 'lighthouse:recommended',
    },
    collect: {
      startServerCommand: process.env.NODE_ENV === 'production' ? undefined : 'yarn run dev',
      url: [`https://${process.env.PREVIEW_URL}`],
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
