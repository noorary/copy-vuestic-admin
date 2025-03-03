import { ProjectsPage } from '../../support/page_objects/projectsPage'

describe('Projects page', () => {
  const projectsPage = new ProjectsPage()

  beforeEach(() => {
    projectsPage.resetFirstProjectName()
    projectsPage.visit()
  })

  it('3.1. successfully opens projects as cards', () => {
    projectsPage.clickCardsButton()
    projectsPage.getCardProjectName().should('contain', 'Vuestic')
  })

  it('3.2. successfully opens a table of projects', () => {
    projectsPage.clickTableButton()
    cy.contains('8 results')
  })

  it('3.3. contains a project in the table', () => {
    projectsPage.clickTableButton()
    projectsPage.getTableProjectName().first().should('contain', 'Vuestic')
    projectsPage.getTableProjectCreationDate().first().should('contain', '20/11/2023')
    projectsPage.clickFirstEditProjectButton()
  })

  it('3.4. allows a project to be edited', () => {
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
})
