#!/usr/bin/env node

'use strict'
const helpers = require('./helpers')
const readline = require('readline')
const names = require('random-tree-names')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

let templates = [{ name: 'simple' }, { name: 'api-simple' }]

rl.question('GitHub Username: ', async (usernameAnswer) => {
  let projectName = await names.random('de')
  rl.question(`Project name (${projectName}): `, async (projectNameAnswer) => {
    console.table(templates)
    rl.question(`choose template:`, async (modelAnswer) => {
      const data = {
        projectname: projectNameAnswer || projectName,
        username: usernameAnswer || process.env.USER,
        year: new Date().getFullYear(),
        template: templates[modelAnswer].name,
      }

      helpers.makeProject(data)

      rl.close()
    })
  })
})
