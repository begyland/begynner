const fs = require('fs').promises
const chalk = require('chalk')
const makeDir = require('make-dir')
const Mustache = require('mustache')
const path = require('path')

exports.successLog = (text) => console.log(`${chalk.green('✅')} ${text}`)
exports.errorLog = (text) => console.log(`${chalk.red('❌')} ${text}`)
exports.infoLog = (text) => console.log(`\n\n${chalk.green(`${text}`)} `)

exports.rreaddir = async (filePath) => {
  const dir = await fs.readdir(filePath)
  const files = await Promise.all(
    dir.map(async (relativePath) => {
      const absolutePath = path.join(filePath, relativePath)
      const stat = await fs.lstat(absolutePath)

      return stat.isDirectory() ? rreaddir(absolutePath) : absolutePath
    })
  )

  return files.flat()
}

exports.makeProject = async (data) => {
  try {
    const dirTemplateModel = path.resolve(__dirname, 'templates/_model')
    const dirTemplate = path.resolve(__dirname, 'templates')
    const { projectName, template } = data

    const projectFolder = projectName

    const templatePath = await this.rreaddir(`${dirTemplate}/${template}`)
    const modelPath = await this.rreaddir(dirTemplateModel)

    const filePath = [...templatePath, ...modelPath]

    if (!filePath) {
      this.errorLog('Template not found')
    }

    await this.createFolder(projectFolder)
    await this.createFolder(`${projectFolder}/.github`)

    await Promise.all(
      filePath.map(async (relativePath) => {
        const nameFile = relativePath.split('/').pop()

        const renderMustache = ['README.md', 'package.json', 'LICENSE.md'].find(
          (file) => file === nameFile
        )

        const readFile = renderMustache
          ? Mustache.render(await fs.readFile(relativePath, 'utf8'), data)
          : await fs.readFile(relativePath, 'utf8')

        await this.createFile(projectFolder, nameFile, readFile)
      })
    )

    this.infoLog(
      `Congratulations project ${projectFolder} successfully created!`
    )

    return true
  } catch (err) {
    this.errorLog(err)
  }
}

exports.createFolder = async (folder) => {
  await makeDir(folder)
    .then((path) => this.successLog(`${path} created!`))
}

exports.createFile = async (folder, file, content) => {
  await fs
    .writeFile(`${folder}/${file}`, content)
    .then(() => this.successLog(`${folder}/${file} created!`))
}
