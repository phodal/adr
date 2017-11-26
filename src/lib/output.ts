let moment = require('moment')
let fs = require('fs')

import Utils from './utils'
import Status from './status'
import {GenerateBuilder} from './base/GenerateBuilder'

let path = Utils.getSavePath()
function buildTocBodyFun (index, decision, file, bodyString): string[] {
  let lastStatus = Status.getLatestStatus(path + file.relativePath)
  let body = `${index}, ${decision}, ${moment(file.mtime).format('YYYY-MM-DD')}, ${lastStatus}\n`
  return bodyString.push(body)
}

function listAdr () {
  let path = Utils.getSavePath()
  let i18n = Utils.getI18n()
  let graphGenerate = new GenerateBuilder(path)
  let startString = `Index, ${i18n.decision}, ${i18n.modifiedDate}, ${i18n.lastStatus}\n`
  let results = graphGenerate
    .setStartString(startString)
    .setEndString('')
    .buildBody(buildTocBodyFun)
    .build()

  return results
}

export function output (type: string): string {
  let output
  if (type === 'csv') {
    output = listAdr()
    console.log(output)
    let workDir = Utils.getWorkDir()
    fs.writeFileSync(workDir + '/export.csv', output, 'utf-8')
  }

  let message = '\n error: type ' + type + ' current not supported'
  console.log(message)
  return output
}
