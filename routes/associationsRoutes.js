const express = require('express')
const app = express()
const associations =  require('../associations')
const { verifyAssociation } = require('../middlewares/associationsMW')


app.get('/', (req, res) => {
  res.json(associations)
})

app.get('/:slug', verifyAssociation, (req, res) => {
  res.json(req.association)
})



module.exports = app