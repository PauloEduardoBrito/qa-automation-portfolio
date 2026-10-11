
describe('API de Login', () => {
  it('deve autenticar com credenciais válidas', () => {
    cy.request({
      method: 'POST',
      url: '/api/login',
      body: {
        username: 'admin',
        password: '123456',
      },
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.success).to.eq(true)
      expect(response.body.message).to.eq(
        'Login realizado com sucesso!'
      )
    })
  })

  it('deve rejeitar credenciais inválidas', () => {
    cy.request({
      method: 'POST',
      url: '/api/login',
      body: {
        username: 'admin',
        password: 'senhaErrada',
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401)
      expect(response.body.success).to.eq(false)
      expect(response.body.message).to.eq(
        'Usuário ou senha inválidos.'
      )
    })
  })
})