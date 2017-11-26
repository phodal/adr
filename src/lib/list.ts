let moment = require('moment')
let Table = require('table')

import Utils from './utils'
import Status from './status'
import {GenerateBuilder} from './base/GenerateBuilder'

let path = Utils.getSavePath()

function buildTocBodyFun (index, decision, file, bodyString): string[] {
  let lastStatus = Status.getLatestStatus(path + file.relativePath)
  let newItem = [index + '.' + decision, moment(file.mtime).format('YYYY-MM-DD'), lastStatus]
  return bodyString.push(newItem)
}

function listAdr (): string {
  let path = Utils.getSavePath()
  let i18n = Utils.getI18n()
  let graphGenerate = new GenerateBuilder(path)
  let tableData = [i18n.decision, i18n.modifiedDate, i18n.lastStatus]
  let results = graphGenerate
    .setStartString(tableData)
    .setEndString()
    .buildBody(buildTocBodyFun)
    .build()

  return Table.table(results)
}

export function list (): string {
  let adrs = listAdr()
  console.log(adrs)
  return adrs
}
