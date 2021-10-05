const fs = require('fs').promises
const chalk = require('chalk')
const makeDir = require('make-dir')

exports.successLog = (text) => console.log(`${chalk.green("✔︎")} ${text}`)

exports.readFile = async (file) => (
  fs.readFile(file, 'utf8')
    .then((fileContent) => fileContent)
)

exports.createFolder = async (folder) => {
  await makeDir(folder)
    .then((path) => this.successLog(`${path} created!`))
}

exports.createFile = async (folder, file, content) => {
  await fs.writeFile(`${folder}/${file}`, content)
    .then(() => this.successLog(`${folder}/${file} created!`))
}
