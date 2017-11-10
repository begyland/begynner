#!/usr/bin/env node

'use strict'
const fs = require('fs')
const readline = require('readline')
const chalk = require('chalk')
const names = require('random-tree-names')

// TODO: refactor: avoid duplicate
let editorconfigContent
let packageJSONContent

fs.readFile(`${__dirname}/templates/editorconfig-template.toml`, 'utf8', (error, data) => {
	if (error) throw error
	editorconfigContent = data
})

fs.readFile(`${__dirname}/templates/packagejson-template.json`, 'utf8', (error, data) => {
	if (error) throw error
	packageJSONContent = data
})

const successLog = (text) => console.log(`${chalk.green("✔︎")} ${text}`)

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})

let projectName = names.random('de')

rl.question(`Project name (${projectName}): `,  (answer) => {
	projectName = answer || projectName

	fs.mkdir(projectName, (error) => {
		if (error) throw error
		successLog(`${projectName} folder created!`)
	})

	// TODO: refactor: avoid duplicate
	fs.writeFile(`${projectName}/.npmrc`, 'package-lock=false', (error) => {
		if (error) throw error
		successLog(`${projectName}/.npmrc created!`)
	})

	fs.writeFile(`${projectName}/.gitignore`, 'node_modules', (error) => {
		if (error) throw error
		successLog(`${projectName}/.gitiginore created!`)
	})

	fs.writeFile(`${projectName}/.editorconfig`, editorconfigContent, (error) => {
		if (error) throw error
		successLog(`${projectName}/.editorconfig created!`)
	})

	fs.writeFile(`${projectName}/package.json`, packageJSONContent, (error) => {
		if (error) throw error
		successLog(`${projectName}/package.json created!`)
	})

	rl.close()
})
