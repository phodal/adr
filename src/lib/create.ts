let fs = require('fs')
let path = require('path')
let mkdirp = require('mkdirp')

import Config from './Config'
import Utils from './utils'
import { generate } from './generate'

function getTemplatePath (language: string) {
  const customTemplate = path.join(Config.getSavePath(), 'template.md');
  if (fs.existsSync(customTemplate)) {
    return customTemplate;
  } else {
    return __dirname + path.normalize('/templates/' + language + '.md')
  }
}

function createDecisions (name: string, savePath: string | any | void) {
  let language = Config.getLanguage()
  let raw = fs.readFileSync(getTemplatePath(language), 'utf8')
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
  let savePath = Config.getSavePath()
  let i18n = Utils.getI18n()
  console.log(i18n.logSavePath + savePath)
  mkdirp.sync(savePath)

  createDecisions(name, savePath)
  let toc = generate('toc', { output: false })
  fs.writeFileSync(savePath + 'README.md', toc + '\n')
}
