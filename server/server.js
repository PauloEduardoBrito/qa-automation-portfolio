const session = require('express-session')
const express = require('express') // importa o Express, que usaremos para criar o servidor HTTP.
const path = require('path')




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

  if (username === 'admin' && password === '123456') {
    req.session.user = {
      username: username
    }

    return res.status(200).json({
      success: true,
      message: 'Login realizado com sucesso!'
    })
  }

  return res.status(401).json({
    success: false,
    message: 'Usuário ou senha inválidos.'
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

app.listen(PORT, () => {    //inicia o servidor.
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})