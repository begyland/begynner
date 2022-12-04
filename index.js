#!/usr/bin/env node

'use strict'
const helpers = require('./helpers')
const readline = require('readline')
const names = require('random-tree-names')
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

rl.question('GitHub username: ', async (usernameAnswer) => {
  let projectName = await names.random('de');
  rl.question(`Project name (${projectName}): `, async (projectNameAnswer) => {
    rl.question(`choose template: `, async (modelAnswer) => {

      const data = {
        projectname: projectNameAnswer || projectName || "simple_project",
        username: usernameAnswer || 'username',
        year: (new Date().getFullYear()),
        template: modelAnswer || "simple"
      }

      helpers.makeProject(data);

      rl.close();
    })
  })
})


