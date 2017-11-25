let walkSync = require('walk-sync')

import Utils from './utils'

export class GenerateBuilder {
  path: string
  files: [{relativePath: string}]
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

function generateToc (options?: object) {
  let path = Utils.getSavePath()
  let graphGenerate = new GenerateBuilder(path)
  let header = '# Architecture Decision Records\n'
  let buildBodyFunc = function (index, decision, filePath, bodyString) {
    bodyString[index] = '\n* [' + index + '. ' + decision + '](' + filePath + ')'
    return bodyString
  }
  let results = graphGenerate
    .setStartString(header)
    .setEndString('')
    .buildBody(buildBodyFunc)
    .build()

  if (!(!!options && options['output'])) {
    console.log(results)
  }
  return results
}

function generateGraph () {
  let path = Utils.getSavePath()
  let graphGenerate = new GenerateBuilder(path)
  let header = 'digraph {\n  node [shape=plaintext];'
  let buildBodyFunc = function (index, decision, filePath, bodyString, filesLength) {
    bodyString[index] = '\n  _' + index + ' [label="' + index + '.' + decision + '"; URL="' + filePath + '"]'
    if (index !== 1) {
      bodyString[filesLength + index] = '\n  _' + (index - 1) + ' -> _' + index + ' [style="dotted"];'
    }
    return bodyString
  }
  let results = graphGenerate
    .setStartString(header)
    .setEndString('\n}\n')
    .buildBody(buildBodyFunc)
    .build()

  console.log(results)
  return results
}

export function generate (type, options?: object) {
  if (type === 'toc') {
    return generateToc(options)
  }
  if (type === 'graph') {
    return generateGraph()
  }

  console.log('\n error: type ' + type + ' current not supported')
}
