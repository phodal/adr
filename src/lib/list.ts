let walkSync = require('walk-sync')
let moment = require('moment')
let Table = require('table')

import Utils from './utils'
import Status from './status'

export function list () {
  let path = Utils.getSavePath()
  let output
  let i18n = Utils.getI18n()
  let tableData = [
    [i18n.decision, i18n.modifiedDate, i18n.lastStatus]
  ]

  let files = walkSync.entries(path)
  for (let i = 0;i < files.length; i++) {
    let file = files[i]
    let fileName = file.relativePath
    if (fileName === 'README.md') {
      break
    }
    let fileNameLength = fileName.length
    let numberLength = Utils.getNumberLength(fileName) + '-'.length
    let markdownWithPrefixLength = '.md'.length

    let index = Utils.getIndexByString(fileName)
    let lastStatus = Status.getLatestStatus(path + fileName)
    if (index) {
      let decision = fileName.substring(numberLength, fileNameLength - markdownWithPrefixLength)
      let body = [index + '.' + decision, moment(file.mtime).format('YYYY-MM-DD'), lastStatus];
      tableData.push(body)
    }
  }
  output = Table.table(tableData)
  console.log(output)

  return output
}
