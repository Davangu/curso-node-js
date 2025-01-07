const fs = require('node:fs/promises')
const path = require('node:path')
const pc = require('node:picocolors')

const folder = process.argv[2] ?? '.'

async function ls (folder) {
  let files
  try {
    files = await fs.readdir(folder)
  } catch (err) {
    console.error(pc.red(err))
    process.exit(1)
  }
  const filePromise = files.map(async file => {
    const filePath = path.join(folder, file)
    let stats
    try {
      stats = await fs.stat(filePath)
    } catch (err2) {
      console.error(err2)
      process.exit(1)
    }

    // const isDirectory = stats.isDirectory() ? '/' : ''
    const fileType = stats.isFile() ? 'file' : stats.isDirectory() ? 'dir' : 'other'
    const fileSize = stats.size.toString()
    const fileModified = stats.mtime.toLocaleString()

    return `${fileType} ${pc.blue(file.padEnd(20))}  ${fileSize.padStart(10)} ${fileModified}`
  })

  const filesInfo = await Promise.all(filePromise)

  filesInfo.forEach(fileInfo => {
    console.log(fileInfo)
  })
}

ls(folder)
