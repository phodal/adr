let walkSync = require('walk-sync')
let fs = require('fs')

import Utils from './utils'

export function update () {
  console.log('will update decisions by content')
  let path = Utils.getSavePath()
  let files = walkSync.entries(path)
  for (let i = 0;i < files.length; i++) {
    let file = files[i]
    let fileName = file.relativePath
    if (fileName === 'README.md') {
      break
    }
    let filePath = path + fileName
    let fileData = fs.readFileSync(filePath, 'utf8')
    let firstLine = fileData.split('\n')[0]
    let title = firstLine.replace(/#\s\d+\.\s/g, '')
    let indexRegex = /#\s(\d+)\.\s/.exec(firstLine)
    if (!indexRegex || indexRegex.length < 1) {
      break
    }

    let indexString = Utils.createIndexByNumber(parseInt(indexRegex[1], 10))
    let decisionInfile = Utils.generateFileName(title)
    let newFileName = indexString + '-' + decisionInfile + '.md'
    if (fileName !== newFileName) {
      console.log(fileName + ' -> ' + newFileName)
      fs.renameSync(path + fileName, path + newFileName)
    }
  }
}
