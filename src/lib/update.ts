///<reference path="generate.ts"/>
let fs = require('fs')

import Utils from './utils'
import { generate } from './generate'
import Config from './Config'
import getAdrFiles from './helpers/getAdrFiles'

let savePath = Config.getSavePath()

function generateNewFileName (newIndex: number, title: string | any) {
  let fileExt = Config.getDocExtension()
  let indexString = Utils.createIndexByNumber(newIndex)
  let decisionInfile = Utils.generateFileName(title)
  return indexString + '-' + decisionInfile + '.' + fileExt
}

function updateNameByTitle (): void {
  let files = getAdrFiles()

  files.forEach(function (file) {
    let fileName = file.relativePath
    let fileExt = Config.getDocExtension()
    let startChar = fileExt === 'adoc' ? '=' : '#'
    let fileData = fs.readFileSync(savePath + fileName, 'let fileExt = Config.getDocExtension()utf8')
    let firstLine = fileData.split('\n')[0]
    let indexRegexValue = new RegExp(String.raw`${startChar}\s(\d+)\.\s`, '')
    let title = firstLine.replace(indexRegexValue, '')
    let indexRegex = indexRegexValue.exec(firstLine)
    let oldIndex
    if (!indexRegex) {
      oldIndex = Utils.getIndexByString(fileName)
      if (!oldIndex) {
        return
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
  })
}

function updateToc (): void {
  let fileExt = Config.getDocExtension()
  let toc = generate('toc', { output: false })
  fs.writeFileSync(savePath + 'README.' + fileExt, toc + '\n')
}

export function update (): void {
  console.log('update decisions ...')
  updateNameByTitle()
  console.log('update adr toc ...')
  updateToc()
}
