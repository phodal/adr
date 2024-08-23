let fs = require('fs')

import Utils from './utils'

export function init (language): void {
  let workDir = Utils.getWorkDir()
  let defaultConfig = {
    language: language,
    path: 'docs/adr/',
    prefix: '',
    digits: 4,
    // Could be any extension but for now, supporting md (markdown) and asciidoc (adoc).
    extension: 'md'
  }
  if (language === 'zh-cn' || language === 'chinese') {
    defaultConfig.language = 'zh-cn'
  }
  fs.writeFileSync(workDir + '/.adr.json', JSON.stringify(defaultConfig))
}
