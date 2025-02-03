// IMPORTANT! These tests are intentionally designed with potentially fragile locators.

describe('Projects page', () => {
  beforeEach(() => {
    cy.visit('/projects')
  })
  // Using class name as a locator '[class="va-card va-card--outlined"]'
  it('successfully opens projects as cards', () => {
    cy.contains('Cards').click()
    debugger
    cy.get('[class="va-card va-card--outlined"]').first().should('contain', 'Vuestic')
  })
  // Using button text as a locator 'Table'
  it('successfully opens a table of projects', () => {
    cy.contains('Table').click()
    cy.contains('8 results')
  })
  // Using XPath as a locator '//table/tbody/tr[1]/td[1]'
  it('contains a project in the table', () => {
    cy.contains('Table').click()
    cy.xpath('//table/tbody/tr[1]/td[1]').should('contain', 'Vuestic')
    cy.xpath('//table/tbody/tr[1]/td[5]').should('contain', '20/11/2023')
    cy.xpath('//table/tbody/tr[1]/td[6]').click()
  })

  // Using tag attribute type as a locator 'button[type="button"]'
  it('allows a project to be edited', () => {
    cy.contains('Table').click()
    cy.contains('td', 'Vuestic').parents('tr').find('button[type="button"]').first().click()
    cy.get('input.va-input__content__input').clear().type('Vuestic!!!', { force: true })
    cy.contains('Save').click()

    cy.get('table tbody tr')
      .first()
      .within(() => {
        cy.get('td').first().should('contain', 'Vuestic!!!')
      })
  })
})
