import Utils from './utils'
import CSVBuilder from './output/CSVBuilder'
import JSONBuilder from './output/JSONBuilder'
import HtmlBuilder from './output/HtmlBuilder'

let path = Utils.getSavePath()

export function output (type: string): string {
  let output
  let workDir = Utils.getWorkDir()
  let builder

  if (type.toLowerCase() === 'csv') {
    builder = new CSVBuilder(path, workDir)
  } else if (type.toLowerCase() === 'json') {
    builder = new JSONBuilder(path, workDir)
  } else if (type.toLowerCase() === 'html') {
    builder = new HtmlBuilder(path, workDir)
  } else {
    let message = '\n error: type ' + type + ' current not supported'
    console.log(message)
    return message
  }

  output = builder.buildContent()
  builder.output()

  return output
}
