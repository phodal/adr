let fs = require('fs')
let walkSync = require('walk-sync')

import {init} from './init'

let DEFAULT_DIGITS = 3

function getWorkDir () {
  return process.cwd()
}

function getSavePath () {
  if (!fs.existsSync(getWorkDir() + '/.adr.json')) {
    return getWorkDir() + '/doc/adr/'
  }

  let config = fs.readFileSync(getWorkDir() + '/.adr.json', 'utf8')

  try {
    let adrConfig = JSON.parse(config)
    if (adrConfig.path) {
      return getWorkDir() + '/' + adrConfig.path
    }
    return getWorkDir() + '/' + 'doc/ard/'
  } catch (e) {
    return console.error(e)
  }
}

function createIndexByNumber (num) {
  let s = '00000000' + num
  return s.substr(s.length - DEFAULT_DIGITS)
}

function getLastNumber () {
  let path = getSavePath()
  let files = walkSync.entries(path)
  let lastNumber = 0

  if (files && files.length > 0) {
    for (let i = 0;i < files.length;i++) {
      let fileName = files[i].relativePath
      if (fileName === 'README.md') {
        break
      }

      let fileNumber = fileName.substring(0, DEFAULT_DIGITS)
      let int = parseInt(fileNumber, 10)
      if (int > lastNumber) {
        lastNumber = int
      }
    }

    return lastNumber
  }

  return 0
}

function getNewIndex () {
  let lastIndex = getLastNumber()
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

function getLanguage () {
  if (!fs.existsSync(getWorkDir() + '/.adr.json')) {
    console.log('no .adr.json, auto create ..')
    init('en')
    return 'en'
  }
  let config = fs.readFileSync(getWorkDir() + '/.adr.json', 'utf8')

  try {
    let adrConfig = JSON.parse(config)
    if (adrConfig.language) {
      return adrConfig.language
    }
    return 'en'
  } catch (e) {
    console.error(e)
    return 'en'
  }
}

function getI18n () {
  let language = getLanguage()
  let I18N = {
    en: {
      decision: 'Decision',
      modifiedDate: 'Last Modified Date',
      lastStatus: 'Last Status',
      logSavePath: '保存路径：'
    },
    'zh-cn': {
      decision: '决策',
      modifiedDate: '上次修改时间',
      lastStatus: '最后状态',
      logSavePath: 'Save Path:'
    }
  }

  return I18N[language]
}

export default {
  DEFAULT_DIGITS: DEFAULT_DIGITS,
  getSavePath: getSavePath,
  getNewIndex: getNewIndex,
  getLastNumber: getLastNumber,
  createIndexByNumber: createIndexByNumber,
  getLanguage: getLanguage,
  generateFileName: generateFileName,
  getWorkDir: getWorkDir,
  getI18n: getI18n
}
