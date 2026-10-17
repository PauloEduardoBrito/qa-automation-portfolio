const session = require('express-session')
const express = require('express') // importa o Express, que usaremos para criar o servidor HTTP.
const path = require('path')
const bcrypt = require('bcryptjs')
const db = require('./database/db')

const app = express() //cria a aplicação do servidor.
const PORT = 3000 //define a porta em que o servidor escutará.

app.use(express.json()) // permite interpretar requisições com corpo JSON.

app.use(express.static('app')) //permite que o Express entregue os arquivos da pasta app ao navegador. Assim, a página index.html poderá ser acessada pela rota /.

app.use(session({
  secret: 'qa-automation-secret', //assina o cookie de sessão. O valor acima é apenas para desenvolvimento local.
  resave: false,    //evita salvar novamente a sessão sem necessidade.
  saveUninitialized: false,  //não cria sessões vazias.
  cookie: {
    httpOnly: true,     // impede que o JavaScript do navegador leia diretamente o cookie.
    sameSite: 'lax',    // ajuda a reduzir o envio do cookie em algumas requisições entre sites.
    secure: false,      // permite o uso de cookie em HTTP local; em produção com HTTPS, normalmente deve ser true.
    maxAge: 30 * 60 * 1000   // define a duração do cookie em 30 minutos.
  }
}))

app.get('/api/health', (reg, res) => {   //cria uma rota para verificar se o servidor está funcionando.
    res.status(200).json({      //responde com HTTP 200 e um objeto JSON.
        status: 'ok',
        message: 'Servidor funcionando'
    })
})

app.post('/api/login', (req, res) => {
  const { username, password } = req.body

  if (
    typeof username !== 'string' ||
    typeof password !== 'string' ||
    !username ||
    !password
  ) {
    return res.status(400).json({
      success: false,
      message: 'Usuário e senha são obrigatórios.'
    })
  }

  const user = db.prepare(`
    SELECT id, username, password
    FROM users
    WHERE username = ?
  `).get(username)

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({
      success: false,
      message: 'Usuário ou senha inválidos.'
    })
  }

  req.session.user = {
    id: user.id,
    username: user.username
  }

  return res.status(200).json({
    success: true,
    message: 'Login realizado com sucesso!'
  })
})


app.get('/api/me', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({
      authenticated: false,
      message: 'Usuário não autenticado.'
    })
  }

  return res.status(200).json({
    authenticated: true,
    user: req.session.user
  })
})

app.get('/dashboard', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/')
  }

  return res.sendFile(
    path.join(__dirname, '../private/dashboard.html')
  )
})

app.post('/api/logout', (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({
        success: false,
        message: 'Erro ao encerrar a sessão.'
      })
    }

    res.clearCookie('connect.sid')

    return res.status(200).json({
      success: true,
      message: 'Logout realizado com sucesso!'
    })
  })
})

app.listen(PORT, () => {    //inicia o servidor.
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})