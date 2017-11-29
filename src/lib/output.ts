let moment = require('moment')
let fs = require('fs')
let walkSync = require('walk-sync')

import Utils from './utils'
import Status from './status'
import {JsonGenerateBuilder} from './base/JsonGenerateBuilder'
import MdHelper from './helpers/MdHelper'
import CSVBuilder from './output/CSVBuilder'

let path = Utils.getSavePath()

function buildJsonBodyFun (index, decision, file, bodyString): string[] {
  let lastStatus = Status.getLatestStatus(path + file.relativePath)
  let body = {
    index: index,
    decision: decision,
    modifiedDate: moment(file.mtime).format('YYYY-MM-DD'),
    lastStatus: lastStatus
  }
  return bodyString.push(body)
}

function outputJson () {
  let path = Utils.getSavePath()
  let graphGenerate = new JsonGenerateBuilder(path)
  let results = graphGenerate
    .setBody(buildJsonBodyFun)
    .build()

  return JSON.stringify(results)
}

function outputMarkdown () {
  let files = walkSync.entries(path, {globs: ['**/*.md']})
  for (let i = 0; i < files.length; i++) {
    let file = files[i]
    let fileName = file.relativePath
    if (fileName === 'README.md' || fileName.indexOf('.md') === -1) {
      break
    }
    let fileData = fs.readFileSync(path + fileName, 'utf8')
    let firstLine = fileData.split('\n')[0]
    let indexRegex = /#\s(\d+)\.\s/.exec(firstLine)
    if (!indexRegex || indexRegex.length < 1) {
      break
    }

    fs.appendFileSync('output.md', fileData + '\n\n')
  }
}

function outputHtml () {
  outputMarkdown()
  let fileData = fs.readFileSync('output.md', 'utf-8')
  fs.unlinkSync('output.md')

  return MdHelper.mdRender(fileData)
}

export function output (type: string): string {
  let output
  let workDir = Utils.getWorkDir()

  if (type.toLowerCase() === 'csv') {
    let csvOutput = new CSVBuilder(path, workDir)
    output = csvOutput.buildContent()
    csvOutput.output()
  } else if (type.toLowerCase() === 'json') {
    output = outputJson()
    fs.writeFileSync(workDir + '/export.json', output, 'utf-8')
  } else if (type.toLowerCase() === 'markdown') {
    output = outputMarkdown()
  } else if (type.toLowerCase() === 'html') {
    output = outputHtml()
    fs.writeFileSync(workDir + '/export.html', output, 'utf-8')
  } else {
    let message = '\n error: type ' + type + ' current not supported'
    console.log(message)
  }

  return output
}
