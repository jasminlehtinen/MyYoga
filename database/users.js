const db = require('./dbconfig')
const bcrypt = require('bcrypt')

// Get user by email
const getUser = (email, next) => {
  const query = {
    text: 'SELECT * FROM users WHERE email = $1',
    values: [email]
  }

  db.query(query, (err, result) => {
    if (err) {
      return console.error('Error executing query', err.stack)
    } else {
      next(result.rows)
    }
  })
}

// Get all users
const getAllUsers = (req, res) => {
  const query = {
    text: 'SELECT * FROM users'
  }

  db.query(query, (err, result) => {
    if (err) {
      return console.error('Error executing the query', err.stack)
    } else {
      return res.json(result.rows)
    }
  })
}

// Create a new user
const addUser = (req, res) => {
  // Extract information from the request body
  const user = req.body
  const email = req.body.email
  const password = req.body.password

  // Generates a secure, salted hash of a password, which is then stored in the database
  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  const hashPassword = bcrypt.hashSync(password, salt)

  const query = {
    text: 'INSERT INTO users (email, password) VALUES ($1, $2)',
    values: [email, hashPassword]
  }

  db.query(query, (err) => {
    if (err) {
      return console.error('Error executing query', err.stack)
    } else {
      res.json(user)
    }
  })
}

module.exports = {
  getUser: getUser,
  getAllUsers: getAllUsers,
  addUser: addUser
}
