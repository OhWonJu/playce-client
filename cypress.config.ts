const { defineConfig } = require('cypress');

module.exports = defineConfig({
  video: false,
  screenshotOnRunFailure: false,
  env: {
    'cypress-react-selector': {
      root: '#__cy_root',
    },
  },
  e2e: {
    baseUrl: "http://localhost:5173",
    setupNodeEvents() {},
    specPattern: 'cypress/e2e/**/*.cy.{js,ts,jsx,tsx}',
    excludeSpecPattern: ['**/__snapshots__/*', '**/__image_snapshots__/*'],
  },
  component: {
    setupNodeEvents() {},
    specPattern: 'cypress/component/**/*.cy.{js,ts,jsx,tsx}',
    excludeSpecPattern: ['**/__snapshots__/*', '**/__image_snapshots__/*'],
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },
});