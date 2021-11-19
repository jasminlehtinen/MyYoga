const db = require('./dbconfig')
const bcrypt = require('bcrypt')

// Get user by id
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

// Get all users
const getAllUsers = (req, res) => {
  const query = {
    text: 'SELECT * FROM users'
  }

  db.query(query, (err, result) => {
    if (err) {
      return console.error('Error executing the query', err.stack)
    } else {
      res.json(result.rows)
    }
  })
}

// Create a new user
const addUser = (req, res) => {
  const user = req.body
  const email = req.body.email
  const password = req.body.password

  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  const hashPassword = bcrypt.hashSync(password, salt)

  const query = {
    text: 'INSERT INTO users (email, password) VALUES ($1, $2)',
    values: [email, hashPassword]
  }

  db.query(query, (err, res) => {
    if (err) {
      return console.error('Error executing query', err.stack)
    }
  })

  res.json(user)
}

module.exports = {
  getUser: getUser,
  getAllUsers: getAllUsers,
  addUser: addUser
}
