let walkSync = require('walk-sync')
let Table = require('table')

import Utils from './helpers/utils'
import Status from './status'

let path = Utils.getSavePath()

let getAllFilesName = function () {
  let outputArray = ['']
  let files = walkSync.entries(path)
  for (let i = 0; i < files.length; i++) {
    let file = files[i]
    let fileName = file.relativePath

    let index = Utils.getIndexByString(fileName)
    if (index) {
      outputArray[index] = fileName
    }
  }

  return outputArray
}

function createLogsHeader (allStatus: string[]) {
  let tableHeader: string[] = []

  let currentStatus = allStatus[0]
  let splitCurrentStatus = currentStatus.split(' ')

  for (let i = 0; i < splitCurrentStatus.length; i++) {
    tableHeader.push(' - ')
  }

  return tableHeader
}
function createLogsBody (allStatus: string[], tableData: string[][]) {
  for (let i = 0; i < allStatus.length; i++) {
    let tableHeader: string[] = []
    let currentStatus = allStatus[i]
    let splitCurrentStatus = currentStatus.split(' ')
    for (let i = 0; i < splitCurrentStatus.length; i++) {
      tableHeader.push(splitCurrentStatus[i])
    }
    tableData.push(tableHeader)
  }
  return tableData
}

export function logs (index) {
  let outputArray = getAllFilesName()
  let currentFileName = outputArray[index]
  let filePath = path + currentFileName
  let allStatus = Status.getAllStatus(filePath)
  let tableData: string[][] = []

  let tableHeader = createLogsHeader(allStatus)
  tableData.push(tableHeader)
  createLogsBody(allStatus, tableData)
  let output = Table.table(tableData)

  console.log(output)
  return output
}
