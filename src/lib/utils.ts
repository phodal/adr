import { getI18n } from './helpers/i18n'
import Config from './Config'
import getAdrFiles from './helpers/getAdrFiles'
import SupportedEditor from './enum/SupportedEditor'

let moment = require('moment')
let OpenInEditor = require('open-in-editor')

function getEditor () {
  return OpenInEditor.configure(
    SupportedEditor.has(Config.getEditor()) ? { editor: Config.getEditor() } : { cmd: Config.getEditor(), pattern: '{filename}' },
    console.warn
  )
}

function openInEditor (filePath: string) {
  const editor = getEditor()

  editor.open(filePath)
    .then(() => console.debug(`${filePath} open in editor successfully!`))
    .catch(console.warn)
}

function getWorkDir () {
  return process.cwd()
}

function createIndexByNumber (num): string {
  let s = '00000000' + num
  return Config.getPrefix() + s.substr(s.length - Config.getDigits())
}

function getMaxIndex (files: {relativePath: string}[]) {
  let maxNumber = 0
  files.forEach(function (file) {
    let fileName = file.relativePath
    let fileExt = Config.getDocExtension()
    if (fileName === 'README.' + fileExt) {
      return
    }

    let indexNumber = fileName.substring(Config.getPrefix().length, Config.getDigits() + Config.getPrefix().length)
    let currentIndex = parseInt(indexNumber, 10)
    if (currentIndex > maxNumber) {
      maxNumber = currentIndex
    }
  })

  return maxNumber
}

function getLatestIndex (): number {
  let files = getAdrFiles()

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
  let normalizedFileName = originFileName.toLowerCase().trim()

  if (Config.getForceNfc()) {
    normalizedFileName = normalizedFileName.normalize('NFC')
  } else {
    normalizedFileName = normalizedFileName.normalize('NFD')
  }

  return normalizedFileName
    .replace(/[\s_-]+/g, '-') // swap any length of whitespace, underscore, hyphen characters with a single -
    .replace(/\\/g, '-') // swap Windows directory separator by -
    .replace(/\//g, '-') // swap macOS / Linux directory separator by -
    .replace(/^-+|-+$/g, '') // remove leading, trailing -
    .replace(/，/g, '')
    .replace(/。/g, '')
    .replace(/ /g, '-')
    .replace(/\?/g, '-')
    .replace(/#/g, '')
    .replace(/=/g, '')
    .replace(/:/g, '')
    .replace(/# /g, '')
    .replace(/= /g, '')
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
  getIndexByString: getIndexByString,
  openInEditor: openInEditor
}

export default Utils
