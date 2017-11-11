#!/usr/bin/env node

'use strict'
const fs = require('fs')
const readline = require('readline')
const chalk = require('chalk')
const names = require('random-tree-names')
const dirTemplates = `${__dirname}/templates`;

let editorconfigContent = readFile(`${dirTemplates}/editorconfig-template.toml`);
let packageJSONContent = readFile(`${dirTemplates}/packagejson-template.json`);

const successLog = (text) => console.log(`${chalk.green("✔︎")} ${text}`)

function readFile(dirfile){
	fs.readFile(dirfile, 'utf8', (error, data) => {
		if (error) throw error
		return data;
	})
}

function createFolder(folder){
    fs.mkdir(projectName, (error) => {
        if (error) throw error
        successLog(`${folder} folder created!`)
    })
}

function createFile(folder, file, content){
    fs.writeFile(`${folder}/${file}`, `${content}`, (error) => {
        if (error) throw error
        successLog(`${folder}/${file} created!`)
    })
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let projectName = names.random('de')

rl.question(`Project name (${projectName}): `, (answer) => {
    projectName = answer || projectName

    createFolder(projectName);
    createFile(projectName, '.npmrc', 'package-lock=false');
    createFile(projectName, '.gitignore', 'node_modules');
    createFile(projectName, '.editorconfig', editorconfigContent);
    createFile(projectName, '.package.json', packageJSONContent);

    rl.close()
})