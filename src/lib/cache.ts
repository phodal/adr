import Config from './Config'

let fs = require('fs')

function initCache () {
  let cachePath = Config.getCachePath()
  let cacheInitObj = {
    images: []
  }
  if (!fs.existsSync(cachePath)) {
    fs.writeFileSync(cachePath, JSON.stringify(cacheInitObj))
  }
}

function getCache (key?: string) {
  let cachePath = Config.getCachePath()
  let cacheObj = JSON.parse(fs.readFileSync(cachePath, 'utf8'))

  if (key) {
    return cacheObj[key]
  }

  return cacheObj
}

function updateCache (key: string, value: unknown) {
  let cachePath = Config.getCachePath()
  let cacheObj = getCache()
  cacheObj[key] = value
  fs.writeFileSync(cachePath, JSON.stringify(cacheObj))
}

let _cacheInternal = {
  init: initCache,
  get: getCache,
  update: updateCache
}

let cache = new Proxy(_cacheInternal, {
  get (target: typeof _cacheInternal, key: keyof typeof target) {
    if (key !== 'init') {
      _cacheInternal.init()
    }

    return typeof target[key] === 'function'
      ? (target[key] as any).bind(target)
      : target[key]
  }
})

export default cache
