const path = require('node:path')

// barra separadora
console.log(path.sep)

// unir rutas
const filePath = path.join('content', 'subfolder', 'test.txt')
console.log(filePath)

// obtener el nombre del archivo
const base = path.basename(filePath)
console.log(base)

// obtener la ruta absoluta
const absolute = path.resolve(__dirname, 'content', 'subfolder', 'test.txt')

// conocer la extension del archivo
const ext = path.extname(absolute)

console.log(ext)
