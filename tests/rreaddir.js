const fs = require('fs').promises
const path = require('path')

async function rreaddir(filePath) {
  const dir = await fs.readdir(filePath)
  const files = await Promise.all(
    dir.map(async relativePath => {
      const absolutePath = path.join(filePath, relativePath)
      const stat = await fs.lstat(absolutePath)

      return stat.isDirectory() ? rreaddir(absolutePath) : absolutePath
    })
  )

  return files.flat()
}

rreaddir(`${__dirname}/../templates/simple`)
  .then(result => console.log(result))
