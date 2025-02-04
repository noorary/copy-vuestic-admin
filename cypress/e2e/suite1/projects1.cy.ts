// IMPORTANT! These tests are intentionally designed with potentially fragile locators.
import 'cypress-xpath'

describe('Projects page', () => {
  beforeEach(() => {
    // Reset project name
    cy.request('PUT', 'http://localhost:3000/projects/1e7b566f-27c3-41c9-9a42-a10e3231671c', {
      id: '1e7b566f-27c3-41c9-9a42-a10e3231671c',
      project_name: 'Vuestic',
      project_owner: '339cbaac-2731-47a6-b0bb-e68be14addb9',
      team: [
        '339cbaac-2731-47a6-b0bb-e68be14addb9',
        'a65cbfa0-6802-480d-8bb4-26c549139b03',
        '4e552ab3-a423-4ac1-a021-67cace904667',
      ],
      status: 'in progress',
      created_at: '2023-11-20T00:00:00',
      updated_at: '2025-02-03T18:25:20.967393',
    })
    cy.visit('/projects')
  })
  // Using class name as a locator '[class="va-h4 text-center self-stretch overflow-hidden line-clamp-2 text-ellipsis"]'
  it('1.1. successfully opens projects as cards', () => {
    cy.contains('Cards').click()
    cy.get('[class="va-h4 text-center self-stretch overflow-hidden line-clamp-2 text-ellipsis"]')
      .first()
      .should('contain', 'Vuestic')
  })
  // Using button text as a locator 'Table'
  it('1.2. successfully opens a table of projects', () => {
    cy.contains('Table').click()
    cy.contains('8 results')
  })
  // Using XPath as a locator '//table/tbody/tr[1]/td[1]'
  it('1.3. contains a project in the table', () => {
    cy.contains('Table').click()
    cy.xpath('//table/tbody/tr[1]/td[1]').should('contain', 'Vuestic')
    cy.xpath('//table/tbody/tr[1]/td[5]').should('contain', '20/11/2023')
    cy.xpath('//table/tbody/tr[1]/td[6]').click()
  })

  // Using tag attribute type as a locator 'button[type="button"]'
  it('1.4. allows a project to be edited', () => {
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
