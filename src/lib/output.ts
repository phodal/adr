import Utils from './utils'
import CSVBuilder from './output/CSVBuilder'
import JSONBuilder from './output/JSONBuilder'
import HtmlBuilder from './output/HtmlBuilder'
import Config from './Config'

let path = Config.getSavePath()

export function output (type: string): string {
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

  let output = builder.buildContent()
  builder.output()

  return output
}
