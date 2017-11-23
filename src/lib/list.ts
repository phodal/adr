let walkSync = require('walk-sync')
let moment = require('moment')
let {table} = require('table')

import Utils from './utils'

export function list () {
  let path = Utils.getSavePath()
  let output
  let tableData = [
    ['决策', '上次修改时间']
  ]

  let files = walkSync.entries(path)
  for (let i = 0;i < files.length; i++) {
    let file = files[i]
    let fileName = file.relativePath
    let fileNameLength = fileName.length
    let numberLength = Utils.DEFAULT_DIGITS + '-'.length
    let markdownWithPrefixLength = '.md'.length

    let index = parseInt(fileName.substring(0, 3), 10)
    if (index) {
      let decision = fileName.substring(numberLength, fileNameLength - markdownWithPrefixLength)
      tableData.push(
        [index + '.' + decision, moment(file.mtime).format('YYYY-MM-DD')]
      )
    }
    output = table(tableData)
  }
  console.log(output)

  return output
}
