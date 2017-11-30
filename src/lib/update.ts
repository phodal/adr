///<reference path="generate.ts"/>
let walkSync = require('walk-sync')
let fs = require('fs')

import Utils from './utils'
import { generate } from './generate'
import Config from './Config'

let savePath = Config.getSavePath()

function generateNewFileName (newIndex: number, title: string | any) {
  let indexString = Utils.createIndexByNumber(newIndex)
  let decisionInfile = Utils.generateFileName(title)
  return indexString + '-' + decisionInfile + '.md'
}

function updateNameByTitle (): void {
  let files = walkSync.entries(savePath, {globs: ['**/*.md'], ignore: ['README.md']})

  for (let i = 0; i < files.length; i++) {
    let file = files[i]
    let fileName = file.relativePath
    let fileData = fs.readFileSync(savePath + fileName, 'utf8')
    let firstLine = fileData.split('\n')[0]
    let title = firstLine.replace(/#\s\d+\.\s/g, '')
    let indexRegex = /#\s(\d+)\.\s/.exec(firstLine)
    let oldIndex
    if (!indexRegex) {
      oldIndex = Utils.getIndexByString(fileName)
      if (!oldIndex) {
        break
      }
    } else {
      oldIndex = indexRegex[1]
    }

    let newIndex = parseInt(oldIndex, 10)
    let newFileName = generateNewFileName(newIndex, title)
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
