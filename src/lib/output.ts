import Utils from './utils'
import CSVBuilder from './output/CSVBuilder'
import JSONBuilder from './output/JSONBuilder'
import HtmlBuilder from './output/HtmlBuilder'

let path = Utils.getSavePath()

export function output (type: string): string {
  let output
  let workDir = Utils.getWorkDir()

  if (type.toLowerCase() === 'csv') {
    let csvBuilder = new CSVBuilder(path, workDir)
    output = csvBuilder.buildContent()
    csvBuilder.output()
  } else if (type.toLowerCase() === 'json') {
    let csvBuilder = new JSONBuilder(path, workDir)
    output = csvBuilder.buildContent()
    csvBuilder.output()
  } else if (type.toLowerCase() === 'html') {
    let htmlBuilder = new HtmlBuilder(path, workDir)
    output = htmlBuilder.buildContent()
    htmlBuilder.output()
  } else {
    let message = '\n error: type ' + type + ' current not supported'
    console.log(message)
  }

  return output
}
