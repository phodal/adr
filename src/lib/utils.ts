import { getI18n } from './helpers/i18n'
import Config from './Config'

let moment = require('moment')
let walkSync = require('walk-sync')

function getWorkDir () {
  return process.cwd()
}

function createIndexByNumber (num): string {
  let s = '00000000' + num
  return Config.getPrefix() + s.substr(s.length - Config.getDigits())
}

function getMaxIndex (files: {relativePath: string}[]) {
  let maxNumber = 0
  for (let i = 0; i < files.length; i++) {
    let fileName = files[i].relativePath
    if (fileName === 'README.md') {
      break
    }

    let fileNumber = fileName.substring(0, Config.getDigits())
    let currentIndex = parseInt(fileNumber, 10)
    if (currentIndex > maxNumber) {
      maxNumber = currentIndex
    }
  }

  return maxNumber
}

function getLatestIndex (): number {
  let path = Config.getSavePath()
  let files = walkSync.entries(path, {globs: ['**/*.md']})

  if (!(files && files.length > 0)) {
    return 0
  }

  return getMaxIndex(files)
}

function getNewIndexString (): string {
  let lastIndex = getLatestIndex()
  if (!lastIndex) {
    return createIndexByNumber(1)
  }
  lastIndex = lastIndex + 1
  return createIndexByNumber(lastIndex)
}

function generateFileName (originFileName) {
  return originFileName.toLowerCase().trim()
    .replace(/[\s_-]+/g, '-') // swap any length of whitespace, underscore, hyphen characters with a single _
    .replace(/^-+|-+$/g, '') // remove leading, trailing -
    .replace(/，/g, '')
    .replace(/。/g, '')
    .replace(/ /g, '-')
    .replace(/\?/g, '-')
    .replace(/#/g, '')
    .replace(/:/g, '')
    .replace(/# /g, '')
}

function getNumberLength (fileName: string): number {
  let numberLength = fileName.split('-')[0]
  return numberLength.length
}

function getIndexByString (fileName: string): number {
  let numberLength = getNumberLength(fileName)
  let prefixLength = Config.getPrefix().length
  return parseInt(fileName.substring(prefixLength, numberLength + prefixLength), 10)
}

function createDateString (): string {
  return moment().format('YYYY-MM-DD')
}

let Utils = {
  getNewIndexString: getNewIndexString,
  getLatestIndex: getLatestIndex,
  createIndexByNumber: createIndexByNumber,
  generateFileName: generateFileName,
  getWorkDir: getWorkDir,
  getI18n: getI18n,
  createDateString: createDateString,
  getNumberLength: getNumberLength,
  getIndexByString: getIndexByString
}

export default Utils
