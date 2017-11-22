let walk = require('walk')
let fs = require('fs')
let moment = require('moment')
let {getSavePath} = require('./utils')

export function list () {
  let path = getSavePath()
  let walker = walk.walk(path, {})

  console.log('|                  决策         |  上次修改时间|')
  console.log('|------------------------------| -----------|')
  walker.on('file', function (root, fileStats, next) {
    if(!fileStats.name) {
      next();
    }
    let fileName = fileStats.name
    let fileNameLength = fileStats.name.length
    let numberLength = 4;
    let markdownWifhPrefixLength = 3;
    let decision = fileStats.name.substring(numberLength, fileNameLength - markdownWifhPrefixLength)
    console.log('| ' + decision + ' | ' +  moment(fileStats.mtime).format('YYYY-MM-DD')  + '|')
  })

  walker.on("end", function () {
    console.log("all done")
  })
}
