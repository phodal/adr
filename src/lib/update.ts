///<reference path="generate.ts"/>
let walkSync = require('walk-sync')
let fs = require('fs')

import Utils from './utils'
import {generate} from './generate'

let savePath = Utils.getSavePath()

function updateNameByTitle (): void {
  let files = walkSync.entries(savePath)
  for (let i = 0; i < files.length; i++) {
    let file = files[i]
    let fileName = file.relativePath
    if (fileName === 'README.md') {
      break
    }
    let fileData = fs.readFileSync(savePath + fileName, 'utf8')
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

function updateToc (): void {
  let toc = generate('toc', {output: false})
  fs.writeFileSync(savePath + 'README.md', toc)
}

export function update (): void {
  console.log('update decisions ...')
  updateNameByTitle()
  console.log('update adr toc ...')
  updateToc()
}
