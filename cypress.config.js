
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',

  screenshotOnRunFailure: true,
  video: true,

  e2e: {
    baseUrl: 'http://localhost:3000',

  setupNodeEvents(on, config) {
    require('cypress-mochawesome-reporter/plugin')(on)

    on('task', {
      'db:findUser'(username) {
        const db = require('./server/database/db')

        const user = db.prepare(`
          SELECT id, username
          FROM users
          WHERE username = ?
        `).get(username)

        return user || null
      },
    })

    return config
  },
  },
})
