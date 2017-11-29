let fs = require('fs')
let path = require('path')
let md = require('markdown').markdown

import Utils from './utils'

function getStatusSection (tree: any, templateStatusHeader: string) {
  let statusFlag = false
  let statusSection: string[] = []
  for (let i = 0; i < tree.length; i++) {
    let node = tree[i]
    let hasHeader2 = node && node[0] === 'header' && node[1] && node[1]['level'] && node[1]['level'] === 2

    if (hasHeader2) {
      statusFlag = node[2] === templateStatusHeader
    }

    if (statusFlag) {
      statusSection.push(node)
    }
  }

  return statusSection
}

function getStatusWithDate (statusSections: string[]) {
  let status: string[] = []
  for (let i = 0; i < statusSections.length; i++) {
    let currentStatusSection = statusSections[i]
    if (currentStatusSection[0] === 'para') {
      if (/\d{1,4}-\d{1,2}-\d{1,2}/.test(currentStatusSection[1])) {
        status.push(currentStatusSection[1])
      }
    }
  }

  return status
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
  let statusSections = getStatusSection(tree, getTemplateStatusTitle())
  let status = getStatusWithDate(statusSections)

  if (status.length === 0) {
    let lastStatusSection = statusSections[statusSections.length - 1]
    if (!(lastStatusSection && lastStatusSection[1])) {
      return []
    }
    status = [lastStatusSection[1]]
  }

  return status
}

function getLatestStatus (filePath) {
  let allStatus = getAllStatus(filePath)
  return allStatus[allStatus.length - 1]
}

function getStatusHeader (tree: any) {
  let header2Count = 0
  let statusHeader = ''
  for (let i = 0; i < tree.length; i++) {
    let node = tree[i]
    if (node && node[0] === 'header') {
      let hasHeader2 = node[1] && node[1]['level'] && node[1]['level'] === 2
      if (hasHeader2) {
        header2Count++
      }
      let isFirstHeader2 = header2Count === 1
      if (isFirstHeader2) {
        statusHeader = node[2]
      }
    }
  }
  return statusHeader
}

function getTemplateStatusTitle () {
  let language = Utils.getLanguage()
  let template = fs.readFileSync(__dirname + path.normalize('/templates/' + language + '.md'), 'utf8')
  let tree = md.parse(template)

  return getStatusHeader(tree)
}

let Status = {
  getLatestStatus: getLatestStatus,
  getAllStatus: getAllStatus
}

export default Status
