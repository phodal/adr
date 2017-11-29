let fs = require('fs')
let path = require('path')
let mkdirp = require('mkdirp')

import Utils from './utils'
import { generate } from './generate'

function createDecisions (name: string, savePath: string | any | void) {
  let language = Utils.getLanguage()
  let raw = fs.readFileSync(__dirname + path.normalize('/templates/' + language + '.md'), 'utf8')
  let newDate = Utils.createDateString()
  let fileName = Utils.generateFileName(name)

  let newIndex = Utils.getNewIndexString()
  let fileData = raw.replace(/{NUMBER}/g, Utils.getLatestIndex() + 1)
    .replace(/{TITLE}/g, name)
    .replace(/{DATE}/g, newDate)

  let filePath = savePath + newIndex + '-' + fileName + '.md'
  fs.writeFileSync(filePath, fileData)
}

export function create (name: string) {
  let savePath = Utils.getSavePath()
  let i18n = Utils.getI18n()
  console.log(i18n.logSavePath + savePath)
  mkdirp.sync(savePath)

  createDecisions(name, savePath)
  let toc = generate('toc', {output: false})
  fs.writeFileSync(savePath + 'README.md', toc)
}
