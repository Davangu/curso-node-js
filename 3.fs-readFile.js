const fs = require('node:fs')

console.log('Leyendo primer archivo...')
fs.readFile('./archivo.txt', 'utf-8', (_err, text) => {
  console.log('primer texto: ', text)
})

console.log('Leyendo segundo archivo...')
fs.readFile('./archivo2.txt', 'utf-8', (_err, text2) => {
  console.log('segundo texto: ', text2)
})
