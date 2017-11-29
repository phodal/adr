import { GenerateBuilder } from './base/GenerateBuilder'

import Utils from './utils'
import Config from './Config'

function buildGraphBuildFun (index, decision, file, bodyString, filesLength): string[] {
  bodyString[index] = '\n  _' + index + ' [label="' + index + '.' + decision + '"; URL="' + file.relativePath + '"]'
  if (index !== 1) {
    bodyString[filesLength + index] = '\n  _' + (index - 1) + ' -> _' + index + ' [style="dotted"];'
  }
  return bodyString
}

function buildTocBodyFun (index, decision, file, bodyString): string[] {
  bodyString[index] = '\n* [' + index + '. ' + decision + '](' + file.relativePath + ')'
  return bodyString
}

function generateToc (options?: {output: boolean}) {
  let path = Config.getSavePath()
  let graphGenerate = new GenerateBuilder(path)
  let header = '# Architecture Decision Records\n'
  let results = graphGenerate
    .setStart(header)
    .setEnd('')
    .setBody(buildTocBodyFun)
    .build()

  if (options && options.output) {
    console.log(results)
  }
  return results
}

function generateGraph () {
  let path = Config.getSavePath()
  let graphGenerate = new GenerateBuilder(path)
  let header = 'digraph {\n  node [shape=plaintext];'
  let results = graphGenerate
    .setStart(header)
    .setEnd('\n}\n')
    .setBody(buildGraphBuildFun)
    .build()

  console.log(results)
  return results
}

export function generate (type, options?: {output: boolean}) {
  if (type === 'toc') {
    return generateToc(options)
  }
  if (type === 'graph') {
    return generateGraph()
  }

  let message = '\n error: type ' + type + ' current not supported'
  console.log(message)
  return message
}
