let walkSync = require('walk-sync')

import Utils from './helpers/utils'

export class GenerateBuilder {
  path: string
  files: [{ relativePath: string }]
  startString: string
  endString: string
  bodyString: string[]

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
        handleBody(index, decision, file.relativePath, this.bodyString, files.length)
      }
    }
    return this
  }

  setStartString (startSting: string) {
    this.startString = startSting
    return this
  }

  setEndString (endString?: string) {
    if (endString) {
      this.endString = endString
    } else {
      this.endString = ''
    }
    return this
  }

  build (): string {
    return this.startString + this.bodyString.join('') + this.endString
  }
}
