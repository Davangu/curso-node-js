const http = require('node:http')

const dittoJSON = require('./ditto.json')

const processRequest = (req, res) => {
  const { method, url } = req

  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/ditto':
          res.statusCode = 200
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end(JSON.stringify(dittoJSON))
        case '/contacto':
          res.statusCode = 200
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end('<h1>Contacta conmigo en <a href="mailto:dantoling@ieselgrao.org">contacto</a></h1>')
        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end('<h1>404 : Página no encontrada</h1>')
      }
    case 'POST':
      switch (url) {
        case '/pokemon': {
          let body = ''
          req.on('data', chunk => {
            body += chunk.toString()
          })

          req.on('end', () => {
            const data = JSON.parse(body)
            res.writeHead(201, { 'Content-Type': 'application/json' })
            data.timestamp = Date.now()
            res.end(JSON.stringify(data))
          })
          break
        }
        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end('<h1>404 : Página no encontrada</h1>')
      }
  }
}

const server = http.createServer(processRequest)

server.listen(1234, () => {
  console.log('server started on http://localhost:1234')
})
