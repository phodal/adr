let moment = require('moment')
let fs = require('fs')

import Utils from './utils'
import Status from './status'
import {GenerateBuilder} from './base/GenerateBuilder'
import {JsonGenerateBuilder} from './base/JsonGenerateBuilder'

let path = Utils.getSavePath()
function buildCsvBodyFun (index, decision, file, bodyString): string[] {
  let lastStatus = Status.getLatestStatus(path + file.relativePath)
  let body = `${index}, ${decision}, ${moment(file.mtime).format('YYYY-MM-DD')}, ${lastStatus}\n`
  return bodyString.push(body)
}

function outputCsv () {
  let path = Utils.getSavePath()
  let i18n = Utils.getI18n()
  let graphGenerate = new GenerateBuilder(path)
  let startString = `Index, ${i18n.decision}, ${i18n.modifiedDate}, ${i18n.lastStatus}\n`
  let results = graphGenerate
    .setStart(startString)
    .setEnd('')
    .setBody(buildCsvBodyFun)
    .build()

  return results
}

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

export function output (type: string): string {
  let output
  switch (type.toLowerCase()) {
    case 'csv':
      output = outputCsv()
      fs.writeFileSync(Utils.getWorkDir() + '/export.csv', output, 'utf-8')
      break
    case 'json':
      output = outputJson()
      let workDir = Utils.getWorkDir()
      fs.writeFileSync(workDir + '/export.json', output, 'utf-8')
      break
    default:
      let message = '\n error: type ' + type + ' current not supported'
      console.log(message)
  }

  return output
}
