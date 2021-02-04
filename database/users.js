const db = require('./dbconfig')

// Get user by email
const getUser = (email, next) => {
  const query = {
    text: 'SELECT * FROM users WHERE email = $1',
    values: [email]
  }

  db.query(query, (err, res) => {
    if (err) {
      return console.error('Error executing query', err.stack)
    } else {
      next(res.rows)
    }
  })
}

module.exports = {
  getUser: getUser
}