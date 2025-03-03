import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    // setupNodeEvents(on, config) {
    //   // implement node event listeners here
    // },
    baseUrl: 'http://localhost:5173',
    excludeSpecPattern: ['**/node_modules/**'],
    env: {
      apiUrl: 'http://localhost:3000',
    },
  },
})
