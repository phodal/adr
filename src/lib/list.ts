let walkSync = require('walk-sync');
let fs = require('fs')
let moment = require('moment')
let {table} = require('table')
let {getSavePath} = require('./utils')

export function list () {
  let path = getSavePath()
  let output
  let tableData = [
    ['决策', '上次修改时间']
  ];

  let files = walkSync.entries(path)
  for(let i=0;i < files.length; i++) {
    let file = files[i];
    let fileName = file.relativePath
    let fileNameLength = fileName.length
    let numberLength = 4
    let markdownWifhPrefixLength = 3

    let decision = fileName.substring(numberLength, fileNameLength - markdownWifhPrefixLength)
    tableData.push(
      [decision, moment(file.mtime).format('YYYY-MM-DD')]
    )
    output = table(tableData)
  }
  console.log(output)
}
