const { readFile } = require('node:fs/promises')

;(
  async () => {
    console.log('Leyendo primer archivo...')
    const text = await readFile('./archivo.txt', 'utf-8')
    console.log('primer texto: ', text)

    console.log('Haciendo cosas mientras se lee el archivo...')

    console.log('Leyendo segundo archivo...')
    const text2 = await readFile('./archivo2.txt', 'utf-8')
    console.log('primer texto: ', text2)
  }
)()
