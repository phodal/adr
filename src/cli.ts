#!/usr/bin/env node

let program = require('commander')
let version = require('../../package.json').version
let {create} = require('./lib/create')
let {list} = require('./lib/list')
let {generate} = require('./lib/generate')

program
    .version(version)
    .usage('[options] <file ...>')
    .option('-n, new <item>', 'Create New Decision', create)
    .option('-l, list', 'List New Decision', list)
    .option('-g, generate', 'Generate Toc', generate)
    .parse(process.argv)
