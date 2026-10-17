const db = require('./db')
const bcrypt = require('bcryptjs')

const username = 'admin'
const password = '123456'

const passwordHash = bcrypt.hashSync(password, 10)

const upsertUser = db.prepare(`
  INSERT INTO users (username, password)
  VALUES (?, ?)
  ON CONFLICT(username)
  DO UPDATE SET password = excluded.password
`)

upsertUser.run(username, passwordHash)

console.log('Usuário de teste cadastrado com senha protegida.')

db.close()