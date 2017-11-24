///<reference path="generate.ts"/>
let walkSync = require('walk-sync')
let fs = require('fs')

import Utils from './utils'
import {generate} from './generate'

let savePath = Utils.getSavePath()

function updateNameByTitle () {
  let files = walkSync.entries(savePath)
  for (let i = 0; i < files.length; i++) {
    let file = files[i]
    let fileName = file.relativePath
    if (fileName === 'README.md') {
      break
    }
    let filePath = savePath + fileName
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
      fs.renameSync(savePath + fileName, savePath + newFileName)
    }
  }
}

function updateToc () {
  let toc = generate('toc', {output: false})
  fs.writeFileSync(savePath + 'README.md', toc)
}

export function update () {
  console.log('update decisions ...')
  updateNameByTitle()
  console.log('update adr toc ...')
  updateToc()
}
