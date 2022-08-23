const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')
const morgan = require('morgan')
const associationsRoutes = require('./routes/associationsRoutes')

app.use(morgan('tiny'))

app.use(cors())

app.use(express.json())

app.use('/associations', associationsRoutes)

app.listen(port, (req, res) => {
  console.log(`Running on port ${port}`)
})