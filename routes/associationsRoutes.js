const express = require('express')
const app = express()
const associations =  require('../associations')
const moment = require('moment')
const messages = require('../messages.json')
const { verifyAssociation } = require('../middlewares/associationsMW')


app.get('/', (req, res) => {
  res.json(associations)
})

app.get('/association/:slug', verifyAssociation, (req, res) => {
  res.json(req.association)
})

// app.post('/association/:slug', verifyAssociation, (req, res) => {
app.post('/contact', (req, res) => {
  const time = moment().format('lll')
  const { slug, name, message } = req.body

  const messageInfo = {
    slug,
    name,
    message,
    time
  }

  messages.unshift(messageInfo)
  res.status(201).json("Message added successfully")
})

app.get('/association/:slug/messages', verifyAssociation, (req, res) => {
  const associationMessages = messages.filter(message => message.slug === req.params.slug)
  res.json(associationMessages).status(201)
})

app.get('/messages', (req, res) => {
  res.json(messages).status(201)
})


module.exports = app