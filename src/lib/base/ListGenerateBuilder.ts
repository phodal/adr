let fs = require('fs')

import { GenerateBuilder } from './GenerateBuilder'
import Config from '../Config'
import Utils from '../utils'

let savePath = Config.getSavePath()

export class ListGenerateBuilder extends GenerateBuilder {
  setBody (handleBody: any) {
    let files = this.files
    let bodyString = this.bodyString
    files.forEach( function (file) {
      let fileName = file.relativePath
      let index = Utils.getIndexByString(fileName)
      let fileData = fs.readFileSync(savePath + fileName, 'utf8')
      let firstLine = fileData.split('\n')[0]
      if (index) {
        let decision = firstLine.replace(/#\s\d+\.\s/g, '')
        handleBody(index, decision, file, bodyString, files.length)
      }
    })
    return this
  }
}
