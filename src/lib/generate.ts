let walkSync = require('walk-sync')

import Utils from './utils'

function generateToc () {
  let path = Utils.getSavePath()
  let output = '# Architecture Decision Records\n'
  let outputArray = ['']
  let files = walkSync.entries(path)
  for (let i = 0;i < files.length; i++) {
    let file = files[i]
    let fileName = file.relativePath
    let fileNameLength = fileName.length
    let numberLength = Utils.DEFAULT_DIGITS + '-'.length
    let markdownWithPrefixLength = '.md'.length

    let index = parseInt(fileName.substring(0, Utils.DEFAULT_DIGITS), 10)
    if (index) {
      let decision = fileName.substring(numberLength, fileNameLength - markdownWithPrefixLength)
      outputArray[index] = '\n* [' + index + '. ' + decision + '](' + file.relativePath + ')'
    }
  }
  output = output + outputArray.join('')

  console.log(output)
  return output
}

function generateGraph () {
  let path = Utils.getSavePath()
  let output = 'digraph {\n  node [shape=plaintext];'
  let files = walkSync.entries(path)
  for (let i = 0;i < files.length; i++) {
    let file = files[i]
    let fileName = file.relativePath
    let fileNameLength = fileName.length
    let numberLength = Utils.DEFAULT_DIGITS + '-'.length
    let markdownWithPrefixLength = '.md'.length

    let index = parseInt(fileName.substring(0, Utils.DEFAULT_DIGITS), 10)
    if (index) {
      let decision = fileName.substring(numberLength, fileNameLength - markdownWithPrefixLength)
      output = output + '\n  _' + index + ' [label="' + index + '.' + decision + '"; URL="' + file.relativePath + '"]'

      if (index !== 1) {
        output = output + '\n  _' + (index - 1) + ' -> _' + index + ' [style="dotted"];'
      }
    }
  }
  output = output + '\n}\n'
  console.log(output)
  return output
}

export function generate (type) {
  if (type === 'toc') {
    return generateToc()
  }
  if (type === 'graph') {
    return generateGraph()
  }

  console.log('\n error: type ' + type + ' current not supported')
}
