const express = require('express')
const cors = require('cors')
const posesQuery = require('./database/poses')
const usersQuery = require('./database/users')
const logger = require('./services/logger')

const app = express()

app.use(express.json())
app.use(cors())

const port = process.env.PORT

// Routes for REST API
app.get('/api/poses', logger.authenticate, posesQuery.getAllPoses)
app.get('/api/poses/:id', logger.authenticate, posesQuery.getPoseById)
app.post('/api/poses', logger.authenticate, posesQuery.addPose)
app.delete('/api/poses/:id', logger.authenticate, posesQuery.deletePose)
app.put("/api/poses/:id", logger.authenticate, posesQuery.updatePose)

// Route for login
app.post('/api/login', logger.login)

// Route for register
app.post('/api/signup', usersQuery.addUser)

app.get('/api/users', usersQuery.getUser)

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`)
})
