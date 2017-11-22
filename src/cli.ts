#!/usr/bin/env node

let program = require('commander')
let version = require('../../package.json').version
let {create} = require('./lib/new')
let {list} = require('./lib/list')

program
    .version(version)
    .usage('[options] <file ...>')
    .option('-n, new <item>', 'Create New Decision', create)
    .option('-l, list', 'List   New Decision', list)
    .parse(process.argv)
