///<reference path="AbstractBuilder.ts"/>
import { AbstractBuilder } from './AbstractBuilder'

import Utils from '../utils'
import getAdrFiles from '../helpers/getAdrFiles'
import * as walkSync from 'walk-sync'
import Config from '../Config'

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
      let fileExt = Config.getDocExtension()
      let fileNameLength = fileName.length
      let numberLength = Utils.getNumberLength(fileName) + '-'.length
      let fileExtLength = ('.'+fileExt).length
      let index = Utils.getIndexByString(fileName)
      if (index) {
        let decision = fileName.substring(numberLength, fileNameLength - fileExtLength)
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
