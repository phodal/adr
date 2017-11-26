let walkSync = require('walk-sync')

import Utils from '../utils'

export class GenerateBuilder {
  path: string
  files: [{ relativePath: string }]
  startString: string | string[]
  endString: string | string[]
  bodyString: string[] | any

  constructor (path: string) {
    this.path = path
    this.bodyString = ['']
    this.files = walkSync.entries(this.path)
  }

  buildBody (handleBody: any) {
    let files = this.files
    for (let i = 0; i < files.length; i++) {
      let file = files[i]
      let fileName = file.relativePath
      let fileNameLength = fileName.length
      let numberLength = Utils.getNumberLength(fileName) + '-'.length
      let markdownWithPrefixLength = '.md'.length
      let index = Utils.getIndexByString(fileName)
      if (index) {
        let decision = fileName.substring(numberLength, fileNameLength - markdownWithPrefixLength)
        handleBody(index, decision, file, this.bodyString, files.length)
      }
    }
    return this
  }

  setStartString (startSting: string | string[]) {
    this.startString = startSting
    return this
  }

  setEndString (endString?: string | string[]) {
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
