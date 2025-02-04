/// <reference types="cypress" />

declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject = any> {
    /**
     * Custom command to select elements using a data-test locator.
     * @example cy.getByLocator('submit-button')
     */
    getByLocator(locator: string, ...args: any[]): Chainable<JQuery<HTMLElement>>
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject = any> {
    /**
     * Custom command to select elements using a data-test locator.
     * @example cy.getByLocator('submit-button')
     */
    getByAriaLabel(locator: string, ...args: any[]): Chainable<JQuery<HTMLElement>>
  }
}
