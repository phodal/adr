let fs = require('fs')

import Utils from './helpers/utils'

export function init (language) {
  let workDir = Utils.getWorkDir()
  let defaultConfig = {
    path: 'doc/ard/',
    language: 'en'
  }
  if (language === 'zh-cn' || language === 'chinese') {
    defaultConfig.language = 'zh-cn'
  }
  fs.writeFileSync(workDir + '/.adr.json', JSON.stringify(defaultConfig))
}
