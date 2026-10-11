describe('Dashboar - Proteção de acesso', () => {
    it('deve redirecionar para o login quando não autenticado', () => {
        cy.clearCookies()

        cy.visit('/dashboard', {
            failOnStatusCode: false
        })

        cy.url().should('eq', 'http://localhost:3000/')
    })

    it('deve permitir acesso após login válido', () => {
        cy.request('POST', '/api/login', {
            username: 'admin',
            password: '123456'
        })

        cy.visit('/dashboard')

        cy.get('#welcomeMessage')
            .should('be.visible')
            .and('contain.text', 'Bem-vindo, admin!')
    })

    it('não deve exibir o dashboard sen autenticação', () => {
        cy.clearCookies()
        cy.visit('/dashboard', {
            failOnStatusCode: false
        })
        cy.get('h1').should('not.contain.text', 'Dashboard')
    })

})