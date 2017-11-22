#!/usr/bin/env node

let program = require('commander')
let version = require('../../package.json').version
let {create} = require('./lib/create')
let {list} = require('./lib/list')
let {generate} = require('./lib/generate')

program
    .version(version)
    .usage('[options]')
    .option('-n, new <item>', 'create New Decision', create)
    .option('-l, list', 'list New Decision', list)
    .option('-g, generate', 'generate Toc', generate)
    .parse(process.argv)
