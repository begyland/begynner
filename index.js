#!/usr/bin/env node

'use strict'
const helpers = require('./helpers')
const readline = require('readline')
const names = require('random-tree-names')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

let templates = [
  {
    name: 'simple',
    template: 'A simple node.js script.'
  },
  {
    name: 'API',
    template: 'A node.js API using express framework.'
  }
]

rl.question('GitHub user name: ', async (userNameAnswer) => {
  let projectName = await names.random('de')

  rl.question(`Project name (${projectName}): `, async (projectNameAnswer) => {
    console.table(templates)

    rl.question('Choose a template: ', async (modelAnswer) => {
      const data = {
        projectName: projectNameAnswer || projectName,
        userName: userNameAnswer || 'johnDoe',
        year: new Date().getFullYear(),
        template: templates[modelAnswer].name,
      }

      helpers.makeProject(data)

      rl.close()
    })
  })
})
