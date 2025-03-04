// Suppress ResizeObserver loop limit exceeded error
Cypress.on('uncaught:exception', (err) => !err.message.includes('ResizeObserver loop'))
