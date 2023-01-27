const fs = require('fs').promises
const chalk = require('chalk')
const makeDir = require('make-dir')
const Mustache = require('mustache')
const path = require('path')

exports.successLog = (text) => console.log(`${chalk.green("✅")} ${text}`)
exports.errorLog = (text) => console.log(`${chalk.red("❌")} ${text}`)
exports.infoLog = (text) => console.log(`\n\n${chalk.green(`${text}`)} `)

exports.rreaddir = async (filePath) => {
  const dir = await fs.readdir(filePath)
  const files = await Promise.all(dir.map(async relativePath => {
    const absolutePath = path.join(filePath, relativePath)
    const stat = await fs.lstat(absolutePath)

    return stat.isDirectory() ? rreaddir(absolutePath) : absolutePath
  }))

  return files.flat()
}

exports.makeProject = async (data) => {

  try {

    let dirTemplate = path.resolve(__dirname, "templates")

    const projectFolder = data.projectname
    const githubFolder = `${projectFolder}/.github`

    let templateExist = this.rreaddir(dirTemplate + "/" + data.template)

    templateExist.then(async (fileDir) => {

      await this.createFolder(projectFolder)
      await this.createFolder(githubFolder)

      await Promise.all(fileDir.map(async relativePath => {
        let nameFile = relativePath.split("\\").pop()
        let renderMustache = ["readme.md", "package.json", "license.md"].find(x => x == nameFile)
        const readFile = renderMustache ? Mustache.render(await fs.readFile(relativePath, 'utf8'), data) : await fs.readFile(relativePath, 'utf8')
        await this.createFile(projectFolder, nameFile, readFile)
      }))

      this.infoLog(`Parabéns projeto ${data.projectname} criado com sucesso!`)

    }).catch((err) => {
      this.errorLog("Template not found")
    })

    return (await templateExist).length

  } catch (err) {
    this.errorLog(err)
  }
}

exports.createFolder = async (folder) => {
  await makeDir(folder)
    .then((path) => this.successLog(`${path} created!`))
}

exports.createFile = async (folder, file, content) => {
  await fs.writeFile(`${folder}/${file}`, content)
    .then(() => this.successLog(`${folder}/${file} created!`))
}
