import inquirer from 'inquirer'

import Utils from './utils'
import StatusHelper from './StatusHelper'
import Config from './Config'
import getAdrFiles from './helpers/getAdrFiles'

let path = Config.getSavePath()
let i18n = Utils.getI18n()

const getAllFilesName = (): string[] => getAdrFiles().map(item => item.relativePath)

export const status = async (index): Promise<void> => {
  const prefix = Config.getPrefix()
  let fileName = getAllFilesName().find((item => item.includes(`${prefix ? prefix : ''}${index}-`)))
  if (!fileName) {
    console.error(`File with index ${index} does not exist.`)
    process.exit()
  }
  let status = StatusHelper.getLatestStatus(path + fileName)
  let statusList = i18n.statusStr.split('/')
  const answer = await inquirer.prompt([{
    type: 'list',
    name: 'status',
    message: `${fileName}(${status}) new status:`,
    choices: statusList
  }])
  StatusHelper.setStatus(path + fileName, answer.status)
}
