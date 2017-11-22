#!/usr/bin/env node

let program = require('commander')
let version = require('../../package.json').version
let fs = require('fs')
let path = require('path')

function parseInput (file) {
  console.log(file)
  return ''
}

program
    .version(version)
    .usage('[options] <file ...>')
    .option('-i  [value]', 'An integer argument', parseInput)
    .parse(process.argv)
