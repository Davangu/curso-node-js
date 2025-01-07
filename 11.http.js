const http = require('node:http')
const fs = require('node:fs')

const desiredPort = process.env.PORT ?? 1337

// Función que gestiona la respuesta del servidor
const processRequest = (req, res) => {
  if (req.url === '/') {
    res.statusCode = 200 // OK
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end('<h1>Bienvenido a mi página web</h1>')
  } else if (req.url === '/imagen.png') {
    res.statusCode = 200 // OK
    res.setHeader('Content-Type', 'image/png')
    fs.readFile('./image.png', (err, data) => {
      if (err) {
        res.statusCode = 500 // Internal Server Error
        res.end('<h1>500 : Internal Server Error</h1>')
      } else {
        res.end(data)
      }
    })
  } else if (req.url === '/contacto') {
    res.statusCode = 200 // OK
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end('<h1>Contacta conmigo en <a href="mailto:dantoling@ieselgrao.org">contacto</a></h1>')
  } else {
    res.statusCode = 404 // Not found
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end('<h1>404 : Página no encontrada</h1>')
  }
}

// Creamos el servidor, e indicamos qué responder cuando se reciba una petición
const server = http.createServer(processRequest)

// Iniciamos el servidor, escuchando en el puerto indicado
server.listen(desiredPort, () => {
  console.log(`server started on http://localhost:${desiredPort}`)
})
