const express = require('express')
const bodyParser = require('body-parser')
const query = require('./database/poses')
const logger = require('./services/logger')

const app = express()

app.use(bodyParser.json())

const port = process.env.PORT

// Home page
app.get('/', (req, res) => {
  res.send('My Yoga')
})

// Routes for REST API
app.get('/poses', logger.authenticate, query.getAllPoses)
app.get('/poses/:id', logger.authenticate, query.getPoseById)
app.post('/poses', logger.authenticate, query.addPose)
app.delete('/poses/:id', logger.authenticate, query.deletePose)
app.put("/poses/:id", logger.authenticate, query.updatePose)

// Route for login
app.post('/login', logger.login)

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`)
})