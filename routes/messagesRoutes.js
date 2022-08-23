const express = require('express')
const app = express()
const moment = require('moment')
const messages = require('../messages.json')
const { verifyAssociation } = require('../middlewares/associationsMW')

app.get('/', (req, res) => {
  const sorted = messages.sort((a, b) => {
    return moment(b.time).format('x') - moment(a.time).format('x')
  })
  res.json(sorted).status(201)
})

app.post('/', (req, res) => {
  const time = moment().format()
  const { slug, name, message } = req.body

  const messageInfo = {
    slug,
    name,
    message,
    time
  }

  messages.push(messageInfo)
  res.status(201).json("Message added successfully")
})

app.get('/:slug', verifyAssociation, (req, res) => {
  const associationMessages = messages.filter(message => message.slug === req.params.slug)
  res.json(associationMessages).status(201)
})




module.exports = app