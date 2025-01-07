console.log(process.argv)

process.on('exit', () => {
  console.log('El proceso terminó')
})

console.log(process.cwd())

process.exit(0)
