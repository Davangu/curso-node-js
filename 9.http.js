const http = require('node:http')
const { freePort } = require('./10.free-port.js')

console.log(process.env)

const desiredPort = process.env.PORT ?? 3000

// Creamos el servidor, e indicamos qué responder cuando se reciba una petición
const server = http.createServer((req, res) => {
  console.log('request received')
  res.end('Hello, World!')
})

// Iniciamos el servidor, escuchando en el puerto indicado
freePort(desiredPort).then(port => {
  server.listen(port, () => {
    console.log(`server started on http://localhost:${port}`)
  })
})
