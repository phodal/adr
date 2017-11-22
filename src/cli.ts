#!/usr/bin/env node

let program = require('commander')
let version = require('../../package.json').version
let {create} = require('./lib/new')

function createDecision (name) {
  create(name)
}

program
    .version(version)
    .usage('[options] <file ...>')
    .option('-n, new <item>', 'Create New Decision', createDecision)
    .parse(process.argv)
