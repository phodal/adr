let walk = require('walk')
let fs = require('fs')
let moment = require('moment')
let {table} = require('table')
let {getSavePath} = require('./utils')

export function list () {
  let path = getSavePath()
  let walker = walk.walk(path, {})
  let output
  let tableData = [
  ['决策', '上次修改时间']
];

  walker.on('file', function (root, fileStats, next) {
    if (!fileStats.name) {
      next()
    }
    let fileName = fileStats.name
    let fileNameLength = fileName.length
    let numberLength = 4
    let markdownWifhPrefixLength = 3
    let decision = fileStats.name.substring(numberLength, fileNameLength - markdownWifhPrefixLength)
    tableData.push(
      [decision, moment(fileStats.mtime).format('YYYY-MM-DD')]
    )
    output = table(tableData)
    console.log(output)
  })

  walker.on('end', function () {
    console.log(output)
  })
}
