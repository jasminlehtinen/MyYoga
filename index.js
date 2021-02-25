const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const query = require('./database/poses')
const logger = require('./services/logger')

const app = express()

app.use(bodyParser.json())
app.use(cors())

const port = process.env.PORT

// Routes for REST API
app.get('/api/poses', logger.authenticate, query.getAllPoses)
app.get('/api/poses/:id', logger.authenticate, query.getPoseById)
app.post('/api/poses', logger.authenticate, query.addPose)
app.delete('/api/poses/:id', logger.authenticate, query.deletePose)
app.put("/api/poses/:id", logger.authenticate, query.updatePose)

// Route for login
app.post('/api/login', logger.login)

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`)
})