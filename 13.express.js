const express = require('express')
const ditto = require('./ditto.json')

const PORT = process.env.PORT ?? 1234

const app = express()
app.disable('x-powered-by')

app.use((req, res, next) => {
  console.log('request received')
  if (req.method !== 'POST') return next()
  if (req.headers['content-type'] !== 'application/json') return next()

  // Aquí solo llegan request POST con Content-Type: application/json
  let body = ''
  req.on('data', chunk => {
    body += chunk.toString()
  })

  req.on('end', () => {
    const data = JSON.parse(body)
    data.timestamp = Date.now()
    req.body = data
    next()
  })
})

app.get('/', (req, res) => {
  res.status(200).send('<h1>Bienvenido a mi página web</h1>')
})

app.get('/pokemon/ditto', (req, res) => {
  res.json(ditto)
})

app.post('/pokemon', (req, res) => {
  res.json(req.body)
})

// Última ruta que va a comprobar
app.use((req, res) => {
  res.status(404).send('<h1>404 : Página no encontrada</h1>')
})

app.listen(PORT, () => {
  console.log(`server started on http://localhost:${PORT}`)
})
