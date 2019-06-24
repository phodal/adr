let walkSync = require('walk-sync')
let inquirer = require('inquirer')

import Utils from './utils'
import StatusHelper from './StatusHelper'
import Config from './Config'

let path = Config.getSavePath()
let i18n = Utils.getI18n()

let getAllFilesName = function (): string[] {
  let outputArray = ['']
  let files = walkSync.entries(path, { globs: ['**/*.md'] })
  files.forEach(function (file) {
    let fileName = file.relativePath

    let index = Utils.getIndexByString(fileName)
    if (index) {
      outputArray[index] = fileName
    }
  })

  return outputArray
}

export function status (index): void {
  let fileName = getAllFilesName()[index]
  let status = StatusHelper.getLatestStatus(path + fileName)
  let statusList = i18n.statusStr.split('/')
  inquirer.prompt([{
    type: 'list',
    name: 'status',
    message: `${fileName}(${status}) new status:`,
    choices: statusList
  }]).then(answer => {
    StatusHelper.setStatus(path + fileName, answer.status)
  })
}
