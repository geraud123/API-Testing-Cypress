const {defineConfig} = require("cypress");

module.exports = defineConfig({
    e2e: {
        watchForFileChanges: true,
        chromeWebSecurity: false,
        baseUrl: 'https://simple-books-api.glitch.me',
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        env: {
            snapshotOnly: true,             // to combine your API calls with your UI test
            hideCredentials: true           // to hide your credentials
        }
    },
});
