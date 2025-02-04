// These tests use data-cy attributes as locators, as recommended by Cypress best practices documentation.
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
  it('2.1. successfully opens projects as cards', () => {
    cy.getByLocator('cards-option').click()
    cy.getByLocator('card-project-name').should('contain', 'Vuestic')
  })
  it.skip('2.2. successfully opens a table of projects', () => {
    cy.getByLocator('table-option').click()
    cy.contains('8 results')
  })
  it.skip('2.3. contains a project in the table', () => {
    cy.getByLocator('table-option').click()
    cy.getByLocator('project-name').first().should('contain', 'Vuestic')
    cy.getByLocator('project-creation-date').first().should('contain', '20/11/2023')
    cy.getByLocator('edit-project-button').first().click()
  })
  it('2.4. allows a project to be edited', () => {
    cy.getByLocator('table-option').click()
    cy.getByLocator('project-name').first().parents('tr').getByLocator('edit-project-button').first().click()
    // UI library Vuestic does not allow to add data-cy to input component
    // so aria lable is used here
    cy.getByAriaLabel('$t:inputField').clear().type('Vuestic!!!', { force: true })
    cy.getByLocator('save-project-button').click()
    cy.getByLocator('project-row-0').within(() => {
      cy.getByLocator('project-name').should('contain', 'Vuestic!!!')
    })
  })
})
