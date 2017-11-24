#!/usr/bin/env node

let program = require('commander')
let version = require('../../package.json').version
let {create} = require('./lib/create')
let {list} = require('./lib/list')
let {generate} = require('./lib/generate')
let {update} = require('./lib/update')
let {init} = require('./lib/init')
let colors = require('colors')
let inquirer = require('inquirer')
let prompt = inquirer.createPromptModule()

program
  .version(version)
  .usage('[options]')
  .option('-n, new <item>', 'create new ADR', create)
  .option('-l, list', 'list all ADR', list)
  .option('-u, update', 'update ADR', update)
  .option('-g, generate <type>', 'generate toc or graph, default toc', generate)

program.command('-init, init [language]', 'init ADR with language, e.g. ``adr init en``')
  .action((env, options) => {
    if (env === 'status') {
      return program.outputHelp(colors.green)
    }
    if (typeof options === 'string') {
      init(options)
    } else {
      prompt([
        {
          type: 'checkbox',
          message: 'Language',
          name: 'language',
          choices: [
            {
              name: '中文',
              value: 'zh-cn'
            },
            {
              name: 'English',
              value: 'en'
            }
          ],
          validate: function (answer) {
            if (answer.length < 1) {
              return 'You must choose at least one language.'
            }
            return true
          }
        }
      ]).then(results => {
        init(results)
      })
    }
  })

program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp(colors.green)
}
