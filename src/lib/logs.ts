let walkSync = require('walk-sync')

import Utils from './utils'
import Status from './status'

let path = Utils.getSavePath()

let getAllFilesName = function () {
  let outputArray = ['']
  let files = walkSync.entries(path)
  for (let i = 0; i < files.length; i++) {
    let file = files[i]
    let fileName = file.relativePath

    let index = parseInt(fileName.substring(0, Utils.DEFAULT_DIGITS), 10)
    if (index) {
      outputArray[index] = fileName
    }
  }

  return outputArray
}

export function logs (index) {
  let outputArray = getAllFilesName()
  let currentFileName = outputArray[index]
  let filePath = path + currentFileName
  let allStatus = Status.getAllStatus(filePath)
  for (let i = 0; i < allStatus.length; i++) {
    let currentStatus = allStatus[i]
    console.log(currentStatus)
  }
  return allStatus
}
