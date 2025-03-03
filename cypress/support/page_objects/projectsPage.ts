export class ProjectsPage {
  visit() {
    cy.visit('/projects')
  }

  resetFirstProjectName() {
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
  }

  addNewProject() {
    const now = new Date().toISOString()
    cy.request('POST', 'http://localhost:3000/projects', {
      id: '1e7b566f-27c3-41c9-9a42-a10e3231671c',
      project_name: 'Project-to-be-deleted',
      project_owner: 'a65cbfa0-6802-480d-8bb4-26c549139b03',
      team: [
        'a65cbfa0-6802-480d-8bb4-26c549139b03',
        'a65cbfa0-6802-480d-8bb4-26c549139b03',
        '4e552ab3-a423-4ac1-a021-67cace904667',
      ],
      status: 'archived',
      created_at: now,
      updated_at: '2025-02-03T18:25:20.967393',
    })
  }

  clickCardsButton() {
    return cy.getByLocator('cards-option').click()
  }

  getCardProjectName() {
    return cy.getByLocator('card-project-name')
  }

  clickTableButton() {
    return cy.getByLocator('table-option').click()
  }

  getTableProjectName() {
    return cy.getByLocator('project-name')
  }

  getTableProjectOwnerName() {
    return cy.getByLocator('project-owner-name')
  }

  getTableTeamAvatarLabel(labelName: string) {
    return cy.get(`[label="${labelName}"]`)
  }

  getTableProjectStatus() {
    return cy.get('[class="va-badge__text"]')
  }

  getTableProjectCreationDate() {
    return cy.getByLocator('project-creation-date')
  }

  getTableEditProjectButton() {
    return cy.getByLocator('edit-project-button')
  }

  getTableDeleteProjectButton() {
    return cy.getByLocator('delete-project-button')
  }

  clickFirstEditProjectButton() {
    return cy.getByLocator('edit-project-button').first().click()
  }

  getProjectNameInput() {
    return cy.getByAriaLabel('$t:inputField')
  }

  clickSaveProjectButton() {
    return cy.getByLocator('save-project-button').click()
  }

  getProjectRow() {
    return cy.getByLocator('project-row-0')
  }

  getProjectRowByIndex(index: string) {
    return cy.getByLocator(`project-row-${index}`)
  }

  getProjectInputOwnerField() {
    return cy.get('[class="va-select-content"]').first()
  }

  getModalOkButton() {
    return cy.get('[va-child="okButton"]')
  }

  getAddProjectButton() {
    return cy.getByLocator('add-project-button')
  }
}

export const projectsPage = new ProjectsPage()
