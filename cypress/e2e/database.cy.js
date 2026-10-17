describe('Banco de dados - SQLite', () => {

    it('deve encontrar o usuário admin cadastrado', () =>{
        cy.task('db:findUser', 'admin').then((user) =>{
            expect(user).to.not.be.null
            expect(user).to.have.property('username', 'admin')
            expect(user).to.have.property('id')
        })
    })

    it('não deve encontrar um usuário inexistente', () => {
        cy.task('db:findUser', 'usuario_inexistente').then((user) => {
            expect(user).to.be.null
        })
    })
})