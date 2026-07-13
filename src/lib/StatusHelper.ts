import * as console from 'node:console'

let fs = require('fs')
let asciidoctor = require('@asciidoctor/core')()
const { Remarkable } = require('remarkable')

import Config from './Config'
import Utils from './utils'

let i18n = Utils.getI18n()

interface MarkdownToken {
  type: string
  content?: string
}

function isStatusHeading (node: MarkdownToken, previousNode?: MarkdownToken) {
  return node.type === 'inline' &&
    previousNode &&
    previousNode.type === 'heading_open' &&
    node.content === i18n.Status
}

function getStatusSection (tree: MarkdownToken[]) {
  let statusFlag = false
  let statusSection: string[] = []
  for (let i = 0; i < tree.length; i++) {
    let node = tree[i]
    if (statusFlag && node.type === 'heading_open') {
      return statusSection
    }
    if (statusFlag) {
      if (node.type === 'inline' && node.content) {
        statusSection.push(node.content)
      }
    }
    if (isStatusHeading(node, tree[i - 1])) {
      statusFlag = true
    }
  }
  return statusSection
}

function getAsciidocStatusSection (tree: any) {
  let statusSection: string[] = []

  tree.findBy({ 'section': 'section' }, function (section) {
    if (section.getLevel() === 1 && section.getTitle() === i18n.Status) {
      let content: string[] = []

      section.blocks.forEach((ele) => {
        if (ele.lines && ele.lines.length > 0) {
          content.push(...ele.lines.filter(line => line && line.trim() !== ''))
        }
      })

      if (content.length > 0) {
        statusSection = content // Assigning the content to statusSection
      }
    }
  })

  return statusSection
}

function getStatusWithDate (statusSections: string[]) {
  let status: string[] = []
  for (let i = 0; i < statusSections.length; i++) {
    let currentStatusSection = statusSections[i]
    if (/\d{1,4}-\d{1,2}-\d{1,2}/.test(currentStatusSection)) {
      status.push(currentStatusSection)
    }
  }

  return status
}

function getAsciidocStatusWithDate (statusSections: string[]) {
  let status: string[] = []
  for (let i = 0; i < statusSections.length; i++) {
    let currentStatusSection = statusSections[i]
    if (/\d{1,4}-\d{1,2}-\d{1,2}/.test(currentStatusSection)) {
      status.push(currentStatusSection)
    }
  }

  return status
}

function setStatus (filePath, status) {
  let fileData
  let fileExt = Config.getDocExtension()
  try {
    fileData = fs.readFileSync(filePath, 'utf8')
  } catch (error) {
    console.log(error)
    return []
  }
  let flag = false
  let regExp
  if (fileExt === 'adoc' || fileExt === 'asciidoc') {
    regExp = `== ${i18n.Status}`
  } else {
    regExp = `## ${i18n.Status}`
  }
  let data: string[] = fileData.split('\n')
  for (let i = 0; i < data.length; i++) {
    let line: string = data[i]
    if (flag && (line[0] === '#' || line[0] === '=')) {
      data.splice(i, 0, `${Utils.createDateString()} ${status}`)
      data.splice(i + 1, 0, '')
      return fs.writeFileSync(filePath, data.join('\n'))
    }
    if (line.match(regExp)) flag = true
  }
}

function getAllStatus (filePath): string[] {
  let fileData
  let statusSections
  let status
  let fileExt = Config.getDocExtension()
  try {
    fileData = fs.readFileSync(filePath, 'utf8')
  } catch (error) {
    console.log(error)
    return []
  }
  if (fileExt === 'adoc' || fileExt === 'asciidoc') {
    let tree = asciidoctor.load(fileData, { 'safe': 'safe', 'sourcemap': true })
    statusSections = getAsciidocStatusSection(tree)
    status = getAsciidocStatusWithDate(statusSections)
  } else {
    let tree: MarkdownToken[] = new Remarkable().parse(fileData, {})
    statusSections = getStatusSection(tree)
    status = getStatusWithDate(statusSections)
  }

  if (status.length === 0) {
    let lastStatusSection = statusSections[statusSections.length - 1]
    if (!lastStatusSection) {
      return []
    }
    status = [lastStatusSection]
  }

  return status
}

function getLatestStatus (filePath) {
  let allStatus = getAllStatus(filePath)
  return allStatus[allStatus.length - 1]
}

let StatusHelper = {
  setStatus: setStatus,
  getLatestStatus: getLatestStatus,
  getAllStatus: getAllStatus
}

export default StatusHelper
