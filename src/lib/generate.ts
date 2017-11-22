let walkSync = require('walk-sync')

import Utils from './utils'

export function generate () {
  let path = Utils.getSavePath()
  let output = '# Architecture Decision Records\n'
  let files = walkSync.entries(path)
  for (let i = 0;i < files.length; i++) {
    let file = files[i]
    let fileName = file.relativePath
    let fileNameLength = fileName.length
    let numberLength = 4
    let markdownWithPrefixLength = 3

    let index = parseInt(fileName.substring(0, 3), 10)
    if (index) {
      let decision = fileName.substring(numberLength, fileNameLength - markdownWithPrefixLength)
      output = output + '\n* [' + index + '. ' + decision + '](' + file.relativePath + ')'

    }
  }

  console.log(output)
  return output
}
