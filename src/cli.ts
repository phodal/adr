#!/usr/bin/env node

let program = require('commander')
let colors = require('colors')
let version = require('../../package.json').version

let {create} = require('./lib/create')
let {list} = require('./lib/list')
let {generate} = require('./lib/generate')
let {update} = require('./lib/update')
let {init} = require('./lib/init')
let {logs} = require('./lib/logs')
let {output} = require('./lib/output')

program
  .version(version)
  .usage('[options]')
  .option('-n, new <item>', 'create new ADR', create)
  .option('-l, list', 'list all ADR', list)
  .option('-u, update', 'update ADR', update)
  .option('-g, generate <type>', 'generate toc or graph, default toc', generate)
  .option('-init, init <language>', 'init ADR with language, e.g. ``adr init en``', init)
  .option('-logs, logs <index>', 'list one ADR status logs', logs)
  .option('-o, export <format>', 'export ADR reporter in HTML, CSV, JSON, Markdown', output)

program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp(colors.green)
}

if (!process.argv.length) {
  program.outputHelp(colors.green)
}
