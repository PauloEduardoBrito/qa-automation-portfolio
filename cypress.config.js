
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',

  screenshotOnRunFailure: true,
  video: true,

  e2e: {
    baseUrl: 'http://localhost:3000',

    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on)
      return config
    },
  },
})
