import {GenerateBuilder} from './base/GenerateBuilder'
import Utils from './utils'

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

function generateToc (options?: object): string {
  let path = Utils.getSavePath()
  let graphGenerate = new GenerateBuilder(path)
  let header = '# Architecture Decision Records\n'
  let results = graphGenerate
    .setStartString(header)
    .setEndString('')
    .buildBody(buildTocBodyFun)
    .build()

  if (!(!!options && options['output'])) {
    console.log(results)
  }
  return results
}

function generateGraph (): string {
  let path = Utils.getSavePath()
  let graphGenerate = new GenerateBuilder(path)
  let header = 'digraph {\n  node [shape=plaintext];'
  let results = graphGenerate
    .setStartString(header)
    .setEndString('\n}\n')
    .buildBody(buildGraphBuildFun)
    .build()

  console.log(results)
  return results
}

export function generate (type, options?: object): string {
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
