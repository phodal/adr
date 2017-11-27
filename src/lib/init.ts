let fs = require('fs')

import Utils from './utils'

export function init (language): void {
  let workDir = Utils.getWorkDir()
  let defaultConfig = {
    path: 'doc/adr/',
    language: 'en'
  }
  if (language === 'zh-cn' || language === 'chinese') {
    defaultConfig.language = 'zh-cn'
  }
  fs.writeFileSync(workDir + '/.adr.json', JSON.stringify(defaultConfig))
}
