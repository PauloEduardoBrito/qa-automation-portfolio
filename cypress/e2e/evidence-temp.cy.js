describe('Validação de evidências no CI', () => {
  it('deve gerar screenshot quando falhar', () => {
    cy.visit('/')
    cy.get('#elemento-que-nao-existe')
      .should('be.visible')
  })
})
