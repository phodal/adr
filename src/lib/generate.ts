import {GenerateBuilder} from './GenerateBuilder'
import Utils from './helpers/utils'

function buildGraphBuildFun (index, decision, filePath, bodyString, filesLength) {
  bodyString[index] = '\n  _' + index + ' [label="' + index + '.' + decision + '"; URL="' + filePath + '"]'
  if (index !== 1) {
    bodyString[filesLength + index] = '\n  _' + (index - 1) + ' -> _' + index + ' [style="dotted"];'
  }
  return bodyString
}

function buildTocBodyFun (index, decision, filePath, bodyString) {
  bodyString[index] = '\n* [' + index + '. ' + decision + '](' + filePath + ')'
  return bodyString
}

function generateToc (options?: object) {
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

function generateGraph () {
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

export function generate (type, options?: object) {
  if (type === 'toc') {
    return generateToc(options)
  }
  if (type === 'graph') {
    return generateGraph()
  }

  console.log('\n error: type ' + type + ' current not supported')
}
