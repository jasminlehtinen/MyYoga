const jwt = require('jsonwebtoken')
const user = require('../database/users')
const bcrypt = require('bcrypt')

// User login
const login = (req, res) => {
  // Extract information from the request body
  const email = req.body.email
  const password = req.body.password

  const loginUser = user.getUser(email, (user) => {
    // Checks if the user exists
    if (user.length > 0) {
      // Password hash retrieved
      const hashPassword = user[0].password
      // Creates JSON Web Token for the user
      const token = jwt.sign({userId: email}, process.env.SECRET_KEY)

      // Sends the token if password matches
      if (bcrypt.compareSync(password, hashPassword)) {
        res.send({token, email})
      } else {
        res.sendStatus(400).end()
      }
    } else {
      res.sendStatus(404).end()
    }
  })
}

// User authentication
const authenticate = (req, res, next) => {
  const token = req.header('Authorization')

  // Status code 400 if token variable is missing
  if (!token) {
    res.sendStatus(400).end()
  }

  // Verify the received token
  jwt.verify(token, process.env.SECRET_KEY, (err) => {
    if (err) {
      res.sendStatus(400).end()
    } else {
      next()
    }
  })
}

module.exports = {
  login: login,
  authenticate: authenticate
}
