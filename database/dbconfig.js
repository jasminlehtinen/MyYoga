require('custom-env').env()

const { Pool } = require('pg')

// A new pool with configurations
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD
})

module.exports = {
  query: (text, params) => pool.query(text, params)
}
