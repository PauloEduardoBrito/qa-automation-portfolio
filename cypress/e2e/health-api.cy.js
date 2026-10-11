
describe('API de Saúde do Servidor', () => {

  it('deve confirmar que o servidor está funcionando', () => {
    cy.request('GET', '/api/health').then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.status).to.eq('ok')
      expect(response.body.message).to.eq(
        'Servidor funcionando'
      )
    })
  })
})