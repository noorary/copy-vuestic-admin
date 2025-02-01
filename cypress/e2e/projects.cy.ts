describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/projects')
    cy.get('h1').should('contain', 'Projects')
  })
})
