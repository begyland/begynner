#!/usr/bin/env node

'use strict'
const fs = require('fs')
const readline = require('readline')
const chalk = require('chalk')
const names = require('random-tree-names')
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

const successLog = (text) => console.log(`${chalk.green("✔︎")} ${text}`)

const readFile = (file) => fs.readFileSync(file, 'utf8')

const createFolder = (folder) => {
	fs.mkdirSync(folder)
	successLog(`${folder} folder created!`)
}

const createFile = (folder, file, content) => {
	fs.writeFileSync(`${folder}/${file}`, content)
	successLog(`${folder}/${file} created!`)
}

let projectName = names.random('de')

rl.question(`Project name (${projectName}): `, (answer) => {
	const dirTemplates = `${__dirname}/templates`
	const codeOfConductContent = readFile(`${dirTemplates}/code_of_conduct-template.md`)
	const contributingContent = readFile(`${dirTemplates}/contributing-template.md`)
	const editorconfigContent = readFile(`${dirTemplates}/editorconfig-template.ini`)
	const gitignoreContent = readFile(`${dirTemplates}/gitignore-template.txt`)
	const issueTemplateContent = readFile(`${dirTemplates}/issue_template-template.md`)
	const licenseContent = readFile(`${dirTemplates}/license-template.md`)
	const npmrcContent = readFile(`${dirTemplates}/npmrc-template.ini`)
	const packageContent = readFile(`${dirTemplates}/package-template.json`)
	const readmeContent = readFile(`${dirTemplates}/readme-template.md`)
	const travisContent = readFile(`${dirTemplates}/travis-template.yml`)
	const projectFolder = answer || projectName
	const githubFolder = `${projectFolder}/.github`

	createFolder(projectFolder)
	createFolder(githubFolder)
	createFile(projectFolder, 'code_of_conduct.md', codeOfConductContent)
	createFile(projectFolder, 'contributing.md', contributingContent)
	createFile(projectFolder, '.editorconfig', editorconfigContent)
	createFile(projectFolder, '.gitignore', gitignoreContent)
	createFile(githubFolder, 'issue_template.md', issueTemplateContent)
	createFile(projectFolder, 'license.md', licenseContent)
	createFile(projectFolder, '.npmrc', npmrcContent)
	createFile(projectFolder, 'package.json', packageContent)
	createFile(projectFolder, 'readme.md', readmeContent)
	createFile(projectFolder, '.travis.yml', travisContent)

	rl.close()
})
