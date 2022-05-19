#!/usr/bin/env node

let colors = require('colors')
let version = require('../../package.json').version
const program = require('commander')
  .version(version)

let { create } = require('./lib/create')
let { list } = require('./lib/list')
let { generate } = require('./lib/generate')
let { update } = require('./lib/update')
let { init } = require('./lib/init')
let { logs } = require('./lib/logs')
let { output } = require('./lib/output')
let { search } = require('./lib/search')
let { status } = require('./lib/status')

program
  .command('new <title...>')
  .alias('n')
  .description('create new ADR', {
    title: 'Title of the new ADR to generate'
  })
  .action(titles => {
    titles.forEach(title => create(title))
  })

program
  .command('list')
  .alias('l')
  .description('list all ADR')
  .action(list)

program
  .command('update')
  .alias('u')
  .description('update ADR')
  .action(update)

program
  .command('status <index>')
  .alias('S')
  .description('change one ADR status', {
    index: 'Index of the ADR (see ADR file prefix)'
  })
  .action(status)

program
  .command('generate <type>')
  .alias('g')
  .description('generate toc or graph, default toc', {
    type: 'toc | graph'
  })
  .action(generate)

program
  .command('init <language>')
  .alias('i')
  .description('init ADR with language, e.g. ``adr init en``')
  .action(init)

program
  .command('logs <index>')
  .alias('L')
  .description('list one ADR status logs', {
    index: 'Index of the ADR (see ADR file prefix)'
  })
  .action(logs)

program
  .command('export <format>')
  .alias('o')
  .description('export ADR reporter in HTML, CSV, JSON', {
    format: 'csv | json | html'
  })
  .action(output)

program
  .command('search <keywords>')
  .alias('s')
  .description('search ADRs by keywords')
  .action(search)

program.parse(process.argv)

if (!process.argv.slice(2).length || !process.argv.length) {
  program.outputHelp(colors.green)
}
