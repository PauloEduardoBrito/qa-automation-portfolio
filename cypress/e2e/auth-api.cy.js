
describe('API de Autenticação', () => {

  it('deve rejeitar acesso quando não há sessão autenticada', () => {
    cy.request({
      method: 'GET',
      url: '/api/me',
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401)
      expect(response.body.authenticated).to.eq(false)
      expect(response.body.message).to.eq(
        'Usuário não autenticado.'
      )
    })
  })

  it('deve reconhecer o usuário após o login', () => {
    cy.request('POST', '/api/login', {
        username: 'admin',
        password: '123456',
    }).then((loginResponse) => {
        expect(loginResponse.status).to.eq(200)
        expect(loginResponse.body.success).to.eq(true)
    })

    cy.request('GET', '/api/me').then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.authenticated).to.eq(true)
        expect(response.body.user.username).to.eq('admin')
    })
  })
})