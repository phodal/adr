let walkSync = require('walk-sync')
let moment = require('moment')
let fs = require('fs')

import Utils from './utils'
import Status from './status'

function generateCsv () {
  let path = Utils.getSavePath()
  let i18n = Utils.getI18n()
  let csvString = `Index, ${i18n.decision}, ${i18n.modifiedDate}, ${i18n.lastStatus}\n`
  let files = walkSync.entries(path)
  for (let i = 0; i < files.length; i++) {
    let file = files[i]
    let fileName = file.relativePath
    if (fileName === 'README.md') {
      break
    }
    let numberLength = Utils.getNumberLength(fileName) + '-'.length
    let index = Utils.getIndexByString(fileName)
    if (index) {
      let decision = fileName.substring(numberLength, fileName.length - '.md'.length)
      let lastStatus = Status.getLatestStatus(path + fileName)
      let body = `${index}, ${decision}, ${moment(file.mtime).format('YYYY-MM-DD')}, ${lastStatus}\n`
      csvString = csvString + body
    }
  }

  return csvString
}

export function output (type: string): string {
  let output
  if (type === 'csv') {
    output = generateCsv()
    let workDir = Utils.getWorkDir()
    // console.log(csv)
    fs.writeFileSync(workDir + '/export.csv', output, 'utf-8')
  }

  let message = '\n error: type ' + type + ' current not supported'
  console.log(message)
  return output
}
