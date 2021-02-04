const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const user = require('../database/users')

// User login
const login = (req, res) => {
  // Extract information from the request body
  const email = req.body.email
  const password = req.body.password

  const loginUser = user.getUser(email, (user) => {
    if (user.length > 0) {
      const hashPassword = user[0].password
      const token = jwt.sign({userId: email}, process.env.SECRET_KEY)

      // Sends the token if password matches
      if (bcrypt.compareSync(password, hashPassword)) {
        res.send({token})
      } else {
        res.sendStatus(400).end()
      }
    } else {
      res.sendStatus(400).end()
    }
  })
}

// User authentication
const authenticate = (req, res, next) => {
  const token = req.header('Authorization')

  if (!token) {
    res.sendStatus(400).end()
  }

  // Verify the received token
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
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