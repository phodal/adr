let fs = require('fs')
let path = require('path')
let md = require('markdown').markdown

import Utils from './utils'

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

function getAllStatus (filePath): string[] {
  let fileData
  try {
    fileData = fs.readFileSync(filePath, 'utf8')
  } catch (error) {
    console.log(error)
    return []
  }
  let tree = md.parse(fileData)
  let templateStatusHeader = getTemplateStatusHeader()
  let statusSections = getStatusSection(tree, templateStatusHeader)
  let lastStatusSection = statusSections[statusSections.length - 1]
  if (!(lastStatusSection && lastStatusSection[1])) {
    return []
  }

  let lastStatusSectionText = lastStatusSection[1]
  let splitSection = lastStatusSectionText.split('\n')

  return splitSection
}

function getLatestStatus (filePath) {
  let allStatus = getAllStatus(filePath)
  return allStatus[allStatus.length - 1]
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

let Status = {
  getLatestStatus: getLatestStatus,
  getAllStatus: getAllStatus
}

export default Status
