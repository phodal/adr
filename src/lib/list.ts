let moment = require('moment')
let Table = require('table')

import Utils from './utils'
import Status from './status'
import { ListGenerateBuilder } from './base/ListGenerateBuilder'

let path = Utils.getSavePath()

function buildTocBodyFun (index, decision, file, bodyString): string[] {
  let lastStatus = Status.getLatestStatus(path + file.relativePath)
  let newItem = [index + '.' + decision, moment(file.mtime).format('YYYY-MM-DD'), lastStatus]
  return bodyString.push(newItem)
}

function listAdr (): string {
  let path = Utils.getSavePath()
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
