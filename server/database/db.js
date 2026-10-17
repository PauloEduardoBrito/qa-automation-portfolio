const Database = require('better-sqlite3')
const path = require('path')

const dbPath = path.join(__dirname, 'qa-automation.db')
const db = new Database(dbPath)

db.pragma('foreign_keys = ON')

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  )
`)

module.exports = db