let fs = require('fs')

import Utils from './Utils'

function getConfig (defaultValue: string) {
  if (!fs.existsSync(Utils.getWorkDir() + '/.adr.json')) {
    return 'en'
  }
  let config = fs.readFileSync(Utils.getWorkDir() + '/.adr.json', 'utf8')
  try {
    return JSON.parse(config)
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
  let defaultPath = Utils.getWorkDir() + '/doc/adr/'
  let config = getConfig(defaultPath)
  if (config && config.path) {
    return config.path
  }
  return defaultPath
}

let Config = {
  getConfig: getConfig,
  getSavePath: getSavePath,
  getLanguage: getLanguage
}

export default Config
