#!/usr/bin/env node

'use strict'
const helpers = require('./helpers')
const readline = require('readline')
const names = require('random-tree-names')
const Mustache = require('mustache')
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

rl.question('GitHub username: ', async (usernameAnswer) => {
  let projectName = await names.random('de')

  rl.question(`Project name (${projectName}): `, async (projectNameAnswer) => {
    const dirTemplates = `${__dirname}/templates`
    projectName = projectNameAnswer || projectName

    const data = {
      projectname: projectName,
      username: usernameAnswer || 'username',
      year: (new Date().getFullYear()),
    }

    const indexContent = await helpers.readFile(`${dirTemplates}/index.js`)
    const codeOfConductContent = await helpers.readFile(`${dirTemplates}/code_of_conduct-template.md`)
    const contributingContent = await helpers.readFile(`${dirTemplates}/contributing-template.md`)
    const editorconfigContent = await helpers.readFile(`${dirTemplates}/editorconfig-template.ini`)
    const gitignoreContent = await helpers.readFile(`${dirTemplates}/gitignore-template.txt`)
    const issueTemplateContent = await helpers.readFile(`${dirTemplates}/issue_template-template.md`)
    const licenseContent = Mustache.render(await helpers.readFile(`${dirTemplates}/license-template.md`), data)
    const packageContent = Mustache.render(await helpers.readFile(`${dirTemplates}/package-template.json`), data)
    const readmeContent = Mustache.render(await helpers.readFile(`${dirTemplates}/readme-template.md`), data)
    const projectFolder = projectName
    const githubFolder = `${projectFolder}/.github`

    await helpers.createFolder(projectFolder)
    await helpers.createFolder(githubFolder)
    await helpers.createFile(projectFolder, 'index.js', indexContent)
    await helpers.createFile(projectFolder, 'code_of_conduct.md', codeOfConductContent)
    await helpers.createFile(projectFolder, 'contributing.md', contributingContent)
    await helpers.createFile(projectFolder, '.editorconfig', editorconfigContent)
    await helpers.createFile(projectFolder, '.gitignore', gitignoreContent)
    await helpers.createFile(githubFolder, 'issue_template.md', issueTemplateContent)
    await helpers.createFile(projectFolder, 'license.md', licenseContent)
    await helpers.createFile(projectFolder, 'package.json', packageContent)
    await helpers.createFile(projectFolder, 'readme.md', readmeContent)

    rl.close()
  })
})
