let fs = require('fs')
let LRU = require('lru-cache')
let cache = LRU({
  max: 500
})

import Utils from './utils'

let DEFAULT_CONFIG = {
  language: 'en',
  path: Utils.getWorkDir() + '/doc/adr/',
  prefix: '',
  digits: 4
}

function getConfig (defaultValue: string) {
  if (!fs.existsSync(Utils.getWorkDir() + '/.adr.json')) {
    return defaultValue
  }
  let config = fs.readFileSync(Utils.getWorkDir() + '/.adr.json', 'utf8')
  try {
    let parsedConfig = JSON.parse(config)
    cache.set('config', parsedConfig)

    return parsedConfig
  } catch (e) {
    console.error(e)
    return defaultValue
  }
}

function getLanguage () {
  let defaultLanguage = DEFAULT_CONFIG.language
  let config = getConfig(defaultLanguage)
  if (config && config['language']) {
    return config['language']
  }
  return defaultLanguage
}

function getSavePath (): string {
  let defaultPath = DEFAULT_CONFIG.path
  let config = getConfig(defaultPath)
  if (config && config['path']) {
    return config['path']
  }
  return defaultPath
}

function getPrefix (): string {
  let defaultPath = ''
  let config
  if (cache.get('config')) {
    config = cache.get('config')
  }
  if (config && config.prefix) {
    return config.prefix
  }
  return defaultPath
}

function getDigits (): number {
  let defaultDigits = DEFAULT_CONFIG.digits
  let config
  if (cache.get(defaultDigits)) {
    config = cache.get(defaultDigits)
  }
  if (config && config.digits) {
    return config.digits
  }
  return defaultDigits
}

let Config = {
  getConfig: getConfig,
  getSavePath: getSavePath,
  getLanguage: getLanguage,
  getPrefix: getPrefix,
  getDigits: getDigits
}

export default Config
