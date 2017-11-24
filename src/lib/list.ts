let walkSync = require('walk-sync')
let moment = require('moment')
let fs = require('fs')
let path = require('path')
let Table = require('table')
let md = require('markdown').markdown

import Utils from './utils'

export function list () {
  let path = Utils.getSavePath()
  let output
  let i18n = Utils.getI18n()
  let tableData = [
    [i18n.decision, i18n.modifiedDate, i18n.lastStatus]
  ]

  let files = walkSync.entries(path)
  for (let i = 0;i < files.length; i++) {
    let file = files[i]
    let fileName = file.relativePath
    if (fileName === 'README.md') {
      break
    }
    let fileNameLength = fileName.length
    let numberLength = Utils.DEFAULT_DIGITS + '-'.length
    let markdownWithPrefixLength = '.md'.length

    let index = parseInt(fileName.substring(0, Utils.DEFAULT_DIGITS), 10)
    let filePath = path + fileName
    let lastStatus = getStatus(filePath)
    if (index) {
      let decision = fileName.substring(numberLength, fileNameLength - markdownWithPrefixLength)
      tableData.push(
        [index + '.' + decision, moment(file.mtime).format('YYYY-MM-DD'), lastStatus]
      )
    }
    output = Table.table(tableData)
  }
  console.log(output)

  return output
}

function getStatusSection (tree: any, templateStatusHeader: string) {
  let statusFlag = false
  let statusSection = ['']
  for (let i = 0; i < tree.length; i++) {
    let node = tree[i]
    if (node && node[0] === 'header') {
      if (node[1] && node[1]['level'] && node[1]['level'] === 2) {
        if (node[2] === templateStatusHeader) {
          statusFlag = true
        } else {
          statusFlag = false
        }
      }
    }

    if (statusFlag) {
      statusSection.push(node)
    }
  }
  let removeFirstAndSecondItem = function () {
    if (statusSection.length > 2) {
      statusSection.shift()
      statusSection.shift()
    }
  }

  removeFirstAndSecondItem()
  return statusSection
}

function getStatus (filePath) {
  let fileData
  try {
    fileData = fs.readFileSync(filePath, 'utf8')
  } catch (error) {
    return console.log(error)
  }
  let tree = md.parse(fileData)
  let templateStatusHeader = getTemplateStatusHeader()
  let statusSections = getStatusSection(tree, templateStatusHeader)
  let lastStatusSection = statusSections[statusSections.length - 1]
  if (!(lastStatusSection && lastStatusSection[1])) {
    return ''
  }

  let lastStatusSectionText = lastStatusSection[1]
  let splitSection = lastStatusSectionText.split('\n')
  return splitSection[splitSection.length - 1]
}

function getTemplateStatusHeader () {
  let language = Utils.getLanguage()
  let template = fs.readFileSync(__dirname + path.normalize('/templates/' + language + '.md'), 'utf8')
  let tree = md.parse(template)

  let header2Count = 0
  let statusHeader = ''
  for (let i = 0; i < tree.length; i++) {
    let node = tree[i]
    if (node && node[0] === 'header') {
      if (node[1] && node[1]['level'] && node[1]['level'] === 2) {
        header2Count++
      }
      if (header2Count === 1) {
        statusHeader = node[2]
      }
    }
  }

  return statusHeader
}
