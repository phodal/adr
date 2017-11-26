let walkSync = require('walk-sync')
let moment = require('moment')

import Utils from './utils'
import Status from './status'

export function output (): string {
  let path = Utils.getSavePath()
  let i18n = Utils.getI18n()
  let csvString = `Index, ${i18n.decision}, ${i18n.modifiedDate}, ${i18n.lastStatus}\n`
  let files = walkSync.entries(path)
  for (let i = 0;i < files.length; i++) {
    let file = files[i]
    let fileName = file.relativePath
    if (fileName === 'README.md') {
      break
    }
    let numberLength = Utils.getNumberLength(fileName) + '-'.length
    let index = Utils.getIndexByString(fileName)
    if (index) {
      let lastStatus = Status.getLatestStatus(path + fileName)
      let decision = fileName.substring(numberLength, fileName.length - '.md'.length)
      let body = `${index}, ${decision}, ${moment(file.mtime).format('YYYY-MM-DD')}, ${lastStatus}\n`
      csvString = csvString + body
    }
  }
  console.log(csvString)

  return csvString
}
