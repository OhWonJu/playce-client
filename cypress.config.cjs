const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: false,
  screenshotOnRunFailure: false,
  env: {
    "cypress-react-selector": {
      root: "#__cy_root",
    },
  },
  e2e: {
    baseUrl: process.env.VITE_CLIENT_BASE_URL,
    setupNodeEvents() {},
    specPattern: "cypress/e2e/**/*.cy.{js,ts,jsx,tsx}",
    excludeSpecPattern: ["**/__snapshots__/*", "**/__image_snapshots__/*"],
  },
  component: {
    // setupNodeEvents() {},
    // specPattern: "cypress/component/**/*.cy.{js,ts,jsx,tsx}",
    // excludeSpecPattern: ["**/__snapshots__/*", "**/__image_snapshots__/*"],
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
