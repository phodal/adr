import { getI18n } from './helpers/i18n'
import { init } from './init'

let fs = require('fs')
let moment = require('moment')
let walkSync = require('walk-sync')

let DEFAULT_DIGITS = 4

function getWorkDir () {
  return process.cwd()
}

function getConfig (defaultValue: string) {
  if (!fs.existsSync(getWorkDir() + '/.adr.json')) {
    return 'en'
  }
  let config = fs.readFileSync(getWorkDir() + '/.adr.json', 'utf8')
  try {
    let adrConfig = JSON.parse(config)
    return adrConfig
  } catch (e) {
    console.error(e)
    return defaultValue
  }
}

function getLanguage () {
  let config = getConfig('en')
  if (config && config.language) {
    return config.language
  }
  console.log('no exist .adr.json file, a example: {"path":"doc/adr/","language":"en"}')
  return 'en'
}

function getSavePath (): string {
  let defaultPath = getWorkDir() + '/doc/adr/'
  let config = getConfig(defaultPath)
  if (config && config.path) {
    return config.path
  }
  return defaultPath
}

function createIndexByNumber (num): string {
  let s = '00000000' + num
  return s.substr(s.length - DEFAULT_DIGITS)
}

function getMaxIndex (files: {relativePath: string}[]) {
  let maxNumber = 0
  for (let i = 0; i < files.length; i++) {
    let fileName = files[i].relativePath
    if (fileName === 'README.md') {
      break
    }

    let fileNumber = fileName.substring(0, DEFAULT_DIGITS)
    let currentIndex = parseInt(fileNumber, 10)
    if (currentIndex > maxNumber) {
      maxNumber = currentIndex
    }
  }

  return maxNumber
}

function getLatestIndex (): number {
  let path = getSavePath()
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
}

function getNumberLength (fileName: string): number {
  let numberLength = fileName.split('-')[0]
  return numberLength.length
}

function getIndexByString (fileName: string): number {
  let numberLength = getNumberLength(fileName)
  return parseInt(fileName.substring(0, numberLength), 10)
}

function createDateString (): string {
  return moment().format('YYYY-MM-DD')
}

export default {
  DEFAULT_DIGITS: DEFAULT_DIGITS,
  getSavePath: getSavePath,
  getNewIndexString: getNewIndexString,
  getLatestIndex: getLatestIndex,
  createIndexByNumber: createIndexByNumber,
  getLanguage: getLanguage,
  generateFileName: generateFileName,
  getWorkDir: getWorkDir,
  getI18n: getI18n,
  createDateString: createDateString,
  getNumberLength: getNumberLength,
  getIndexByString: getIndexByString
}
