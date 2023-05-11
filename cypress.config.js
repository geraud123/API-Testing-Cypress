const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://simple-books-api.glitch.me'
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
