const path = require("path");
const Database = require("better-sqlite3");

const dbPath = path.join(__dirname, "users.db");

const db = new Database(dbPath);

db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL
  )
`).run();

console.log("Database connected at:", dbPath);

module.exports = db;