import { ProjectsPage } from '../../support/page_objects/projectsPage'
import { updateProjectData } from '../../support/utils'

describe('Projects page', () => {
  const vuesticProjectId = 'bf7b0dab-da5b-4c97-9407-bc02709e9dc3'
  const projectsPage = new ProjectsPage()

  beforeEach(() => {
    cy.fixture('projects.json').as('projectsData')
    cy.intercept('GET', `${Cypress.env('apiUrl')}/projects`, { fixture: 'projects.json' }).as('getProjects')
    cy.fixture('users.json').as('usersData')
    cy.intercept('GET', `${Cypress.env('apiUrl')}/users`, { fixture: 'users.json' }).as('getUsers')
    projectsPage.visit()
  })

  it('5.1. successfully opens projects as cards', () => {
    projectsPage.clickCardsButton()
    projectsPage.getCardProjectName().should('contain', 'Vuestic')
  })

  it('5.2. successfully opens a table of projects', () => {
    projectsPage.clickTableButton()
    cy.contains('8 results')
  })

  it('5.3. contains a project in the table', () => {
    projectsPage.clickTableButton()
    projectsPage.getTableProjectName().first().should('contain', 'Vuestic')
    projectsPage.getTableProjectCreationDate().first().should('contain', '20/02/2025')
    projectsPage.clickFirstEditProjectButton()
  })

  it('5.4. allows a project to be edited', () => {
    cy.intercept('PUT', `${Cypress.env('apiUrl')}/projects/${vuesticProjectId}`, {
      statusCode: 200,
      body: [
        {
          id: 'bf7b0dab-da5b-4c97-9407-bc02709e9dc3',
          project_name: 'Vuestic',
          project_owner: '339cbaac-2731-47a6-b0bb-e68be14addb9',
          team: ['339cbaac-2731-47a6-b0bb-e68be14addb9', 'a65cbfa0-6802-480d-8bb4-26c549139b03'],
          status: 'in progress',
          created_at: '2025-02-20T09:12:51.422619',
          updated_at: '2025-03-03T16:37:03.175182',
        },
      ],
    }).as('updateProject')

    cy.get('@projectsData').then((projects) => {
      const updatedProjects = updateProjectData(projects, { id: vuesticProjectId, project_name: 'Vuestic!!!' })
      cy.intercept('GET', `${Cypress.env('apiUrl')}/projects`, (req) => {
        req.reply({
          statusCode: 200,
          body: updatedProjects,
        })
      }).as('getUpdatedProjects')
    })

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

  it('5.5. contains correct information in all table cells', () => {
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

  // TODO IN PROGRESS
  it.skip('5.6. allows a project to be deleted', () => {
    cy.intercept('DELETE', `${Cypress.env('apiUrl')}/projects/${vuesticProjectId}`, {
      statusCode: 200,
      body: {},
    }).as('deleteProject')
    cy.fixture('projects.json').then((projects) => {
      const updatedProjects = projects.filter((project) => project.project_name !== 'Vuestic')
      cy.intercept('GET', `${Cypress.env('apiUrl')}/projects`, {
        statusCode: 200,
        body: updatedProjects,
      }).as('getUpdatedProjects')
    })

    projectsPage.visit()
    projectsPage.clickTableButton()
    projectsPage.getProjectRowByIndex('0').within(() => {
      projectsPage.getTableProjectName().should('contain', 'Vuestic')
      projectsPage.getTableDeleteProjectButton().click()
    })
    projectsPage.getModalOkButton().click()
    projectsPage.getProjectRowByIndex('0').within(() => {
      projectsPage.getTableProjectName().should('not.contain', 'Vuestic')
    })
  })
})
