describe('Login - Interface', () => {
    beforeEach(() => {  //abre a página antes de cada teste.
        cy.visit('/')  //acessa o baseUrl configurado no Cypress.
    })

    it('deve realizar login com credenciais válidas', () => {
        cy.get('#username').type('admin')   //localiza um elemento pelo seletor CSS.
        cy.get('#password').type('123456')  //digita nos campos.
        cy.get('#loginButton').click()

        cy.get('#message')
            .should('be.visible')    //verifica o resultado esperado.
            .and('contain.text', 'Login realizado com sucesso!')
    })

    it('deve realizar login com credenciais inválidas', () => {
        cy.get('#username').type('admin')
        cy.get('#password').type('senhaErrada')
        cy.get('#loginButton').click()

        cy.get('#message')
            .should('be.visible')
            .and('contain.text', 'Usuário ou senha inválidos.')
    })

    it('deve manter a autenticação após atualizar a página', () => {
        cy.get('#username').type('admin')
        cy.get('#password').type('123456')
        cy.get('#loginButton').click()

        cy.get('#message')
            .should('contain.text', 'Login realizado com sucesso!')

        cy.reload()

        cy.get('#message')
            .should('contain.text', 'Usuário autenticado: admin')
    })
})