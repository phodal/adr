#!/usr/bin/env node

let program = require('commander')
let version = require('../../package.json').version
let {create} = require('./lib/create')
let {list} = require('./lib/list')
let {generate} = require('./lib/generate')
let {update} = require('./lib/update')
let {init} = require('./lib/init')

program
    .version(version)
    .usage('[options]')
    .option('-init, init <language>', 'init ADR', init)
    .option('-n, new <item>', 'create New Decision', create)
    .option('-l, list', 'list New Decision', list)
    .option('-u, update', 'update decision', update)
    .option('-g, generate <type>', 'generate toc or graph, default toc', generate)
    .parse(process.argv)
