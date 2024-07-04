///<reference path="AbstractBuilder.ts"/>
let fs = require('fs')
import { AbstractBuilder } from './AbstractBuilder'

import Config from '../Config'
import Utils from '../utils'
import getAdrFiles from '../helpers/getAdrFiles'
import * as walkSync from 'walk-sync'

let savePath = Config.getSavePath()

export class GenerateBuilder implements AbstractBuilder {
  path: string
  files: walkSync.Entry[]
  startString: string | string[]
  endString: string | string[]
  bodyString: string[] | any

  constructor (path: string) {
    this.path = path
    this.bodyString = ['']
    this.files = getAdrFiles()
  }

  setBody (handleBody: any) {
    let files = this.files
    let bodyString = this.bodyString
    this.files.forEach(function (file) {
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

  setStart (startSting: string | string[]) {
    this.startString = startSting
    return this
  }

  setEnd (endString?: string | string[]) {
    if (endString) {
      this.endString = endString
    } else if (typeof endString === 'string') {
      this.endString = ''
    }
    return this
  }

  build () {
    if (typeof this.startString === 'string') {
      return this.startString + this.bodyString.join('') + this.endString
    }
    if (typeof this.startString === 'object') {
      let results: string[][] = []
      results.push(this.startString)
      for (let i = 0; i < this.bodyString.length; i ++) {
        let currentBodyString = this.bodyString[i]
        if (currentBodyString) {
          results.push(currentBodyString)
        }
      }
      return results
    }
    return ''
  }
}
