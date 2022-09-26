const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'effeb6',
  e2e: {
    baseUrl: 'http://localhost:3000'
  }
})