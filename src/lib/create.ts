let fs = require('fs')
let path = require('path')
let mkdirp = require('mkdirp')

import Utils from './utils'
import {generate} from './generate'

function createDecisions (name: string, savePath: string | any | void) {
  let language = Utils.getLanguage()
  let raw = fs.readFileSync(__dirname + path.normalize('/templates/' + language + '.md'), 'utf8')
  let dateObj = new Date()
  let month = dateObj.getUTCMonth() + 1
  let day = dateObj.getUTCDate()
  let year = dateObj.getUTCFullYear()
  let newDate = year + '/' + month + '/' + day
  let fileName = Utils.generateFileName(name)

  let newIndex = Utils.getNewIndex()
  let result = raw.replace(/{NUMBER}/g, Utils.getLastNumber() + 1)
    .replace(/{TITLE}/g, name)
    .replace(/{DATE}/g, newDate)

  fs.writeFileSync(savePath + newIndex + '-' + fileName + '.md', result)

  let toc = generate('toc', {output: false})
  fs.writeFileSync(savePath + 'README.md', toc)
}

export function create (name: string) {
  let savePath = Utils.getSavePath()
  console.log('保存的路径是：' + savePath)
  mkdirp(savePath, function (err) {
    if (err) console.error(err)
    else createDecisions(name, savePath)
  })
}
