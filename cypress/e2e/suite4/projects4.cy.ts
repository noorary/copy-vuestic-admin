import { ProjectsPage } from '../../support/page_objects/projectsPage'

describe('Projects page', () => {
  const projectsPage = new ProjectsPage()

  beforeEach(() => {
    projectsPage.resetFirstProjectName()
    cy.intercept('GET', '/api/projects').as('getProjects')
    projectsPage.visit()
  })

  it('4.1. successfully opens projects as cards', () => {
    projectsPage.clickCardsButton()
    projectsPage.getCardProjectName().should('contain', 'Vuestic')
  })

  it('4.2. successfully opens a table of projects', () => {
    projectsPage.clickTableButton()
    cy.contains('8 results')
  })

  it('4.3. contains a project in the table', () => {
    projectsPage.clickTableButton()
    projectsPage.getTableProjectName().first().should('contain', 'Vuestic')
    projectsPage.getTableProjectCreationDate().first().should('contain', '20/02/2025')
    projectsPage.clickFirstEditProjectButton()
  })

  it('4.4. allows a project to be edited', () => {
    projectsPage.clickTableButton()
    projectsPage.getProjectRow().within(() => {
      projectsPage.clickFirstEditProjectButton()
    })
    projectsPage.getProjectNameInput().clear().type('Vuestic!!!', { force: true })
    projectsPage.clickSaveProjectButton()
    projectsPage.getProjectRow().within(() => {
      projectsPage.getTableProjectName().should('contain', 'Vuestic!!!')
    })
  })

  it('4.5. contains correct information in all table cells', () => {
    projectsPage.clickTableButton()
    projectsPage.getProjectRowByIndex('1').within(() => {
      projectsPage.getTableProjectName().should('contain', 'Mood board')
      projectsPage.getTableProjectOwnerName().should('contain', 'Martin Hoff')
      projectsPage.getTableTeamAvatarLabel('Martin Hoff')
      projectsPage.getTableProjectStatus().should('contain', 'IMPORTANT')
      projectsPage.getTableProjectCreationDate().should('contain', '20/02/2025')
      projectsPage.getTableEditProjectButton()
      projectsPage.getTableDeleteProjectButton()
    })
  })

  it('4.6. allows a project to be deleted', () => {
    projectsPage.addNewProject()
    projectsPage.visit()
    projectsPage.clickTableButton()
    projectsPage.getProjectRowByIndex('0').within(() => {
      projectsPage.getTableProjectName().should('contain', 'Project-to-be-deleted')
      projectsPage.getTableDeleteProjectButton().click()
    })
    projectsPage.getModalOkButton().click()
    projectsPage.getProjectRowByIndex('0').within(() => {
      projectsPage.getTableProjectName().should('not.contain', 'Project-to-be-deleted')
    })
  })
})
