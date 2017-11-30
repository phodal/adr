let fs = require('fs')
let LRU = require('lru-cache')
let cache = LRU({
  max: 500
})

import Utils from './utils'

function getConfig (defaultValue: string) {
  if (!fs.existsSync(Utils.getWorkDir() + '/.adr.json')) {
    return 'en'
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

let Config = {
  getConfig: getConfig,
  getSavePath: getSavePath,
  getLanguage: getLanguage,
  getPrefix: getPrefix
}

export default Config
