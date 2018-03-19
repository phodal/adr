let moment = require('moment')
let Table = require('table')
let colors = require('colors/safe')

import Utils from './utils'
import StatusHelper from './StatusHelper'
import { ListGenerateBuilder } from './base/ListGenerateBuilder'
import Config from './Config'
import StatusColor from './enum/StatusColor'

let path = Config.getSavePath()

export function getStatusColor (lastStatus: string) {
  let allStatus = Utils.getI18n()['status']
  let color: string | undefined = ''
  if (!allStatus) {
    return StatusColor.get('done')
  }
  Object.keys(allStatus).forEach(function (statusKey) {
    if (allStatus[statusKey] === lastStatus) {
      color = StatusColor.get(statusKey)
    }
  })
  return color
}

function getStatusWithColor (lastStatus: string) {
  if (!lastStatus) {
    return lastStatus
  }
  let originLastStatus = lastStatus
  let splitStatus = lastStatus.split(' ')
  if (splitStatus.length > 1) {
    lastStatus = splitStatus[splitStatus.length - 1].replace(' ', '')
  }
  let color = getStatusColor(lastStatus)
  if (color) {
    let ColorText = colors[color]
    return originLastStatus = ColorText(originLastStatus)
  }

  return originLastStatus
}

function buildTocBodyFun (index, decision, file, bodyString): string[] {
  let lastStatus = StatusHelper.getLatestStatus(path + file.relativePath)
  let newItem = [index + '.' + decision, moment(file.mtime).format('YYYY-MM-DD'), getStatusWithColor(lastStatus)]
  return bodyString.push(newItem)
}

function listAdrByPath (path: string): string {
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
  let path = Config.getSavePath()
  let adrs = listAdrByPath(path)
  // TODO: not to remove again
  console.log(adrs)
  return adrs
}
