let moment = require('moment')
let Table = require('table')

import Utils from './utils'
import StatusHelper from './StatusHelper'
import { ListGenerateBuilder } from './base/ListGenerateBuilder'
import Config from './Config'

let path = Config.getSavePath()

function buildTocBodyFun (index, decision, file, bodyString): string[] {
  let lastStatus = StatusHelper.getLatestStatus(path + file.relativePath)
  let newItem = [index + '.' + decision, moment(file.mtime).format('YYYY-MM-DD'), lastStatus]
  return bodyString.push(newItem)
}

function listAdr (): string {
  let path = Config.getSavePath()
  let i18n = Utils.getI18n()
  let tableData = [i18n.decision, i18n.modifiedDate, i18n.lastStatus]
  let listGenerateBuilder = new ListGenerateBuilder(path)
  let results = listGenerateBuilder
    .setStart(tableData)
    .setEnd()
    .setBody(buildTocBodyFun)
    .build()

  return Table.table(results)
}

export function list (): string {
  let adrs = listAdr()
  // TODO: not to remove again
  console.log(adrs)
  return adrs
}
