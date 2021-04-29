const db = require('./dbconfig')

const getAllPoses = (req, res) => {
  const query = {
    text: 'SELECT * FROM poses WHERE user_email = $1',
    values: [req.headers.user_email]
  }

  db.query(query, (err, result) => {
    if (err) {
      return console.error('Error executing the query', err.stack)
    } else {
      res.json(result.rows)
    }
  })
}

/*
// Get all poses
const getAllPoses = (req, res) => {
  db.query('SELECT * FROM poses', (err, result) => {
    if (err) {
      console.error(err)
    } else {
      res.json(result.rows)
    }
  })
}
*/

// Get a pose by an id
const getPoseById = (req, res) => {
  const query = {
    text: 'SELECT * FROM poses WHERE id = $1',
    values: [req.params.id]
  }

  db.query(query, (err, result) => {
    if (err) {
      return console.error('Error executing the query', err.stack)
    } else {
      if (result.rows.length > 0) {
        res.json(result.rows)
      } else {
        res.status(404).end()
      }
    }
  })
}

// Add a new pose
const addPose = (req, res) => {
  // Extract information from the request body
  const newPose = req.body

  const query = {
    text: 'INSERT INTO poses (englishname, sanskritname, type, difficulty, link, user_email) VALUES ($1, $2, $3, $4, $5, $6)',
    values: [newPose.englishname, newPose.sanskritname, newPose.type, newPose.difficulty, newPose.link, newPose.user_email]
  }

  db.query(query, (err, res) => {
    if (err) {
      return console.error('Error executing the query', err.stack)
    }
  })

  res.json(newPose)
}

// Delete a pose
const deletePose = (req, res) => {
  const query = {
    text: 'DELETE FROM poses WHERE id = $1',
    values: [req.params.id]
  }

  db.query(query, (err, res) => {
    if (err) {
      return console.error('Error executing the query', err.stack)
    }
  })

  res.status(204).end()
}

// Update a pose
const updatePose = (req, res) => {
  const updatedPose = req.body

  const query = {
    text: 'UPDATE poses SET englishname=$1, sanskritname=$2, type=$3, difficulty=$4, link=$5',
    values: [updatedPose.englishname, updatedPose.sanskritname, updatedPose.type, updatedPose.difficulty, updatedPose.link]
  }

  db.query(query, (err, res) => {
    if (err) {
      return console.error('Error executing the query', err.stack)
    }
  })

  res.json(updatedPose)
}

module.exports = {
  getAllPoses: getAllPoses,
  getPoseById: getPoseById,
  addPose: addPose,
  deletePose: deletePose,
  updatePose: updatePose
}
