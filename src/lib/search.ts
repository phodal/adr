let findInFiles = require('find-in-files')
let Table = require('table')

import SearchListGenerateBuilder from './base/SearchListGenerateBuilder'
import Config from './Config'
import Utils from './utils'
import StatusHelper from './StatusHelper'

let savePath = Config.getSavePath()

function buildTocBodyFun (index, decision, file, bodyString): string[] {
  let lastStatus = StatusHelper.getLatestStatus(savePath + file.relativePath)
  let newItem = [index + '.' + decision, lastStatus]
  return bodyString.push(newItem)
}

export function search (keywords) {
  findInFiles.find({ 'term': keywords, 'flags': 'ig' }, savePath, '.md$')
    .then(results => {
      let files: object[] = []
      for (let result in results) {
        files.push({
          relativePath: result.substring(savePath.length, result.length)
        })
      }
      let listGenerateBuilder = new SearchListGenerateBuilder(savePath)
      let i18n = Utils.getI18n()
      let tableData = [i18n.decision, i18n.lastStatus]
      let searchResults = listGenerateBuilder
        .setStart(tableData)
        .setFiles(files)
        .setEnd()
        .setBody(buildTocBodyFun)
        .build()

      console.log(Table.table(searchResults))

      return Table.table(searchResults)
    })

}
