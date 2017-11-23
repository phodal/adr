let fs = require('fs')
let workDir = process.cwd()

export function init (language) {
  let defaultConfig = {
    language: 'en'
  }
  if (language === 'zh-cn' || language === 'chinese') {
    defaultConfig.language = 'zh-cn'
  }
  fs.writeFileSync(workDir + '/.adr.json', JSON.stringify(defaultConfig))
}
